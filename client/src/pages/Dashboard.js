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
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container spacing={0} justify="center">
          <NutritionPanel />
          <FitnessPanel />
        </Grid>
      </React.Fragment>
    );
  }
}

export default Dashboard;
