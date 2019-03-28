/* import React, { Component } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button 
} from '@material-ui/core'
export default class App extends Component {
  state = {
    nutrition: [],
    foodName: ''
  }

  handleChange = ({ target: { name, value } }) =>
  this.setState({
    [name]: value
  })
render() {
  const { title } = this.state
  return (
    <form>
      <TextField
        name='title'
        label='Exercise'
        value={title}
        onChange={this.handleChange}
        margin='normal'
      />
    </form>
  )
};

  render() {
    return (
      <Typography variant='display1' align='center' gutterBottom>
        Nutrition
      </Typography>
    ),
    <Button>
    type='submit'
    color='primary'
    variant='raised'
  >
    Create
  </Button>
  }
}
 */
/* /* import React, { Component } from "react";
import API from "../src/utils/API";
import showNutrition from "./"
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
 */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import showNutrition from "./pages/Nurition";
//import NoMatch from "./pages/NoMatch";



 const AppNutrition=()=> {
  return (
    <Router>
      <div>
        <Switch>
        
      <Route exact path="/" component={showNutrition} />
          <Route exact path="/shownutrition" component={showNutrition} />
           {/* <Route component={NoMatch} /> */}
      </Switch> 
      </div>
    </Router>
  );
}

  export default AppNutrition;


