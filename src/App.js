import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Task from "./components/Task";
//import Remove from "./components/Remove";
//import Edit from "./components/Edit";
import Request from "superagent";
import _ from "lodash";
import Button from "@material-ui/core/Button";

class App extends React.Component {
  state = {
    task_array: [],
    task: undefined,
    task_id: undefined,
    task_title: undefined,
    task_description: undefined,
    task_done: undefined,
    comments: []
  };

  componentWillMount() {
    clearInterval(this.interval);
    var url = "http://rest-nosql.herokuapp.com/todo/api/v1/tasks";

    Request.get(url).then(response => {
      this.setState({
        task_array: response.body.result,
        task_id: response.body.result,

        comments: ["i dont like meat", "pizza is good", "aik aur comment"]
      });
    });
  }

  componentWillUpdate() {
    clearInterval(this.interval);
    var url = "http://rest-nosql.herokuapp.com/todo/api/v1/tasks";

    Request.get(url).then(response => {
      this.setState({
        task_array: response.body.result
      });
    });
  }
  /*
  getTask = async e => {
    e.preventDefault();
    const task_input = e.target.elements.task.value;

    const api_call = await fetch(
      "http://rest-nosql.herokuapp.com/todo/api/v1/tasks"
    );
    const data = await api_call.json();
    console.log(data);
    console.log(task_input);
    this.setState({
      tasker: data.result
    });
  };
*/

  //we are saving this.state.count in a constant called count and now we can call it to execute
  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }

  postTask = async e => {
    e.preventDefault();
    const posttask = e.target.elements.task.value;
    const post_title1 = "";
    const post_done = "false";
    const post_id = _.uniqueId();

    fetch("http://rest-nosql.herokuapp.com/todo/api/v1/tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task_id: post_id,
        task_description: post_title1,
        task_title: posttask,
        task_done: post_done
      })
    });
  };

  render() {
    return (
      <div>
        <Titles />
        <Form postTask={this.postTask} />
        {this.state.task_array.map((temp, a) => {
          console.log(temp, a);
          return (
            <Task key={temp.task_id} tacos={temp.task_id}>
              <font face="verdana"> {temp.task_title} </font>
            </Task>
          );
        })}
      </div>
    );
  }
}

export default App;
