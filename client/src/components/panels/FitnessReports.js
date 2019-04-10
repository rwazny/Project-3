import React, { Component, Fragment } from "react";
import { Bar } from "react-chartjs-2";

// Material UI imports
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class FitnessReports extends Component {
  render() {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Sales",
          type: "line",
          data: [51, 65, 40, 49, 60, 37, 40],
          fill: false,
          borderColor: "#EC932F",
          backgroundColor: "#EC932F",
          pointBorderColor: "#EC932F",
          pointBackgroundColor: "#EC932F",
          pointHoverBackgroundColor: "#EC932F",
          pointHoverBorderColor: "#EC932F",
          yAxisID: "y-axis-2"
        },
        {
          type: "bar",
          label: "Visitor",
          data: [200, 185, 590, 621, 250, 400, 95],
          fill: false,
          backgroundColor: "#71B37C",
          borderColor: "#71B37C",
          hoverBackgroundColor: "#71B37C",
          hoverBorderColor: "#71B37C",
          yAxisID: "y-axis-1"
        }
      ]
    };

    const options = {
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
            }
          }
        ],
        yAxes: [
          {
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
      },
      legend: {
        labels: {
          fontColor: "white",
          fontSize: 18
        }
      }
    };

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
            ticks: {
              fontColor: this.props.textColor
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: this.props.textColor
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
            ticks: {
              beginAtZero: true,
              fontColor: this.props.textColor
            },
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
      },
      legend: {
        labels: {
          fontColor: this.props.textColor
        }
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
                    <option key={exercise}>{exercise}</option>
                  ))
                : this.props.cardioArray.map(exercise => (
                    <option key={exercise}>{exercise}</option>
                  ))
              : null}
          </Select>
        </FormControl>

        <FormControl disabled={!this.props.exercise}>
          <InputLabel htmlFor="reps-native-simple">Y-Axis</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={this.props.reps}
            onChange={this.props.handleChange("yAxis")}
            inputProps={{
              name: "reps",
              id: "reps-native-simple"
            }}
          >
            <option value="" />

            {this.props.type === "resistance" ? (
              <Fragment>
                <option value={"reps"}>Reps</option>
                <option value={"sets"}>Sets</option>
              </Fragment>
            ) : (
              <Fragment>
                <option value={"time"}>Time</option>
              </Fragment>
            )}
          </Select>
        </FormControl>

        <FormControl disabled={!this.props.yAxis}>
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
          options={mixedOptions}
        />
      </div>
    );
  }
}

export default FitnessReports;
