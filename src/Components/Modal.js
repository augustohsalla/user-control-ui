import { Modal, Button } from "react-bootstrap";

function BasicModal(show) {
  return (
    <Modal show={show} onHide={!show}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BasicModal;
