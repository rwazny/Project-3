import React, { Component } from "react";
import API from "../utils/API";

// Material UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  demo: {
    [theme.breakpoints.up("lg")]: {
      width: 1170
    }
  },
  margin: {
    margin: theme.spacing.unit
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: `${theme.spacing.unit * 3}px`
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  panelHeader: {
    fontFamily: "'Lobster', cursive",
    position: "absolute",
    top: -38,
    fontWeight: 300
  },
  panelName: {
    width: "100%",
    marginTop: 20,
    fontFamily: "'Lobster', cursive",
    textAlign: "center"
  }
});

class Settings extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container justify="center">
          <Grid spacing={8} container style={{ width: 1170 }}>
            <Typography className={classes.panelName} variant="h3" gutterBottom>
              Settings
            </Typography>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2 className={classes.panelHeader}>General</h2>
              </Paper>
            </Grid>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2 className={classes.panelHeader}>Dashboard</h2>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Settings);
