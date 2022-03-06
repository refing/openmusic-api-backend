const { nanoid } = require('nanoid');
const albums = require('./albums');
const songs = require('./songs');

const addAlbumHandler = (request, h) => {
    const { name, year } = request.payload;
  
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
  
    const newalbum = {
      name, year, id, createdAt, updatedAt,
    };
    albums.push(newalbum);
  
    const isSuccess = albums.filter((album) => album.id === id).length > 0;
  
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Album berhasil ditambahkan',
        data: {
          albumId: id,
        },
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Album gagal ditambahkan',
    });
    response.code(500);
    return response;
};
const getAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const album = albums.filter((n) => n.id === id)[0];

  if (album !== undefined) {
    // const filteredAlbum = books.filter((book) => Number(book.reading) === Number(reading));
    const response = h.response({
        status: 'success',
        data: {
        //   album: album.map((album) => ({
        //     id: album.id,
        //     name: album.name,
        //     year: album.year,
        // })),
          album,
        },
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const { name, year } = request.payload;
  const updatedAt = new Date().toISOString();
 
  const index = albums.findIndex((album) => album.id === id);
 
  if (index !== -1) {
    albums[index] = {
      ...albums[index],
      name,
      year,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui album. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
const deleteAlbumByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = albums.findIndex((album) => album.id === id);
 
  if (index !== -1) {
    albums.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Album berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const addSongHandler = (request, h) => {
  const { 
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newsong = {
    title,
    year,
    genre,
    performer,
    duration,albumId, id, createdAt, updatedAt,
  };
  songs.push(newsong);

  const isSuccess = songs.filter((song) => song.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Lagu gagal ditambahkan',
  });
  response.code(500);
  return response;
};
const getAllSongHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      songs: songs.map(({id, title, performer}) =>
        ({id, title, performer})),
    },
  });
  response.code(200);
  return response;
};
const getSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const song = songs.filter((n) => n.id === id)[0];

  if (song !== undefined) {
    // const filteredSong = books.filter((book) => Number(book.reading) === Number(reading));
    const response = h.response({
        status: 'success',
        data: {
        //   song: song.map((song) => ({
        //     id: song.id,
        //     name: song.name,
        //     year: song.year,
        // })),
          song,
        },
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Lagu tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const { 
    title,
    year,
    genre,
    performer,
    duration, 
    albumId
  } = request.payload;
  const updatedAt = new Date().toISOString();
 
  const index = songs.findIndex((song) => song.id === id);
 
  if (index !== -1) {
    songs[index] = {
      ...songs[index],
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui lagu. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
const deleteSongByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = songs.findIndex((song) => song.id === id);
 
  if (index !== -1) {
    songs.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Lagu gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = { 
    addAlbumHandler,
    getAlbumByIdHandler,
    editAlbumByIdHandler,
    deleteAlbumByIdHandler ,
    addSongHandler,
    getAllSongHandler,
    getSongByIdHandler,
    editSongByIdHandler,
    deleteSongByIdHandler,
};
