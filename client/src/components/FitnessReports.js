import React, { Component, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import API from "../utils/API";
import moment from "moment";

// Material UI imports
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class FitnessReports extends Component {
  render() {
    const mixedOptions = {
      responsive: true,
      tooltips: {
        mode: "label"
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July"
            ]
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Distance (miles)"
            },
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          },
          {
            type: "linear",
            display: true,
            position: "right",
            id: "y-axis-2",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
      }
    };

    const barOptions = {
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
      }
    };

    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="type-native-simple">Type</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={this.props.type}
            onChange={this.props.clickExerciseType("type")}
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

        <FormControl disabled={!this.props.type}>
          <InputLabel htmlFor="exercise-native-simple">Exercise</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={this.props.exercise}
            onChange={this.props.clickExerciseName("exercise")}
            inputProps={{
              name: "exercise",
              id: "exercise-native-simple"
            }}
          >
            <option value="" />
            {this.props.type
              ? this.props.type === "resistance"
                ? this.props.resistanceArray.map(exercise => (
                    <option>{exercise}</option>
                  ))
                : this.props.cardioArray.map(exercise => (
                    <option>{exercise}</option>
                  ))
              : null}
          </Select>
        </FormControl>

        <FormControl disabled={!this.props.exercise}>
          <InputLabel htmlFor="reps-native-simple">Reps</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={this.props.reps}
            onChange={this.props.handleChange("reps")}
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

        <FormControl disabled={!this.props.reps}>
          <InputLabel htmlFor="timeframe-native-simple">Timeframe</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={this.props.timeframe}
            onChange={this.props.handleChange("timeframe")}
            inputProps={{
              name: "timeframe",
              id: "timeframe-native-simple"
            }}
          >
            <option value="" />
            <option value={"thisWeek"}>This Week</option>
            <option value={"thisMonth"}>This Month</option>
          </Select>
        </FormControl>
        <Bar
          data={this.props.data}
          width={100}
          height={50}
          options={barOptions}
        />
      </div>
    );
  }
}

export default FitnessReports;
