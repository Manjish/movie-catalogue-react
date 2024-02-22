import { Button, Modal } from "react-bootstrap";

const NormalModal = (props) => {
  return (
    <>
      <Modal
        show={props.data.showModal}
        onHide={() => props.data.setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hold Up !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.data.modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => props.data.setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default NormalModal;
