import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import MovieCard from "../components/MovieCard";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/movies"
      );
      setMovies(response.data?.moviesData);
      setIsError(false);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setErrorText("Failed to fetch the movies");
      setIsLoading(false);
    }
  };

  const filterMovies = async (searchText: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchText}`
      );
      setMovies(response.data?.moviesData);
      setIsError(false);
      setIsLoading(false);
    } catch (error) {
      if (searchText.length < 3) {
        setIsError(true);
        setIsLoading(false);
      }
    }
  };

  //   useEffect(() => {
  //     fetchMovies();
  //   }, []);

  useEffect(() => {
    setIsLoading(true);
    const filterTimer = setTimeout(() => {
      if (searchText && searchText.length > 2) {
        filterMovies(searchText);
        setSearchError(false);
      } else if (searchText.length < 1) {
        fetchMovies();
        setSearchError(false);
      } else {
        setSearchError(true);
        setIsLoading(false);
      }
    }, 1200);

    return () => {
      clearTimeout(filterTimer);
    };
  }, [searchText]);

  return (
    <>
      <NavBar />
      <Container>
        <Form className="mt-2 w-100">
          <Row>
            <Col className="w-100 mb-2">
              <Form.Control
                type="text"
                placeholder="Search for a movie"
                className="mr-sm-2"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </Col>

            <Col xs="auto" className="text-danger m-2" hidden={!searchError}>
              Please enter at least 3 characters to perform search
            </Col>
          </Row>
        </Form>
      </Container>
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
          <div>
            {isLoading ? (
              <>
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {!isLoading && movies.length < 1 ? (
            <div style={{ background: "#e7e7e7", marginTop: "10px" }}>
              No movies found
            </div>
          ) : (
            <Row xs={1} md={"auto"} className="g-4 justify-content-around">
              {movies.map((movie) => (
                <Col key={movie.id}>
                  <MovieCard data={movie} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default Index;
