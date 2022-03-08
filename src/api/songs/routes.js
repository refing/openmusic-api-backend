const routes = (handler) => [
    {
      method: 'POST',
      path: '/songs',
      handler: handler.postSongHandler, // postSongHandler hanya menerima dan menyimpan "satu" Song.
    },
    {
      method: 'GET',
      path: '/songs',
      handler: handler.getSongsHandler, // getSongsHandler mengembalikan "banyak" Song.
    },
    {
      method: 'GET',
      path: '/songs/{id}',
      handler: handler.getSongByIdHandler, // getSongByIdHandler mengembalikan "satu" Song.
    },
    {
      method: 'PUT',
      path: '/songs/{id}',
      handler: handler.putSongByIdHandler, // putSongByIdHandler hanya menerima dan mengubah "satu" Song.
    },
    {
      method: 'DELETE',
      path: '/songs/{id}',
      handler: handler.deleteSongByIdHandler,
    },
];

module.exports = routes;