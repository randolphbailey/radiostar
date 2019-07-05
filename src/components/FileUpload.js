import React from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//comment

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadProgress: 0,
      file: null,
      uploadStatus: "",
      shasum: "",
      readyToUpload: false,
      title: "",
      description: ""
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleFileUpload(event) {
    event.preventDefault();

    //Update upload status state to begin upload
    this.setState({ uploadStatus: "Authorizing upload..." });

    fetch("http://localhost:3000/upload/getURL")
      //Fetch upload info and convert to json
      .then(res => res.json())
      //pass upload parameters into file upload method
      .then(res => {
        let URL = res.uploadUrl;
        let fileName = this.state.file.name;

        //Grab file extension
        let splitName = fileName.split(".");
        let extension = splitName.pop();
        //Configure parameters for axios file upload from response received
        let config = {
          //Set required B2 headers
          headers: {
            Authorization: res.authorizationToken,
            "X-Bz-File-Name": res.vId + "." + extension,
            "Content-Type": "b2/x-auto",
            "X-Bz-Content-Sha1": this.state.shasum,
            "X-Bz-Info-vid": res.vId,
            "X-Bz-Info-title": this.state.title,
            "X-Bz-Info-description": this.state.description
          },
          //Set up upload event to monitor upload via progress bar
          onUploadProgress: event => {
            let percent = Math.round((event.loaded / event.total) * 100);
            if (percent === 100)
              this.setState({
                uploadStatus: "Waiting for upload confirmation..."
              });
            this.setState({ uploadProgress: percent });
          }
        };

        //Update upload status
        this.setState({ uploadStatus: "Uploading..." });

        //Upload file, return promise to continue chain
        return axios.post(URL, this.state.file, config);
      })
      .then(res => {
        //Send File info back to backend server
        return axios.put("http://localhost:3000/upload/fileInfo", res.data);
      })
      .then(res => {
        this.setState({ uploadStatus: "Upload Complete!" });
        return "Success";
      })
      .catch(err => console.log(err));
  }

  //SHA-1 hash generator for file integrity verification
  handleFile(event) {
    //function to convert byte code to hexadecimal string
    let hexString = function(buffer) {
      const byteArray = new Uint8Array(buffer);

      const hexCodes = [...byteArray].map(value => {
        const hexCode = value.toString(16);
        const paddedHexCode = hexCode.padStart(2, "0");
        return paddedHexCode;
      });

      return hexCodes.join("");
    };

    let file = event.target.files[0];
    this.setState({
      file: file,
      uploadStatus: "Starting file verification...",
      readyToUpload: false
    });
    let Reader = new FileReader();
    Reader.onloadend = e => {
      this.setState({ uploadStatus: "Verifying file integrity..." });
      window.crypto.subtle.digest("SHA-1", e.target.result).then(buffer => {
        let SHA1 = hexString(buffer);
        this.setState({
          shasum: SHA1,
          uploadStatus: "Ready to start upload.",
          readyToUpload: true
        });
        console.log(this.state.shasum);
      });
    };
    Reader.readAsArrayBuffer(file);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  render() {
    let buttonEnable = !this.state.readyToUpload;
    return (
      <>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Control type="file" onChange={e => this.handleFile(e)} />
          </Form.Group>
          <Button
            variant="primary"
            disabled={buttonEnable}
            onClick={!buttonEnable ? this.handleFileUpload : null}
          >
            Upload
          </Button>
        </Form>
        <br />
        <ProgressBar
          now={this.state.uploadProgress}
          label={`${this.state.uploadProgress}%`}
        />
        <br />
        <h3>{this.state.uploadStatus}</h3>
      </>
    );
  }
}

export default FileUpload;
