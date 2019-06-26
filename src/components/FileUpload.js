import React from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";

//comment

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadProgress: 0,
      file: null,
      uploadStatus: "",
      shasum: "",
      readyToUpload: false
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(event) {
    event.preventDefault();

    //Update upload status state to begin upload
    this.setState({ uploadStatus: "Authorizing upload..." });

    axios
      //request authorization token and upload URL from backend
      .get("http://localhost:3000/upload/getURL")
      //pass upload parameters into file upload method
      .then(res => {
        //Configure parameters for axios file upload from response received
        let config = {
          //Set required B2 headers
          headers: {
            Authorization: res.authorizationToken,
            "X-Bz-File-Name": res.vId,
            "Content-Type": "b2/x-auto",
            "X-Bz-Content-Sha1": this.state.shasum,
            "X-Bz-Info-vId": res.vId
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
        return axios.post(res.uploadUrl, this.state.file, config);
      })
      .then(res => {
        //Send File info back to backend server
        return axios.post("localhost:3000/upload/fileInfo", res.data);
      })
      .then(res => this.setState({ uploadStatus: "Upload Complete!" }))
      .catch(err => console.log(err));
  }

  handleFile(event) {
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
