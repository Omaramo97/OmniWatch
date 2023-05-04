const movieTrailer = require("movie-trailer");
require("dotenv").config();

exports.handler = async (event) => {
  try {
    const { id } = event.queryStringParameters;
    const data = await movieTrailer(null, {
      id: true,
      apiKey: process.env.TMDB_API_KEY,
      tmdbId: id,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.toString(),
    };
  }
};
