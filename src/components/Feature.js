import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import axios from "axios";
import "../styles/Feature.css";

const Feature = () => {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const getFeature = async () => {
      const { data } = await axios.get("/.netlify/functions/getMovies");
      const random = Math.floor(Math.random() * data.results.length);
      setMovie(data.results[random]);
    };
    getFeature();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setTrailer(null);
      }
    });
    return window.removeEventListener("scroll", null);
  }, []);

  const truncate = (str, n) => {
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const handlePlay = async (id) => {
    if (trailer) {
      setTrailer(null);
    } else {
      const { data } = await axios.get(
        `/.netlify/functions/getTrailer?id=${id}`
      );
      setTrailer(data);
    }
  };

  return (
    <div
      className="Feature-container"
      style={{
        backgroundImage: movie
          ? `url(${BASE_URL}/${movie.backdrop_path})`
          : null,
        objectFit: "contain",
        backgroundPosition: "center cneter",
      }}
    >
      <div className="Feature-content">
        <h1 className="Feature-title">{movie && movie.title}</h1>
        <div className="Feature-buttons">
          <button
            className="Feature-button"
            onClick={() => handlePlay(movie.id)}
          >
            {" "}
            Play
          </button>
          <button className="Feature-button">More info</button>
        </div>
        <p className="Feature-description">
          {movie && truncate(movie.overview, 150)}
        </p>
      </div>
      <div className="Feature-mask"></div>
      {trailer && (
        <div className="Feature-trailer">
          <Youtube
            videoId={trailer}
            opts={{
              height: "500px",
              width: "100%",
              playerVars: { autoplay: 1 },
            }}
          />
        </div>
      )}
    </div>
  );
};
export default Feature;
