import React from "react";
import { Bar, Pie } from "react-chartjs-2";

// Material UI imports
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

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
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <Typography
        component="h1"
        className={classes.panelHeader}
        color="secondary"
      >
        Reports
      </Typography>
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
                  <option value={"today"}>Today</option>
                </Select>
              </FormControl>
              {props.xAxis === "thisWeek" ? (
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
              ) : null}
            </div>
          ) : (
            <FormControl>
              <InputLabel htmlFor="type-native-simple">Timeframe</InputLabel>
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
                <option value={"today"}>Today</option>
              </Select>
            </FormControl>
          )
        ) : (
          <Typography variant="caption">
            Select a chart type to see more options
          </Typography>
        )}

        {props.chartType === "barChart" ? (
          <Bar data={props.data} width={100} height={50} options={barOptions} />
        ) : (
          <Pie data={props.data} width={100} height={50} />
        )}
      </div>
    </Paper>
  );
}

export default NutritionReports;
