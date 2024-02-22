import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Card, Col, Row } from "react-bootstrap";

const MovieDetail = () => {
  type Movie = {
    name?: string;
    desc?: string;
    info?: string;
    image?: string;
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
      <NavBar />
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
          <Card className="mt-3" style={{ border: "none" }}>
            <Col className="g-2 d-flex justify-content-evenly">
              <Card.Img variant="top" src={movie.image} className="w-25" />
              <Row className="w-50 h-50">
                <Card style={{ border: "none" }}>
                  <Card.Text>
                    <h1 className="display-4" style={{fontWeight:"bold"}}>{movie.name}</h1>
                  </Card.Text>
                </Card>

                <Card style={{ border: "none" }} className="mt-3">
                  <Card.Text style={{fontSize:"25px",textAlign:"justify"}}>{movie.desc}</Card.Text>
                </Card>
              </Row>
            </Col>
          </Card>
        </>
      )}
    </>
  );
};
export default MovieDetail;
