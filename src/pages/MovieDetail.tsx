import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  type Movie = {
    name?: string;
    desc?: string;
    info?: string;
  };
  
  const [movie, setMovie] = useState<Movie>({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const getParams = useParams();
  const id = getParams.id;
  const getSingleMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${id}`
      );
      setMovie(response.data.singleMovieData);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to get the movie details");
    }
  };
  useEffect(() => {
    getSingleMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              color: "white",
              padding: "10px",
              marginTop: "5px",
            }}
          >
            {errorMessage}
          </div>
        </>
      ) : (
        <>
          <div>{movie?.name}</div>
        </>
      )}
    </>
  );
};
export default MovieDetail;
