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
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');
  pgm.dropConstraint('playlistsong', 'unique_playlist_id_and_song_id');
  pgm.dropConstraint('playlistsong', 'fk_playlistsong.playlist_id_playlists.id');
  pgm.dropConstraint('playlistsong', 'fk_playlistsong.song_id_songs.id');
};
