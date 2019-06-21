import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Nav extends React.Component {
  render() {
    return (
      <Row>
        <Col className="h1">radiostar</Col>
        <Col className="h1 text-right">Login Component</Col>
      </Row>
    );
  }
}

export default Nav;
