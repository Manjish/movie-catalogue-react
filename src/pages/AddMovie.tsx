import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import NormalModal from "../components/NormalModal";

const AddMovie = () => {
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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
      setModalMessage(response.data.message);
      setShowModal(true);
      navigate("/", { replace: true });
    } catch (error) {
      error.response
        ? setModalMessage(error.response.data.errors[0].message)
        : setModalMessage("Unknown Error Occured");

      setShowModal(true);
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
                type="number"
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
                as="textarea"
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

      <NormalModal data={{ showModal, modalMessage, setShowModal }} />
    </>
  );
};

export default AddMovie;
