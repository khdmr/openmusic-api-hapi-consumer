const { Pool } = require('pg');
const mapDBPlaylistSongsToModel = require('./utils');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: `
            SELECT
                p.id,
                p.name,
                u.username,
                s.id as song_id,
                s.title,
                s.performer
            FROM
                playlists p
            INNER JOIN
                users u
            ON
                p.owner = u.id
            INNER JOIN
                playlist_songs ps
            ON
                p.id = ps.playlist_id
            INNER JOIN
                songs s
            ON
                ps.song_id = s.id
            WHERE
                p.id = $1 
            `,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    const playlist = mapDBPlaylistSongsToModel(result.rows);
    return playlist;
  }
}

module.exports = PlaylistsService;
