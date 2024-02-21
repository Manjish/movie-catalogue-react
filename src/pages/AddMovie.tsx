import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddMovie = () => {
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
        movieData
      );
      setMovieName("");
      setRating("");
      setDescription("");
      alert(response.data.message);
    } catch (error) {}
  };
  return (
    <>
      <div>
        <Link to={"/"}>Back to Home</Link>
      </div>

      <form onSubmit={addMovieHandler}>
        <input
          type="text"
          placeholder="Movie Name"
          value={movieName}
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />{" "}
        <br />
        <button>Add New</button>
      </form>
    </>
  );
};

export default AddMovie;
