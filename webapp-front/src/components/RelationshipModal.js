import React from "react";
import { Modal } from "react-bootstrap";
import Drogas from "../pages/Drogas";
import Medicamentos from "../pages/Medicamentos";

function RelationshipModal(props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Body>
        {
          {
            Drogas: <Drogas {...props} select={true} />,
            Medicamentos: <Medicamentos {...props} select={true} />
          }[props.entity]
        }
      </Modal.Body>
    </Modal>
  );
}

export default RelationshipModal;
