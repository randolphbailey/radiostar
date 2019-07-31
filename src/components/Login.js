import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class Login extends React.Component {
  state = {
    show: false,
    username: "",
    password: ""
  };

  handleFormChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  render() {
    return (
      <>
        <Button variant="success" onClick={() => this.setState({ show: true })}>
          Login
        </Button>

        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Form.Group controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.username}
                  onChange={e => this.handleFormChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.password}
                  onChange={e => this.handleFormChange(e)}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() =>
                  this.props.handleLogin(
                    this.state.username,
                    this.state.password
                  )
                }
              >
                Login
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ show: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Login;
