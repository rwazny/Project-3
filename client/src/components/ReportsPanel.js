import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import API from "../utils/API";
import moment from "moment";

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
    mixedData: {
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
    }
  };

  clickExerciseType = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });

    // if (value === "cardio") {
    //   let cardioArray = [];
    //   if (this.props.workOuts) {
    //     this.setExerciseArray(value, name, cardioArray, "cardioExerciseNames");
    //   }
    // } else if (value === "resistance") {
    //   let resistanceArray = [];
    //   if (this.props.workOuts) {
    //     this.setExerciseArray(
    //       value,
    //       name,
    //       resistanceArray,
    //       "resistanceExerciseNames"
    //     );
    //   }
    // } else {
    //   this.setState({ [name]: value });
    // }
  };

  componentDidUpdate = () => {
    // if (
    //   this.state.type &&
    //   this.state.exercise &&
    //   this.state.reps &&
    //   this.state.timeframe
    // ) {
    //   this.getWorkOutByTimeFrame();
    // }
  };

  setExerciseArray = (value, name, array, nameArray) => {
    for (let i = 0; i < this.props.workOuts.length; i++) {
      for (let j = 0; j < this.props.workOuts[i][value].length; j++) {
        if (
          this.props.workOuts[i][value].length &&
          !array.includes(this.props.workOuts[i][value][j].name)
        ) {
          array.push(this.props.workOuts[i][value][j].name);
        }
      }
    }

    this.setState({
      [nameArray]: array,
      [name]: value
    });
  };

  clickExerciseName = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value }, () => {
      if (this.state.timeframe) {
        this.getWorkOutByTimeFrame();
      }
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    if (name === "timeframe") {
      this.getWorkOutByTimeFrame();
    }
  };

  getWorkOutByTimeFrame = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    API.workOutByWeek({
      week: moment().week(),
      name: this.state.exercise,
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

      this.setState({ data: newChartData });
    });
  };

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
            onChange={this.clickExerciseName("exercise")}
            inputProps={{
              name: "exercise",
              id: "exercise-native-simple"
            }}
          >
            <option value="" />
            {this.state.type
              ? this.state.type === "resistance"
                ? this.props.resistanceArray.map(exercise => (
                    <option>{exercise}</option>
                  ))
                : this.props.cardioArray.map(exercise => (
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
            <option value={"thisWeek"}>This Week</option>
            <option value={"thisMonth"}>This Month</option>
          </Select>
        </FormControl>

        {/* {this.state.type === "cardio" ? (
          <Bar
            data={this.state.mixedData}
            width={100}
            height={50}
            options={mixedOptions}
          />
        ) : ( */}
        <Bar
          data={this.state.data}
          width={100}
          height={50}
          options={barOptions}
        />
        {/* )} */}
      </div>
    );
  }
}

export default ReportsPanel;
