import React, { Component } from "react";
import API from "../utils/API";
import auth from "../firebase.js";
import LogIn from "../components/LogIn";
import SimpleTable from "../components/Table";
import DatePickers from "../components/DatePicker";
import ReportsPanel from "../components/ReportsPanel";

// Material UI imports
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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
    selectedWorkout: "None",
    woName: "",
    savedWorkouts: []
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
    API.findUserWorkOuts(localStorage.userId).then(res => {
      let savedArray = res.data.workouts.filter(workout => workout.name);
      this.setState({
        savedWorkouts: savedArray,
        allWorkOuts: res.data.workouts
      });
    });
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
  handleNameChange = event => {
    const { value } = event.currentTarget;
    this.setState({ woName: value });
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
    let data = {
      WorkOut: { date: this.state.workoutDate, resistance: [], cardio: [] }
    };

    if (this.state.woName) {
      data.WorkOut["name"] = this.state.woName;
    }
    if (this.state.resistanceToAdd.length) {
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
    API.saveWorkOut(data.WorkOut).then(res => {
      if (res.data.upserted) {
        API.pushWorkOut({
          userId: localStorage.userId,
          id: res.data.upserted[0]._id
        });
      }
    });
  };

  returnWorkoutsByDate = date => {
    this.setState({ workoutDate: date }, () => {
      API.getWorkOutsByDate(this.state.workoutDate).then(res => {
        if (res.data.length) {
          let newWorkOutState = { resistanceToAdd: [], cardioToAdd: [] };
          if (res.data[0].resistance) {
            res.data[0].resistance.map(resistance => {
              newWorkOutState.resistanceToAdd.push({
                name: resistance.name,
                sets: resistance.sets,
                reps: resistance.reps,
                weight: resistance.weight
              });
            });
          }
          if (res.data[0].cardio) {
            res.data[0].cardio.map(cardio => {
              newWorkOutState.cardioToAdd.push({
                name: cardio.name,
                time: cardio.time,
                distance: cardio.distance
              });
            });
          }
          this.setState({
            resistanceToAdd: newWorkOutState.resistanceToAdd,
            cardioToAdd: newWorkOutState.cardioToAdd,
            selectedWorkout: res.data[0].name
          });
        } else {
          this.setState({
            resistanceToAdd: [],
            cardioToAdd: []
          });
        }
      });
    });
  };

  clickSavedWorkout = event => {
    let date = "";
    for (let i = 0; i < this.state.savedWorkouts.length; i++) {
      if (this.state.savedWorkouts[i].name === event.target.value) {
        date = this.state.savedWorkouts[i].date;
      }
    }

    this.returnWorkoutsByDate(date);
  };

  selectDate = event => {
    this.setState({ workoutDate: event.target.value }, () => {
      API.getWorkOutsByDate(this.state.workoutDate).then(res => {
        if (res.data.length) {
          let newWorkOutState = { resistanceToAdd: [], cardioToAdd: [] };
          if (res.data[0].resistance) {
            res.data[0].resistance.map(resistance => {
              newWorkOutState.resistanceToAdd.push({
                name: resistance.name,
                sets: resistance.sets,
                reps: resistance.reps,
                weight: resistance.weight
              });
            });
          }
          if (res.data[0].cardio) {
            res.data[0].cardio.map(cardio => {
              newWorkOutState.cardioToAdd.push({
                name: cardio.name,
                time: cardio.time,
                distance: cardio.distance
              });
            });
          }

          this.setState({
            resistanceToAdd: newWorkOutState.resistanceToAdd,
            cardioToAdd: newWorkOutState.cardioToAdd,
            selectedWorkout: res.data[0].name ? res.data[0].name : "None"
          });
        } else {
          this.setState({
            resistanceToAdd: [],
            cardioToAdd: [],
            selectedWorkout: "None"
          });
        }
      });
    });
  };

  selectWorktout = name => event => {
    this.setState({ [name]: event.target.value });
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
                    value={this.state.selectedWorkout}
                    onChange={this.clickSavedWorkout}
                  >
                    <option>None</option>
                    {this.state.savedWorkouts.length
                      ? this.state.savedWorkouts.map(workout => (
                          <option>{workout.name}</option>
                        ))
                      : null}
                  </TextField>
                  <DatePickers
                    style={{ float: "right" }}
                    value={this.state.workoutDate}
                    defaultDate={this.state.workoutDate}
                    changeHandler={this.selectDate}
                    name="workoutDate"
                  />
                </div>
                <div >
                  <TextField
                    style={{ width: "45%" }}
                    id="outlined-name"
                    label="Name"
                    value={this.state.woName}
                    onChange={this.handleNameChange}
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

                <div style={{ height: 210, overflowY: "auto" }}>
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
                </div>
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
              <Paper className={classes.paper}>
                <ReportsPanel workOuts={this.state.allWorkOuts} />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={8} className={classes.demo}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Nutrition tab</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Reports for nutrition</Paper>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
