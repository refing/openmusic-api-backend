/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint(
      'playlists',
      'fk_playlists.owner_users.id',
      'FOREIGN KEY(username) REFERENCES users(id) ON DELETE CASCADE',
  );

  pgm.addConstraint(
      'playlistsong',
      'unique_playlist_id_and_song_id',
      'UNIQUE(playlist_id, song_id)',
  );
  pgm.addConstraint(
      'playlistsong',
      'fk_playlistsong.playlist_id_playlists.id',
      'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
      'playlistsong',
      'fk_playlistsong.song_id_songs.id',
      'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE',
  );

  pgm.addConstraint(
      'likes',
      'unique_user_id_and_album_id',
      'UNIQUE(user_id, album_id)',
  );
  pgm.addConstraint(
      'likes',
      'fk_likes.user_id_users.id',
      'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
      'likes',
      'fk_likes.album_id_album.id',
      'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
      'songs',
      'fk_albums.albums.id',
      'FOREIGN KEY("albumid") REFERENCES albums(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');
  pgm.dropConstraint('playlistsong', 'unique_playlist_id_and_song_id');
  pgm.dropConstraint('playlistsong', 'fk_playlistsong.playlist_id_playlists.id');
  pgm.dropConstraint('playlistsong', 'fk_playlistsong.song_id_songs.id');
  pgm.dropConstraint('likes', 'unique_user_id_and_album_id');
  pgm.dropConstraint('likes', 'fk_likes.user_id_users.id');
  pgm.dropConstraint('likes', 'fk_likes.album_id_album.id');
  pgm.dropConstraint('songs', 'fk_songs.album_id_album.id');
};
