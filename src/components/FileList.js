import React from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

class FileList extends React.Component {
  state = {
    sources: [
      {
        videoURL:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        title: "Please Login to See Your Videos",
        description: "Please login to see your videos."
      }
    ]
  };

  componentDidMount() {
    fetch("https://api.videopsi.com/videolist")
      .then(res => res.json())
      .then(res => this.setState({ sources: res }))
      .catch(err => console.log("Error fetching videos", err));
  }

  render() {
    return (
      <Col className="col-3">
        <ListGroup variant="flush">
          {this.state.sources.map((val, i) => {
            return (
              <ListGroup.Item
                action
                key={i}
                onClick={() =>
                  this.props.setVideoParams({
                    src: val.videoURL,
                    description: val.description
                  })
                }
              >
                {val.title}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Col>
    );
  }
}

export default FileList;
