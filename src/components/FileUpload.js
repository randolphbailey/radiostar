import React from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";

//comment

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uploadProgress: 0, file: null, uploadStatus: "" };
    this.handleFile = this.handleFile.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(event) {
    event.preventDefault();

    this.setState({ uploadStatus: "Authorizing upload..." });
    //request authorization token and upload URL from backend
    fetch("http://localhost:3000/upload/getURL")
      .then(res => res.json())
      .then(res => {
        //Configure parameters for axios file upload from response received
        let URL = res.uploadUrl;
        let headers = {
          Authorization: res.authorizationToken,
          "X-Bz-File-Name": res.vId,
          "Content-Type": "b2/x-auto",
          "X-Bz-Content-Sha1": "do_not_verify",
          "X-Bz-Info-vId": res.vId
        };
        let config = {
          headers: headers,
          onUploadProgress: event => {
            let percent = Math.round((event.loaded / event.total) * 100);
            if (percent === 100)
              this.setState({
                uploadStatus: "Waiting for upload confirmation..."
              });
            this.setState({ uploadProgress: percent });
          }
        };
        let data = this.state.file;

        //Upload file
        this.setState({ uploadStatus: "Uploading..." });
        axios
          .post(URL, data, config)
          .then(res => this.setState({ uploadStatus: "Upload Complete!" }));
      });
    console.log(this.state.file);
  }

  handleFile(event) {
    let file = event.target.files[0];
    this.setState({ file: file });
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleFileUpload}>
          <div>
            <input type="file" onChange={e => this.handleFile(e)} />
          </div>
          <br />
          <div>
            <button>Upload</button>
          </div>
        </form>
        <ProgressBar
          now={this.state.uploadProgress}
          label={`${this.state.uploadProgress}%`}
        />
        <h2>{this.state.uploadStatus}</h2>
      </>
    );
  }
}

export default FileUpload;
