const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const ClientError = require('../../exceptions/ClientError');
const {mapDBToModelAlbum} = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');
class AlbumsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addAlbum({name, year}) {
    const id = `album-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new ClientError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }
  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return result.rows.map(mapDBToModelAlbum)[0];
  }
  async editAlbumById(id, {name, year}) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [name, year, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }
  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
  async addCoverAlbum(id, cover) {
    const query = {
      text: 'UPDATE albums SET "coverUrl" = $1 WHERE id = $2 RETURNING id',
      values: [cover, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui cover. Id tidak ditemukan');
    }
  }

  async postLikeAlbum(albumid, userid) {
    const getLikes = {
      text: 'SELECT * FROM likes WHERE album_id = $1 AND user_id = $2',
      values: [albumid, userid],
    };
    const getLikesResult = await this._pool.query(getLikes);
    // like album
    if (!getLikesResult.rowCount) {
      const id = `likes-${nanoid(16)}`;

      const addLikes = {
        text: 'INSERT INTO likes (id, user_id, album_id) VALUES ($1, $2, $3)',
        values: [id, userid, albumid],
      };
      const addLikesResult = await this._pool.query(addLikes);

      if (!addLikesResult.rowCount) {
        throw new ClientError('Gagal melakukan Like');
      }
    } else {
      // unlike album
      const deleteLikes = {
        text: 'DELETE FROM likes WHERE album_id = $1 AND user_id = $2',
        values: [albumid, userid],
      };
      const deleteLikesResult = await this._pool.query(deleteLikes);

      if (!deleteLikesResult.rowCount) {
        throw new ClientError('Gagal melakukan unlike');
      }
    }
    await this._cacheService.delete(`likes:${albumid}`);
  }

  async getLikeAlbum(albumid) {
    try {
      // mendapatkan dari cache
      const result = await this._cacheService.get(`likes:${albumid}`);
      return {likes: JSON.parse(result), isCache: 1};
    } catch (error) {
      // bila gagal, diteruskan dengan mendapatkan catatan dari database
      const query = {
        text: 'SELECT user_id FROM likes WHERE album_id = $1',
        values: [albumid],
      };
      const result = await this._pool.query(query);
      await this._cacheService.set(`likes:${albumid}`, JSON.stringify(result.rows));

      return {likes: result.rows};
    }
  }
}
module.exports = AlbumsService;
