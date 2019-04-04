import React, { Component } from "react";
import NutritionTracker from "./NutritionTracker";
import NutritionReports from "./NutritionReports";
import moment from "moment";
import API from "../../utils/API";
import auth from "../../firebase.js";
import Meal from "../../pages/Meal";

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
  margin: {
    margin: theme.spacing.unit
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
  },
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  table: {
    minWidth: 400,
    marginTop: 8
  },
  cell: {
    padding: 10
  }
});

class NutritionPanel extends Component {
  state = {
    data: {
      labels: [],
      datasets: [
        {
          label: "Nutrition",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: []
        }
      ]
    },
    value: 0,
    mealName: "",
    allMeals: [
      {
        date: "2019-04-04",
        mealsToAdd: [
          {
            name: "lunch",
            food: [
              {
                name: "Cheeseburger",
                calories: 200,
                fat: 50,
                carbs: 40,
                protein: 30
              },
              {
                name: "Fries",
                calories: 320,
                fat: 50,
                carbs: 60,
                protein: 10
              }
            ]
          },
          {
            name: "second lunch",
            food: [
              {
                name: "Bacon cheeseburger",
                calories: 400,
                fat: 65,
                carbs: 51,
                protein: 38
              }
            ]
          }
        ]
      },
      {
        date: "2019-04-05",
        mealsToAdd: [
          {
            name: "lunch",
            food: [
              {
                name: "Cheeseburger",
                calories: 400,
                fat: 33,
                carbs: 34,
                protein: 33
              },
              {
                name: "Fries",
                calories: 400,
                fat: 40,
                carbs: 60,
                protein: 40
              }
            ]
          },
          {
            name: "second lunch",
            food: [
              {
                name: "Bacon cheeseburger",
                calories: 210,
                fat: 20,
                carbs: 8,
                protein: 48
              }
            ]
          }
        ]
      }
    ],
    nutritionDate: moment().format("YYYY-MM-DD")
  };

  dayTotalsSum = (yAxis, index) => {
    let newSum = 0;

    for (let j = 0; j < this.state.allMeals[index].mealsToAdd.length; j++) {
      for (
        let k = 0;
        k < this.state.allMeals[index].mealsToAdd[j].food.length;
        k++
      ) {
        newSum += this.state.allMeals[index].mealsToAdd[j].food[k][yAxis];
      }
    }

    return newSum;
  };

  changeChartData = (yAxis, xAxis) => {
    if (this.state.xAxis === "thisWeek") {
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
      for (let i = 0; i < this.state.allMeals.length; i++) {
        let newSum = this.dayTotalsSum(this.state.yAxis, i);
        const dateToFind = moment(this.state.allMeals[i].date).format(
          "MM-DD-YYYY"
        );
        const id = dateArray.indexOf(dateToFind);
        newData[id] = newSum;
      }
      newChartData.datasets[0].data = newData;
      this.setState({ data: newChartData });
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      if (this.state.xAxis === "thisWeek") {
        this.changeChartData();
      }
    });
  };

  addMeal = () => {
    let mealArray = [...this.state.allMeals];
    mealArray[0].mealsToAdd.push({ name: this.state.mealName });
    this.setState({ allMeals: mealArray, mealName: "" });
  };

  selectDate = event => {
    this.setState({ nutritionDate: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={8} className={classes.demo}>
        <Typography
          style={{ width: "100%", marginTop: 20 }}
          variant="h5"
          gutterBottom
        >
          Nutrition
        </Typography>
        <Grid item sm={12} md={6}>
          <NutritionTracker
            classes={classes}
            value={this.state.value}
            handleChange={this.handleChange}
            mealsToAdd={this.state.allMeals[0].mealsToAdd}
            handleInputChange={this.handleInputChange}
            mealName={this.state.mealName}
            addMeal={this.addMeal}
            selectDate={this.selectDate}
            nutritionDate={this.state.nutritionDate}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <NutritionReports
            paper={classes.paper}
            handleInputChange={this.handleInputChange}
            chartType={this.state.chartType}
            data={this.state.data}
            changeChartData={this.changeChartData}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(NutritionPanel);
