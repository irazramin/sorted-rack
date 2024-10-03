import React from "react";
import { Button, Modal } from "react-bootstrap";

const CustomModal = ({ show, handleClose, title, message, handleAction }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleAction}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
