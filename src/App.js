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
//import axios from "axios";

const sources = {
  sintelTrailer: "http://media.w3.org/2010/05/sintel/trailer.mp4",
  bunnyTrailer: "http://media.w3.org/2010/05/bunny/trailer.mp4",
  bunnyMovie: "http://media.w3.org/2010/05/bunny/movie.mp4",
  test: "http://media.w3.org/2010/05/video/movie_300.webm"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: sources.sintelTrailer,
      info: "This is some info from the App component state",
      isAuthenticated: false,
      user: null,
      token: ""
    };
    //this.logout = this.logout.bind(this);
    //this.googleResponse = this.googleResponse.bind(this);
    //this.onFailure = this.onFailure.bind(this);
  }
  /*
  logout() {
    this.setState({ isAuthenticated: false, user: null, token: "" });
  }

  googleResponse(response) {
    console.log(response);
  }

  onFailure = error => {
    alert("error");
  };
*/
  render() {
    /*
    let content = !!this.state.isAuthenticated ? (
      "Placeholder"
    ) : (
      <GoogleLogin
        clientId="345865852310-df4mg5u8k9s73d9tgehqum5jd79bh8vh.apps.googleusercontent.com"
        onSuccess={this.googleResponse}
        onFailure={this.googleResponse}
        buttonText="Login"
        cookiePolicy={"single_host_origin"}
      />
    );
    */
    return (
      <Container>
        <Row>
          <Col className="h1">radiostar</Col>
          <Col className="h1 text-right">
            Login Placeholder | <UploadModal />
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
