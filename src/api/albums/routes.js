const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler, // postAlbumHandler hanya menerima dan menyimpan "satu" Album.
  },
  {
    method: 'GET',
    path: '/albums',
    handler: handler.getAlbumsHandler, // getAlbumsHandler mengembalikan "banyak" Album.
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler, // getAlbumByIdHandler mengembalikan "satu" Album.
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumByIdHandler, // putAlbumByIdHandler hanya menerima dan mengubah "satu" Album.
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler,
  },
  {
    method: 'POST',
    path: '/albums/{id}/likes',
    handler: handler.postAlbumLikeHandler,
    options: {
      auth: 'musicsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: handler.getAlbumLikeHandler,
  },
];

module.exports = routes;
