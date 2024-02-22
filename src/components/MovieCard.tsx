import { Badge, Card, Col, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {
  const movie = props.data;
  const navigate = useNavigate();
  const showDetail = (id) => {
    navigate(`/view/${id}`);
  };
  return (
    <>
      <Card
        bg="dark"
        text="white"
        style={{ width: "18rem" }}
        className="h-100"
        onClick={() => showDetail(movie.id)}
      >
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <div className="d-flex justify-content-evenly">
            <Row className="align-items-end">
              <Col>
                <Badge bg="white" text="dark">
                  Movie
                </Badge>
              </Col>
              <Col>
                <Badge bg="white" text="dark">
                  <span>
                    <FaStar />
                  </span>{" "}
                  {movie.rating}
                </Badge>
              </Col>
            </Row>
          </div>
          <Card.Title className="text-center">{movie.name}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};
export default MovieCard;
