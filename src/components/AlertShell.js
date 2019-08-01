import React from "react";
import Alert from "react-bootstrap/Alert";
import "./AlertShell.css";

export default function AlertShell(props) {
  return (
    <div className="AlertShell">
      <Alert variant={props.variant}>{props.message}</Alert>
    </div>
  );
}
