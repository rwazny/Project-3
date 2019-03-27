import React, { Component } from "react";
import API from "../src/utils/API";
class App extends Component {
  runMe = () => {
    API.getWorkOuts().then(res => {
      console.log(res);
    });
  };
  render() {
    return <div onClick={this.runMe}>Hello World!</div>;
  }
}

export default App;
