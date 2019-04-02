import React, { Component } from "react";
import API from "../utils/API";
import auth from "../firebase.js";
import LogIn from "../components/LogIn";
import SimpleTable from "../components/Table";
import DatePickers from "../components/DatePicker";
import Meal from "./Meal";

// Material UI imports
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


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
  state = {
    anchorEl: null,
    resistanceToAdd: [],
    cardioToAdd: [],
    user: null,
    workoutDate: null,
    selectedWorkout: null,
    woName: ""
  };

  styles = {
    table: {
      table: {
        borderCollapse: "collapse"
      },
      border: {
        border: "1px solid #dddddd",
        width: 140
      }
    }
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    console.log(today);
    this.setState({ workoutDate: today });

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
  };

  addExercise = name => {
    var joined = this.state[name].concat({ name: "" });
    this.setState({ [name]: joined });
  };

  handleInputChange = event => {
    const { value, id, name } = event.currentTarget;
    this.state.resistanceToAdd[id][name] = value;
    this.setState({ resistanceToAdd: this.state.resistanceToAdd });
  };
  handleCardio = event => {
    const { value, id, name } = event.currentTarget;
    this.state.cardioToAdd[id][name] = value;
    this.setState({ cardioToAdd: this.state.cardioToAdd });
  };
  loadWorkOuts = event => {
    API.findUserWorkOuts(localStorage.userId).then(res => console.log(res));
  };
  saveDay = () => {
    let data = { WorkOut: {} };
    if (this.state.resistanceToAdd.length) {
      data.WorkOut["resistance"] = [];
      this.state.resistanceToAdd.map(resistance => {
        data.WorkOut.resistance.push({
          name: resistance.name,
          sets: parseInt(resistance.sets),
          reps: parseInt(resistance.reps),
          weight: parseInt(resistance.weight)
        });
      });
    }
    if (this.state.cardioToAdd.length) {
      data.WorkOut["cardio"] = [];
      this.state.cardioToAdd.map(cardio => {
        data.WorkOut.cardio.push({
          name: cardio.name,
          distance: parseInt(cardio.distance),
          time: parseInt(cardio.time)
        });
      });
    }
    console.log(data);
    // SAVE WORKOUT, NOT SINGLE EXERCISE
    API.saveWorkOut(data.WorkOut).then(res =>
      API.pushWorkOut({ userId: localStorage.userId, id: res.data._id })
    );
  };

  selectDate = event => {
    this.setState({ workoutDate: event.target.value });
  };

  selectWorktout = event => {
    this.setState({ selectedWorkout: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <div className="App">
          {this.state.user && <h1>{this.state.user.email}</h1>}
          <LogIn />
        </div>
        <br />
        <Grid container justify="center" spacing={24}>
          <Grid container spacing={8} className={classes.demo}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <div style={{ display: "flex" }}>
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Saved Workouts"
                    className={classes.textField}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    style={{ width: "45%" }}
                    margin="normal"
                    variant="outlined"
                    defaultValue="None"
                  >
                    <option>None</option>
                    <option>Chest Day</option>
                    <option>Leg Day</option>
                    <option>Arm Day</option>
                    ))}
                  </TextField>

                  <DatePickers
                    style={{ float: "right" }}
                    defaultDate={this.state.workoutDate}
                    changeHandler={this.selectDate}
                    label="Workout Date"
                    name="workoutDate"
                  />
                </div>
                <div>
                  <TextField
                    style={{ width: "45%" }}
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />

                  <Button
                    style={{ margin: "25px 10px" }}
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={this.loadWorkOuts}
                  >
                    Save Workout
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.button}
                  >
                    New Workout
                  </Button>
                </div>
                <br />

                <Button
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  size="small"
                  color="primary"
                  onClick={this.handleClick}
                >
                  Add Exercise
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      this.addExercise("resistanceToAdd");
                      this.handleClose();
                    }}
                  >
                    Resistance
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      this.addExercise("cardioToAdd");
                      this.handleClose();
                    }}
                  >
                    Cardio
                  </MenuItem>
                </Menu>

                {this.state.resistanceToAdd.length ? (
                  <SimpleTable
                    exerciseType="resistanceToAdd"
                    changeHandler={this.handleInputChange}
                    newValue={this.state.resistanceToAdd}
                    headings={["Exercise", "Sets", "Reps", "Weight"]}
                    rows={this.state.resistanceToAdd}
                  />
                ) : (
                  ""
                )}
                <br />
                {this.state.cardioToAdd.length ? (
                  <SimpleTable
                    exerciseType="cardioToAdd"
                    changeHandler={this.handleCardio}
                    newValue={this.state.cardioToAdd}
                    headings={["Exercise", "Distance", "Time"]}
                    rows={this.state.cardioToAdd}
                  />
                ) : (
                  ""
                )}
                <br />
                {this.state.resistanceToAdd.length ||
                this.state.cardioToAdd.length ? (
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={this.saveDay}
                    className={classes.button}
                  >
                    Save
                  </Button>
                ) : (
                  ""
                )}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Reports for exercise</Paper>
            </Grid>
          </Grid>
          <Grid container spacing={8} className={classes.demo}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Nutrition tab
              <Meal />              
              </Paper>

            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Reports for nutrition
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
