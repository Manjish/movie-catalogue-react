import { useState } from "react";
import { Button, Container, Modal, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const confirmLogout = () => {
    setModalMessage("Are you sure you want to logout ?");
    setShowModal(true);
  };

  const handleLogout = () => {
    setShowModal(false);
    localStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link to={"/"}>Movie Suggester</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end gap-3">
            {localStorage.getItem("token") ? (
              <>
                <Navbar.Text>
                  <Link to={"/add"}>Add New Movie</Link>
                </Navbar.Text>
                <Navbar.Text>
                  <Link to={"/profile"}>Profile</Link>
                </Navbar.Text>
                <Navbar.Text>
                  <Button variant="danger" onClick={confirmLogout}>
                    Logout
                  </Button>
                </Navbar.Text>
              </>
            ) : (
              <Navbar.Text>
                <Link to={"/login"}>Login</Link>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hold Up !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
