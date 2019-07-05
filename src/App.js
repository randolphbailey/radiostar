import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
//import Nav from "./components/Nav";
import { Player } from "video-react";
import "./components/Player.css";
import Button from "react-bootstrap/Button";
import UploadModal from "./components/UploadModal";
import Login from "./components/Login";
//import axios from "axios";

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
      info: "This is some info from the App component state",
      isAuthenticated: true,
      user: null,
      token: ""
    };
  }

  handleLogin = (username, password) => {
    console.log(`testing passing function as prop ${username}, ${password}`);
  };

  render() {
    let content = !!this.state.isAuthenticated ? (
      <>
        <Login handleLogin={this.handleLogin} /> | <UploadModal />
      </>
    ) : (
      <>Not logged in</>
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
              <Col>{this.state.info}</Col>
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
