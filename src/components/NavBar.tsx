import { Button, Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
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
                  <Button variant="danger" onClick={handleLogout}>
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
    </>
  );
};

export default NavBar;
