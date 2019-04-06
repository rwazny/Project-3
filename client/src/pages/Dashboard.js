import React, { Component } from "react";
import auth from "../firebase.js";
import Meal from "./Meal";

//Panel imports
import FitnessPanel from "../components/panels/FitnessPanel";
import NutritionPanel from "../components/panels/NutritionPanel";

// Material UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

class Dashboard extends Component {
  state = {};
  componentDidMount = () =>{
    auth.onAuthStateChanged(firebaseUser => {
      this.setState({
        user: firebaseUser
      });

      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log("not logged in");
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        {this.state.user ? (
        <Grid container spacing={0} justify="center">
          <NutritionPanel />
          <FitnessPanel />
        </Grid>
        ): (
          "No user found"
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
