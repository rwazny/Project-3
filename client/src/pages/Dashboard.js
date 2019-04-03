import React, { Component } from "react";
import API from "../utils/API";
import auth from "../firebase.js";
import SimpleTable from "../components/Table";
import DatePickers from "../components/DatePicker";
import Meal from "./Meal";
import ReportsPanel from "../components/ReportsPanel";
import moment from "moment";

// Material UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

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
    data: {
      labels: [],
      datasets: [
        {
          label: "Workout",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: []
        }
      ]
    },
    anchorEl: null,
    resistanceToAdd: [],
    cardioToAdd: [],
    user: null,
    workoutDate: null,
    selectedWorkout: "None",
    woName: "",
    savedWorkouts: [],
    open: false
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

  clickExerciseType = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  clickExerciseName = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value }, () => {
      if (this.state.timeframe) {
        this.getWorkOutByTimeframe(this.state.exercise);
      }
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    if (name === "timeframe") {
      this.getWorkOutByTimeframe(this.state.exercise);
    }
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = name => event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    if (name) {
      let joined = this.state[name].concat({ name: "" });
      this.setState({ open: false, [name]: joined });
    } else {
      this.setState({ open: false });
    }
  };

  handleClickAway = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  componentDidMount = () => {
    API.findUserWorkOuts(localStorage.userId).then(res => {
      let savedArray = res.data.workouts.filter(workout => workout.name);
      this.setState(
        {
          savedWorkouts: savedArray,
          allWorkOuts: res.data.workouts
        },
        () => {
          this.setExerciseArrays("resistance", "resistanceExerciseNames");
          this.setExerciseArrays("cardio", "cardioExerciseNames");
          this.returnWorkoutsByDate(today);
        }
      );
    });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    console.log(today);

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

  setExerciseArrays = (value, nameArray) => {
    let array = [];
    for (let i = 0; i < this.state.allWorkOuts.length; i++) {
      for (let j = 0; j < this.state.allWorkOuts[i][value].length; j++) {
        if (
          this.state.allWorkOuts[i][value].length &&
          !array.includes(this.state.allWorkOuts[i][value][j].name)
        ) {
          array.push(this.state.allWorkOuts[i][value][j].name);
        }
      }
    }

    console.log(array);

    this.setState({
      [nameArray]: array
    });
  };

  addExercise = name => {
    console.log(name);
    let joined = this.state[name].concat({ name: "" });
    this.setState({ open: false, [name]: joined });
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
      WorkOut: {
        date: this.state.workoutDate,
        week: moment(this.state.workoutDate, "YYYY-MM-DD").week(),
        user: localStorage.userId,
        resistance: [],
        cardio: []
      }
    };

    if (this.state.woName) {
      data.WorkOut["name"] = this.state.woName;
    }

    let resistanceNames = [...this.state.resistanceExerciseNames];
    let cardioNames = [...this.state.cardioExerciseNames];

    if (this.state.resistanceToAdd.length) {
      this.state.resistanceToAdd.map(resistance => {
        if (!resistanceNames.includes(resistance.name)) {
          resistanceNames.push(resistance.name);
        }

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
        if (!cardioNames.includes(cardio.name)) {
          cardioNames.push(cardio.name);
        }
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

      if (this.state.timeframe) {
        this.getWorkOutByTimeframe(this.state.exercise);
      }

      this.setState({
        resistanceExerciseNames: resistanceNames,
        cardioExerciseNames: cardioNames
      });
    });
  };

  returnWorkoutsByDate = date => {
    this.setState({ workoutDate: date }, () => {
      API.getWorkOutsByDate(this.state.workoutDate).then(res => {
        console.log(res.data);
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

  getWorkOutByTimeframe = exercise => {
    console.log(exercise);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    API.workOutByWeek({
      week: moment().week(),
      name: exercise,
      user: localStorage.userId
    }).then(res => {
      let newChartData = Object.assign({}, this.state.data);

      const dateArray = [
        moment()
          .day("Sunday")
          .format("MM-DD-YYYY"),
        moment()
          .day("Monday")
          .format("MM-DD-YYYY"),
        moment()
          .day("Tuesday")
          .format("MM-DD-YYYY"),
        moment()
          .day("Wednesday")
          .format("MM-DD-YYYY"),
        moment()
          .day("Thursday")
          .format("MM-DD-YYYY"),
        moment()
          .day("Friday")
          .format("MM-DD-YYYY"),
        moment()
          .day("Saturday")
          .format("MM-DD-YYYY")
      ];

      newChartData.labels = [
        ["Sunday", dateArray[0]],
        ["Monday", dateArray[1]],
        ["Tuesday", dateArray[2]],
        ["Wednesday", dateArray[3]],
        ["Thursday", dateArray[4]],
        ["Friday", dateArray[5]],
        ["Saturday", dateArray[6]]
      ];

      let newData = [null, null, null, null, null, null, null];

      for (let i = 0; i < res.data.length; i++) {
        const dateToFind = moment(res.data[i].date).format("MM-DD-YYYY");
        const id = dateArray.indexOf(dateToFind);
        newData[id] = res.data[i].resistance.weight[0];
      }
      newChartData.datasets[0].data = newData;
      console.log(newData);
      this.setState({ data: newChartData });
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
    const { anchorEl, open } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container spacing={0} justify="center">
          <Grid container spacing={8} className={classes.demo}>
            <Typography
              style={{ width: "100%", marginTop: 20 }}
              variant="h5"
              gutterBottom
            >
              Fitness
            </Typography>
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
                          <option key={workout.name}>{workout.name}</option>
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
                <div>
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

                <div
                  style={{ height: 190, marginBottom: 5, overflowY: "auto" }}
                >
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
                  size="small"
                  color="primary"
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleToggle}
                >
                  Add Exercise
                </Button>
                <Popper
                  open={open}
                  anchorEl={this.anchorEl}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleClickAway}>
                          <MenuList>
                            <MenuItem
                              onClick={this.handleClose("resistanceToAdd")}
                            >
                              Add Resistance
                            </MenuItem>
                            <MenuItem onClick={this.handleClose("cardioToAdd")}>
                              Add Cardio
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
                <Button
                  variant="contained"
                  style={{ float: "right" }}
                  size="small"
                  color="primary"
                  disabled={
                    !this.state.resistanceToAdd.length &&
                    !this.state.cardioToAdd.length
                  }
                  onClick={this.saveDay}
                  className={classes.button}
                >
                  Save
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <ReportsPanel
                  data={this.state.data}
                  workOuts={this.state.allWorkOuts}
                  getWorkOuts={this.getWorkOutByTimeframe}
                  cardioArray={this.state.cardioExerciseNames}
                  resistanceArray={this.state.resistanceExerciseNames}
                  clickExerciseName={this.clickExerciseName}
                  clickExerciseType={this.clickExerciseType}
                  handleChange={this.handleChange}
                  type={this.state.type}
                  exercise={this.state.exercise}
                  reps={this.state.reps}
                  timeframe={this.state.timeframe}
                />
              </Paper>
            </Grid>
          </Grid>
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
