import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Card } from "react-bootstrap";
import NormalModal from "../components/NormalModal";

const Profile = () => {
  type profile = {
    name?: string;
    email?: string;
    country?: string;
  };
  const [userData, setUserData] = useState<profile>({});

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const accessToken = localStorage.getItem("token");

  const getProfile = async () => {
    try {
      const profileData = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          timeout: 10000,
        }
      );
      setUserData(profileData.data.data);
    } catch (error) {
      error.response
        ? setModalMessage(error.response.data.errors[0].message)
        : setModalMessage("Unkown Error Occured. Try again later !!");
      setShowModal(true);
    }
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />

      <div className="d-flex align-items-center justify-content-center py-3">
        <Card style={{ width: "18rem" }} className="text-center">
          <Card.Body>
            <Card.Title>{userData.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {userData.email}
            </Card.Subtitle>
            <Card.Text>{userData.country}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <NormalModal data={{ showModal, modalMessage, setShowModal }} />
    </>
  );
};

export default Profile;
