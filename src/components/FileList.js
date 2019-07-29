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

  componentDidMount() {
    fetch("https://api.videopsi.com/videolist")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ sources: res });
      })
      .catch(err => console.log("Error fetching videos", err));
  }

  render() {
    return (
      <Col className="col-3">
        {this.state.sources.map((val, i) => {
          return (
            <Button
              key={i}
              onClick={() =>
                this.params.setVideoParams({
                  src: val.videoURL,
                  description: val.description
                })
              }
            >
              {val.title}
            </Button>
          );
        })}
      </Col>
    );
  }
}

export default FileList;
