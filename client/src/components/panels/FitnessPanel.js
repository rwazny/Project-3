import React, { Component } from "react";
import FitnessTracker from "./FitnessTracker";
import FitnessReports from "./FitnessReports";
import moment from "moment";
import API from "../../utils/API";
import auth from "../../firebase.js";

// Material UI imports
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    height: 400,
    display: "flex",
    flexDirection: "column"
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class FitnessPanel extends Component {
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
    workoutDate: moment().format("YYYY-MM-DD"),
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

  handleAnchorEl = node => {
    this.anchorEl = node;
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = name => event => {
    // if (this.anchorEl.contains(event.target)) {
    //   return;
    // }
console.log(name);
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
      user: localStorage.userId,
      type: this.state.type
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
        if (this.state.type === "resistance") {
          newData[id] = res.data[i].resistance.weight[0];
        } else if (this.state.type === "cardio") {
          newData[id] = res.data[i].cardio.distance;
        }
      }
      newChartData.datasets[0].data = newData;
      console.log(res.data);
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
      <Grid container spacing={8} className={classes.demo}>
        <Typography
          style={{ width: "100%", marginTop: 20 }}
          variant="h5"
          gutterBottom
        >
          Fitness
        </Typography>
        <Grid item xs={12} md={6}>
          <FitnessTracker
            classes={classes}
            handleAnchorEl={this.handleAnchorEl}
            selectWorktout={this.state.selectedWorkout}
            clickSavedWorkout={this.clickSavedWorkout}
            savedWorkouts={this.state.savedWorkouts}
            workoutDate={this.state.workoutDate}
            selectDate={this.selectDate}
            woName={this.state.woName}
            handleNameChange={this.handleNameChange}
            loadWorkOuts={this.loadWorkOuts}
            resistanceToAdd={this.state.resistanceToAdd}
            cardioToAdd={this.state.cardioToAdd}
            handleToggle={this.handleToggle}
            anchorEl={anchorEl}
            handleCardio={this.handleCardio}
            handleInputChange={this.handleInputChange}
            handleClickAway={this.handleClickAway}
            handleClose={this.handleClose}
            saveDay={this.saveDay}
            open={open}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <FitnessReports
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
    );
  }
}

export default withStyles(styles)(FitnessPanel);
