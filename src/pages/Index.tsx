import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/movies"
      );
      setMovies(response.data?.moviesData);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setErrorText("Failed to fetch the movies");
    }
  };
  return (
    <>
      <button onClick={fetchMovies}>Load movies</button>
      <br />
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              color: "white",
              padding: "10px",
              margin: "5px",
            }}
          >
            {errorText}
          </div>
        </>
      ) : (
        <>
          <div style={{ background: "#e7e7e7", marginTop: "10px" }}>
            {movies.map((movie) => (
              <div key={movie.id}>
                <Link to={`view/${movie.id}`}>
                  <span style={{ fontWeight: "bold" }}>{movie.name}</span>
                </Link>
                <br />
                <img src={movie.image} alt="Movie image" height="100px" />
                <br />
                Info: {movie.info}
                <br />
                Rating: {movie.rating}
                <hr />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Index;
