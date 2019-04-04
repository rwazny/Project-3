import React from "react";
import { Bar } from "react-chartjs-2";

// Material UI imports
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

function NutritionReports(props) {
  return (
    <Paper className={props.paper}>
      <div>
        <FormControl style={{ float: "left" }}>
          <InputLabel htmlFor="type-native-simple">Type</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={props.chartType}
            onChange={props.handleInputChange("chartType")}
            inputProps={{
              name: "chartType",
              id: "type-native-simple"
            }}
          >
            <option value="" />
            <option value={"barChart"}>Bar Chart</option>
            <option value={"pieChart"}>Pie Chart</option>
          </Select>
        </FormControl>

        {props.chartType ? (
          props.chartType === "barChart" ? (
            <div style={{ float: "left" }}>
              <FormControl>
                <InputLabel htmlFor="type-native-simple">Y-Axis</InputLabel>
                <Select
                  style={{ width: 120, marginRight: 15 }}
                  native
                  value={props.yAxis}
                  onChange={props.handleInputChange("yAxis")}
                  inputProps={{
                    name: "yAxis",
                    id: "type-native-simple"
                  }}
                >
                  <option value="" />
                  <option value={"calories"}>Calories</option>
                  <option value={"protein"}>Protein</option>
                  <option value={"fat"}>Fat</option>
                  <option value={"carbs"}>Carbs</option>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="type-native-simple">X-Axis</InputLabel>
                <Select
                  style={{ width: 120, marginRight: 15 }}
                  native
                  value={props.xAxis}
                  onChange={props.handleInputChange("xAxis")}
                  inputProps={{
                    name: "xAxis",
                    id: "type-native-simple"
                  }}
                >
                  <option value="" />
                  <option value={"thisWeek"}>This Week</option>
                </Select>
              </FormControl>
            </div>
          ) : (
            <div style={{ float: "left" }}>Pie Chart</div>
          )
        ) : (
          "Select a chart type"
        )}

        {/* <FormControl disabled={!props.exercise}>
          <InputLabel htmlFor="reps-native-simple">Reps</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={props.reps}
            onChange={props.handleChange("reps")}
            inputProps={{
              name: "reps",
              id: "reps-native-simple"
            }}
          >
            <option value="" />
            <option value={10}>1</option>
            <option value={20}>5</option>
          </Select>
        </FormControl> */}

        {/* <FormControl disabled={!props.reps}>
          <InputLabel htmlFor="timeframe-native-simple">Timeframe</InputLabel>
          <Select
            style={{ width: 120, marginRight: 15 }}
            native
            value={props.timeframe}
            onChange={props.handleChange("timeframe")}
            inputProps={{
              name: "timeframe",
              id: "timeframe-native-simple"
            }}
          >
            <option value="" />
            <option value={"thisWeek"}>This Week</option>
            <option value={"thisMonth"}>This Month</option>
          </Select>
        </FormControl> */}

        <Bar data={props.data} width={100} height={50} options={barOptions} />
      </div>
    </Paper>
  );
}

export default NutritionReports;
