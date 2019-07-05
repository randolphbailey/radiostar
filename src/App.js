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

  handleLogin = (username, password) => {
    console.log(`testing passing function as prop ${username}, ${password}`);
    axios
      .post("http://localhost:3000/loginUser", {
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
        }
      })
      .catch(err => console.error("Login Error: ", err));
  };

  handleRegister = (username, password, first_name, last_name, email) => {
    axios
      .post("http://localhost:3000/registerUser", {
        username,
        password,
        first_name,
        last_name,
        email
      })
      .then(res => console.log(res));
  };

  render() {
    let content = !!this.state.isAuthenticated ? (
      <>
        Welcome {this.state.user} | <UploadModal />
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
          <Col className="h1">radiostar</Col>
          <Col className="h1 text-right">{content}</Col>
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
              return (
                <Button key={i} onClick={() => this.setState({ src: val })}>
                  Source #{i++}
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
