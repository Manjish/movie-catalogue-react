import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";

const AddMovie = () => {
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const addMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movieName,
      rating: rating,
      description: description,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        { timeout: 10000 }
      );
      setMovieName("");
      setRating("");
      setDescription("");
      alert(response.data.message);
      navigate("/", { replace: true });
    } catch (error) {
      error.response
        ? alert(error.response.data.errors[0].message)
        : alert("Unknown Error Occured");
    }
  };
  return (
    <>
      <NavBar />
      <Container className="w-25">
        <Form className="m-3" onSubmit={addMovieHandler}>
          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Movie Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Movie Name"
                value={movieName}
                onChange={(e) => {
                  setMovieName(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Movie Rating"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Movie Description"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddMovie;
