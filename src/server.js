require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const songs = require('./api/songs');
const AlbumsService = require('./services/inMemory/AlbumsService'); //plugin notes
const AlbumsValidator = require('./validator/albums');  //validator
const SongsService = require('./services/inMemory/SongsService'); //plugin notes
const SongsValidator = require('./validator/songs');  //validator

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
 
  await server.register([{   //registrasi plugin
    plugin: albums,
    options: {
      service: albumsService,
      validator: AlbumsValidator,
    },
  },{
    plugin: songs,
    options: {
      service: songsService,
      validator: SongsValidator,
    },
  }]);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();