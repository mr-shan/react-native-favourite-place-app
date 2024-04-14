const CREATE_TABLE_QUERY = `
CREATE TABLE IF NOT EXISTS favorite_places (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  image TEXT,
  location TEXT,
  latitude REAL,
  longitude REAL,
  locationSnapshot TEXT
);
`;

const ADD_PLACE_QUERY = `
INSERT INTO favorite_places (name, image, location, latitude, longitude, locationSnapshot)
values (?, ?, ?, ?, ?, ?);
`;

const GET_PLACES_LIST = `SELECT id, name, image, location FROM favorite_places;`;

const GET_PLACE_BY_ID = `SELECT * FROM favorite_places WHERE id = ?`;

const SQL_QUERIES = {
  CREATE_TABLE_QUERY,
  ADD_PLACE_QUERY,
  GET_PLACES_LIST,
  GET_PLACE_BY_ID,
};

export default SQL_QUERIES;
