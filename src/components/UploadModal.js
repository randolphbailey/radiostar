import React from "react";
import FileUpload from "./FileUpload";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class UploadModal extends React.Component {
  state = {
    show: false
  };

  render() {
    return (
      <>
        <Button variant="success" onClick={() => this.setState({ show: true })}>
          Upload File
        </Button>

        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>File Upload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FileUpload jwt={this.props.jwt} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ show: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default UploadModal;
