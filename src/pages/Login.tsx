import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import NormalModal from "../components/NormalModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.length < 1 || password.length < 1) {
      setModalMessage("Please fill up all the fields");
      setShowModal(true);
      return;
    }
    try {
      const loginCheck = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        { email, password },
        { timeout: 10000 }
      );

      if (loginCheck.data.status === "success") {
        localStorage.setItem("token", loginCheck.data.accessToken);
        setEmail("");
        setPassword("");
        navigate("/", { replace: true });
      }
    } catch (error) {
      error.response
        ? setModalMessage(error.response.data.errors[0].message)
        : setModalMessage("Unkown error occured. Try again later !");
      setShowModal(true);
    }
  };
  return (
    <>
      <NavBar />
      <Container className="mt-3 w-25 ">
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter your email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter your password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </Container>

      <NormalModal data={{showModal,modalMessage,setShowModal}} />
    </>
  );
};

export default Login;
