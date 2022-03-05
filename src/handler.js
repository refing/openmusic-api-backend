const { nanoid } = require('nanoid');
const albums = require('./albums');

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
    const response = h.response({
        status: 'success',
        data: {
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
module.exports = { 
    addAlbumHandler,
    getAlbumByIdHandler,
    editAlbumByIdHandler,
    deleteAlbumByIdHandler  
};
