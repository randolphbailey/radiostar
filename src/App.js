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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [
        "http://media.w3.org/2010/05/sintel/trailer.mp4",
        "http://media.w3.org/2010/05/bunny/trailer.mp4",
        "http://media.w3.org/2010/05/bunny/movie.mp4",
        "http://media.w3.org/2010/05/video/movie_300.webm"
      ],
      src: "",
      description: "This is some info from the App component state",
      isAuthenticated: false,
      user: null,
      token: ""
    };
  }

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

  handleLogout = () => {
    localStorage.clear();
    this.setState({ isAuthenticated: false, token: "", user: "" });
  };

  checkAlreadyLoggedIn = () => {
    let jwtToken = "JWT " + this.state.token;
    axios
      .get("https://api.videopsi.com/returningUser", {
        headers: { Authorization: jwtToken }
      })
      .then(res => {
        if (res.data.isAuthenticated === true) {
          this.setState({ isAuthenticated: true, user: res.data.username });
        } else {
          this.setState({ token: "" });
        }
      });
  };

  handleLogin = (username, password) => {
    axios
      .post("https://api.videopsi.com/loginUser", {
        username,
        password
      })
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
      .catch(err => console.error("Login Error: ", err));
  };

  handleRegister = (username, password, first_name, last_name, email) => {
    axios
      .post("https://api.videopsi.com/registerUser", {
        username,
        password,
        first_name,
        last_name,
        email
      })
      .then(res => {
        if (res.status === 200) {
          this.handleLogin(username, password);
        } else {
          console.log("Registration Failed");
        }
      });
  };

  render() {
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
          <Col className="col-3">
            {this.state.sources.map((val, i) => {
              let sourceNum = i + 1;
              return (
                <Button key={i} onClick={() => this.setState({ src: val })}>
                  Source #{sourceNum}
                </Button>
              );
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
