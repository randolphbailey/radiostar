import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Player } from "video-react";
import "./components/Player.css";
import Button from "react-bootstrap/Button";
import UploadModal from "./components/UploadModal";
import Login from "./components/Login";
import axios from "axios";
import Register from "./components/Register";
import FileList from "./components/FileList";

class App extends React.Component {
  state = {
    src: "",
    description: "This is some info from the App component state",
    isAuthenticated: false,
    user: null,
    token: "",
    alert: []
  };

  async componentDidMount() {
    if ("token" in localStorage) {
      let token = localStorage.getItem("token");
      await this.setState({ token: token });
      this.checkAlreadyLoggedIn();
    }
    if (this.props.vId !== "blank") {
      let URLSRC =
        "https://v.videopsi.com/file/videopsi/" + this.props.vId + ".mp4";
      this.setState({ src: URLSRC });
    }
  }

  createAlert = (variant, message) => {
    this.setState({ alert: [{ variant, message }] });
  };

  setVideoParams = arg => {
    this.setState(arg);
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ isAuthenticated: false, token: "", user: "" });
  };

  checkAlreadyLoggedIn = () => {
    let jwtToken = "JWT " + this.state.token;
    axios
      .get(
        "https://api.videopsi.com/returningUser",
        {
          headers: { Authorization: jwtToken }
        },
        {
          validateStatus: status => {
            return true;
          }
        }
      )
      .then(res => {
        if (res.data.isAuthenticated === true) {
          this.setState({ isAuthenticated: true, user: res.data.username });
        } else {
          this.setState({ token: "" });
        }
      })
      .catch(err =>
        console.error(
          "Network error checking if user is already logged in: ",
          err
        )
      );
  };

  handleLogin = (username, password) => {
    axios
      .post(
        "https://api.videopsi.com/loginUser",
        {
          username,
          password
        },
        {
          validateStatus: status => {
            return true;
          }
        }
      )
      .then(res => {
        if (res.data.auth) {
          this.setState({
            isAuthenticated: true,
            user: username,
            token: res.data.token
          });
          localStorage.setItem("token", res.data.token);
        }
      })
      .catch(err => console.error("Network Error on Login:", err));
  };

  handleRegister = (username, password, first_name, last_name, email) => {
    axios
      .post(
        "https://api.videopsi.com/registerUser",
        {
          username,
          password,
          first_name,
          last_name,
          email
        },
        {
          validateStatus: status => {
            return true;
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          this.handleLogin(username, password);
        } else {
          console.log("Registration Failed");
        }
      })
      .catch(err => console.error("Network error when registering user:", err));
  };

  render() {
    //let blah = "success";
    //let otherblah = "test alert";
    let content = !!this.state.isAuthenticated ? (
      <>
        Welcome {this.state.user} | <UploadModal jwt={this.state.token} /> |{" "}
        <Button onClick={this.handleLogout} variant="warning">
          Logout
        </Button>
      </>
    ) : (
      <>
        <Login handleLogin={this.handleLogin} /> |{" "}
        <Register handleRegister={this.handleRegister} />
      </>
    );
    return (
      <Container>
        {/* <AlertShell variant={blah} message={otherblah} /> */}
        <Row>
          <Col xs={12} md={3} className="h1">
            VideoPsi
          </Col>
          <Col xs={12} md={9} className="h1 text-right">
            {content}
          </Col>
        </Row>
        <Row>
          <Col className="col-9">
            <Row>
              <Col>
                <Player src={this.state.src} />
              </Col>
            </Row>
            <Row>
              <Col>{this.state.description}</Col>
            </Row>
          </Col>
          <FileList setVideoParams={this.setVideoParams} />
        </Row>
      </Container>
    );
  }
}

export default App;
