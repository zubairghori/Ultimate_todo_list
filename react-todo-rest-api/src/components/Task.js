import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Task extends React.Component {
  state = {
    show: false,
    open: false,
    inputValue: ""
  };
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {}
  deleteTask = async e => {
    fetch("http://rest-nosql.herokuapp.com/todo/api/v1/tasks/1", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    });
  };

  _onRemoveClick(ab) {
    console.log(ab);

    this.handleClose;
    fetch("http://rest-nosql.herokuapp.com/todo/api/v1/tasks/" + ab + "", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    });
  }

  _onEditClick(ba) {
    console.log(ba);
    this.handleClose;

    const post_title = this.state.inputValue;
    //const post_title = "this is an edit";
    console.log(post_title);
    const post_description = "put task description with all data";
    const post_done = "false";
    const post_id = ba;

    fetch("http://rest-nosql.herokuapp.com/todo/api/v1/tasks/" + ba + "", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task_id: post_id,
        task_description: post_description,
        task_title: post_title,
        task_done: post_done
      })
    });
  }

  putTask = async e => {
    e.preventDefault();
    const posttask = e.target.elements.putTask.value;
    const post_description = "";
    const post_done = "false";
    // const post_id = _.uniqueId();

    fetch("http://rest-nosql.herokuapp.com/todo/api/v1/tasks", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task_id: this.props.tacos,
        task_description: post_description,
        task_title: posttask,
        task_done: post_done
      })
    });
  };

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    const divStyle = {
      color: "blue"
    };
    return (
      <div>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
            <DialogContent>
              <DialogContentText />
              <TextField
                value={this.state.inputValue}
                onChange={evt => this.updateInputValue(evt)}
                type="text"
                name="puttask"
                autoFocus
                margin="dense"
                id="put"
                label="Change To do"
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => this._onEditClick(this.props.tacos)}
                color="primary"
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div style={divStyle}>
          <Button
            style={{ marginLeft: 10 }}
            variant="raised"
            color="primary"
            onClick={() => this._onRemoveClick(this.props.tacos)}
          >
            Remove{" "}
          </Button>
          {this.props.children}

          <Button
            style={{ marginLeft: 10, marginRight: 100, marginTop: 10 }}
            variant="raised"
            color="primary"
            onClick={this.handleClickOpen}
          >
            {" "}
            Edit{" "}
          </Button>
        </div>
      </div>
    );
  }
}

export default Task;
