import React from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.postTask}>
        <TextField style={{ marginLeft: 10 }} type="text" name="task" />
        <Button style={{ marginLeft: 10 }} variant="raised" color="primary">
          Send
        </Button>
      </form>
    );
  }
}

export default Form;
