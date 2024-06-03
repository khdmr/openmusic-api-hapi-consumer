const mapDBPlaylistSongsToModel = (playlists) => {
  const mapPlaylistSongs = {
    id: playlists[0].id,
    name: playlists[0].name,
    songs: [],
  };

  playlists.forEach((playlist) => {
    if (playlist.song_id !== null) {
      mapPlaylistSongs.songs.push({
        id: playlist.song_id,
        title: playlist.title,
        performer: playlist.performer,
      });
    }
  });

  return mapPlaylistSongs;
};

module.exports = mapDBPlaylistSongsToModel;
