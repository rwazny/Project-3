import React, { Component } from "react";
import API from "../utils/API";

// Material UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Input from "@material-ui/core/Input";
import NativeSelect from "@material-ui/core/NativeSelect";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  demo: {
    [theme.breakpoints.up("lg")]: {
      width: 1170
    }
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: 0,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    width: 68
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
  state = {};

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

                <Grid style={{ flexGrow: 1 }} item sm={12}>
                  <Typography
                    style={{ marginRight: 15 }}
                    inline
                    variant="body1"
                    gutterBottom
                  >
                    Theme
                  </Typography>
                  <Button
                    style={{
                      width: 100,
                      marginRight: 5,
                      color: "#fff",
                      backgroundColor: "#f06292"
                    }}
                    variant="contained"
                    onClick={this.props.pinkTheme}
                  >
                    Pink
                  </Button>
                  <Button
                    style={{
                      width: 100,
                      marginRight: 5,
                      color: "rgba(0, 0, 0, 0.87)",
                      backgroundColor: "#ff8a65"
                    }}
                    variant="contained"
                    onClick={this.props.orangeTheme}
                  >
                    Orange
                  </Button>
                  <Button
                    style={{
                      width: 100,
                      marginRight: 5,
                      color: "rgba(0, 0, 0, 0.87)",
                      backgroundColor: "#0097a7"
                    }}
                    variant="contained"
                    onClick={this.props.cyanTheme}
                  >
                    Cyan
                  </Button>
                  <Button
                    style={{
                      width: 100,
                      marginRight: 5,
                      color: "rgba(0, 0, 0, 0.87)",
                      backgroundColor: "#d4d4dc"
                    }}
                    variant="contained"
                    onClick={this.props.greyTheme}
                  >
                    Grey
                  </Button>
                  <br />
                  <Typography inline variant="body1" gutterBottom>
                    Toggle Dark Mode
                  </Typography>
                  <Switch
                    defaultChecked={this.props.theme.palette.type === "dark"}
                    value="checkedF"
                    onClick={this.props.switchUp}
                    color="secondary"
                  />
                </Grid>
              </Paper>
            </Grid>
            <Grid item sm={6}>
              <Paper style={{ height: 300 }} className={classes.paper}>
                <h2 className={classes.panelHeader}>User</h2>
                <Grid container>
                  <Grid item sm={2}>
                    <Typography
                      style={{ paddingTop: 17 }}
                      variant="body1"
                      gutterBottom
                    >
                      Height
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="body1" gutterBottom>
                      Age
                    </Typography>
                  </Grid>

                  <Grid item sm={4}>
                    <TextField
                      id="filled-number"
                      style={{ width: 60 }}
                      label="Feet"
                      value={this.state.age}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      variant="filled"
                    />
                    <TextField
                      id="filled-number"
                      style={{ width: 60 }}
                      label="Inches"
                      value={this.state.age}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      variant="filled"
                    />
                    <br />
                    <TextField
                      id="filled-number"
                      style={{ width: 60 }}
                      label="Years"
                      value={this.state.age}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      variant="filled"
                    />
                  </Grid>

                  <Grid item sm={2}>
                    <Typography
                      style={{ paddingTop: 17 }}
                      variant="body1"
                      gutterBottom
                    >
                      Weight
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="body1" gutterBottom>
                      Gender
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <TextField
                      id="filled-number"
                      style={{ width: 60 }}
                      label="Pounds"
                      value={this.state.age}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      variant="filled"
                    />
                    <br />
                    <FormControl>
                      <RadioGroup
                        style={{ fontSize: 8 }}
                        row
                        aria-label="Gender"
                        name="gender1"
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="f"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio style={{ fontSize: 8 }} />}
                          label="m"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item sm={12}>
                    <Divider style={{ margin: "16px 0px" }} variant="middle" />
                    <Typography inline variant="body1" gutterBottom>
                      Activity Level
                    </Typography>
                    <NativeSelect
                      style={{ marginLeft: 18, width: 360 }}
                      input={<Input />}
                    >
                      <option>sedentary (little or no exercise)</option>
                      <option>
                        lightly active (light exercise/sports 1-3 days/week)
                      </option>
                      <option>
                        moderatetely active (moderate exercise/sports 3-5
                        days/week)
                      </option>
                      <option>
                        very active (hard exercise/sports 6-7 days a week)
                      </option>
                      <option>
                        extra active (very hard exercise/sports & physical job
                        or 2x training)
                      </option>
                    </NativeSelect>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item sm={12}>
                    <Divider style={{ margin: "16px 0px" }} variant="middle" />
                    <Typography inline variant="body1" gutterBottom>
                      Objective
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        style={{ marginTop: -13, marginLeft: 40 }}
                        row
                        aria-label="Objective"
                        name="objective"
                      >
                        <FormControlLabel
                          value="weightGain"
                          control={<Radio />}
                          label="Weight Gain"
                        />
                        <FormControlLabel
                          value="weightLoss"
                          control={<Radio />}
                          label="Weight Loss"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item sm={6}>
              <Paper style={{ height: 300 }} className={classes.paper}>
                <h2 className={classes.panelHeader}>User</h2>
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
