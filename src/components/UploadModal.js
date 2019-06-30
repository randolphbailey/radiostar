import React from "react";
import Modal from "react-bootstrap/Modal";
import FileUpload from "./FileUpload";

class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FileUpload />;
  }
}

export default UploadModal;
