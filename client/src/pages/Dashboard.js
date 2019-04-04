import React, { Component } from "react";
import API from "../utils/API";
import auth from "../firebase.js";
import SimpleTable from "../components/Table";
import DatePickers from "../components/DatePicker";
import Meal from "./Meal";

//Panel imports
import FitnessPanel from "../components/FitnessPanel";

// Material UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  demo: {
    [theme.breakpoints.up("lg")]: {
      width: 1170
    }
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: `${theme.spacing.unit * 3}px`
  },
  paper: {
    padding: theme.spacing.unit,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    height: 400
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container spacing={0} justify="center">
          <FitnessPanel />
          {/* <NutritionPanel /> */}

          <Grid container spacing={8} className={classes.demo}>
            <Typography
              style={{ width: "100%", marginTop: 20 }}
              variant="h5"
              gutterBottom
            >
              Nutrition
            </Typography>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Meal />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper} />
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
