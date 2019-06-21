import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "./components/Nav";
import { Player } from "video-react";
import "./components/Player.css";
import Button from "react-bootstrap/Button";

const sources = {
  sintelTrailer: "http://media.w3.org/2010/05/sintel/trailer.mp4",
  bunnyTrailer: "http://media.w3.org/2010/05/bunny/trailer.mp4",
  bunnyMovie: "http://media.w3.org/2010/05/bunny/movie.mp4",
  test: "http://media.w3.org/2010/05/video/movie_300.webm"
};

class App extends React.Component {
  state = {
    src: sources.sintelTrailer,
    info: "This is some info from the App component state"
  };
  render() {
    return (
      <Container>
        <Nav />
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
            <Button
              onClick={() => this.setState({ src: sources.bunnyTrailer })}
            >
              Bunny Trailer
            </Button>
            <Button onClick={() => this.setState({ src: sources.bunnyMovie })}>
              Bunny Movie
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
