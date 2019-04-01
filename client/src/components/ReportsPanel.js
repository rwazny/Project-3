import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

// Material UI imports
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class ReportsPanel extends Component {
  state = {
    type: "",
    exercise: "",
    reps: "",
    timeframe: "",
    workOuts: [],
    name: "hai",
    labelWidth: 0,
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }
  };

  clickExerciseType = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      if (this.state.type === "cardio") {
        let cardioArray = [];
        if (this.props.workOuts) {
          for (let i = 0; i < this.props.workOuts.length; i++) {
            if (this.props.workOuts[i].cardio.length) {
              cardioArray.push(this.props.workOuts[i].cardio[0].name);
            }
          }
          console.log(cardioArray);
          this.setState({ cardioExerciseNames: cardioArray });
        }
      } else {
        let resistanceArray = [];
        if (this.props.workOuts) {
          for (let i = 0; i < this.props.workOuts.length; i++) {
            if (this.props.workOuts[i].resistance.length) {
              resistanceArray.push(this.props.workOuts[i].resistance[0].name);
            }
          }
          console.log(resistanceArray);
          this.setState({ resistanceExerciseNames: resistanceArray });
        }
      }
    });
  };

  clickCardioType = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      let cardioArray = [];
      if (this.props.workOuts) {
        for (let i = 0; i < this.props.workOuts.length; i++) {
          if (this.props.workOuts[i].cardio.length) {
            cardioArray.push(this.props.workOuts[i].cardio[0].name);
          }
        }
        console.log(cardioArray);
        this.setState({ cardioExerciseNames: cardioArray });
      }
    });
  };

  componentDidUpdate = () => {};

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="type-native-simple">Type</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={this.state.type}
            onChange={this.clickExerciseType("type")}
            inputProps={{
              name: "type",
              id: "type-native-simple"
            }}
          >
            <option value="" />
            <option value={"cardio"}>Cardio</option>
            <option value={"resistance"}>Resistance</option>
          </Select>
        </FormControl>

        <FormControl disabled={!this.state.type}>
          <InputLabel htmlFor="exercise-native-simple">Exercise</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={this.state.exercise}
            onChange={this.handleChange("exercise")}
            inputProps={{
              name: "exercise",
              id: "exercise-native-simple"
            }}
          >
            <option value="" />
            {this.state.resistanceExerciseNames
              ? this.state.resistanceExerciseNames.map(exercise => (
                  <option>{exercise}</option>
                ))
              : null}
          </Select>
        </FormControl>

        <FormControl disabled={!this.state.exercise}>
          <InputLabel htmlFor="reps-native-simple">Reps</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={this.state.reps}
            onChange={this.handleChange("reps")}
            inputProps={{
              name: "reps",
              id: "reps-native-simple"
            }}
          >
            <option value="" />
            <option value={10}>1</option>
            <option value={20}>5</option>
          </Select>
        </FormControl>

        <FormControl disabled={!this.state.reps}>
          <InputLabel htmlFor="timeframe-native-simple">Timeframe</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={this.state.timeframe}
            onChange={this.handleChange("timeframe")}
            inputProps={{
              name: "timeframe",
              id: "timeframe-native-simple"
            }}
          >
            <option value="" />
            <option value={10}>Year</option>
            <option value={20}>Month</option>
            <option value={20}>Week</option>
          </Select>
        </FormControl>

        <Bar
          data={this.state.data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default ReportsPanel;
