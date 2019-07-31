import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class Register extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: ""
    };
  }

  handleFormChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={() => this.setState({ show: true })}>
          Register
        </Button>

        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
              <Form.Group controlId="first_name">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.first_name}
                  onChange={e => this.handleFormChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="last_name">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.last_name}
                  onChange={e => this.handleFormChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.email}
                  onChange={e => this.handleFormChange(e)}
                />
              </Form.Group>
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
                  this.props.handleRegister(
                    this.state.username,
                    this.state.password,
                    this.state.first_name,
                    this.state.last_name,
                    this.state.email
                  )
                }
              >
                Register
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

export default Register;
