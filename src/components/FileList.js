import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [
        "http://media.w3.org/2010/05/sintel/trailer.mp4",
        "http://media.w3.org/2010/05/bunny/trailer.mp4",
        "http://media.w3.org/2010/05/bunny/movie.mp4",
        "http://media.w3.org/2010/05/video/movie_300.webm"
      ]
    };
  }

  componentDidMount() {}

  render() {
    return (
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
    );
  }
}

export default FileList;
