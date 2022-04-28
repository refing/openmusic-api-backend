const mapDBToModelFull = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumid,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: albumid,
  createdAt: created_at,
  updatedAt: updated_at,
});
const mapDBToModelAlbum = ({
  id,
  name,
  year,
  coverUrl,
}) => ({
  id,
  name,
  year,
  coverUrl,
});
module.exports = {mapDBToModelFull, mapDBToModelAlbum};
