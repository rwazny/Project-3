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
  state = { xlFit: this.props.xlFit };
  componentDidMount = () => {
    auth.onAuthStateChanged(firebaseUser => {
      this.setState({
        user: firebaseUser
      });
    });
  };
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        {this.state.user ? (
          <Grid container spacing={0} justify="center">
            {this.props.topPanel === "fitness" ? (
              <React.Fragment>
                <FitnessPanel
                  xlFit={this.props.xlFit}
                  theme={this.props.theme}
                />
                <NutritionPanel
                  xlNut={this.props.xlNut}
                  theme={this.props.theme}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NutritionPanel
                  xlNut={this.props.xlNut}
                  theme={this.props.theme}
                />
                <FitnessPanel
                  xlFit={this.props.xlFit}
                  theme={this.props.theme}
                />
              </React.Fragment>
            )}
          </Grid>
        ) : (
          "No user found"
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
