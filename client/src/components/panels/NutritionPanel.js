import React, { Component } from "react";
import NutritionTracker from "./NutritionTracker";
import NutritionReports from "./NutritionReports";
import moment from "moment";
import API from "../../utils/API";

// Material UI imports
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    height: 400,
    [theme.breakpoints.down("md")]: {
      height: 700
    },
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  xlPaperHeight: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    height: 700,
    [theme.breakpoints.down("md")]: {
      height: 700
    },
    display: "flex",
    flexDirection: "column",
    position: "relative"
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
    minWidth: 200,
    marginTop: 8
  },
  cell: {
    padding: 4
  },
  tooltip: {
    backgroundColor: theme.palette.common.black
  },
  panelHeader: {
    fontFamily: "'Lobster', cursive",
    position: "absolute",
    top: -20,
    fontSize: "1.5em",
    textShadow: "1px 1px 1px " + theme.palette.secondary.contrastText,
    fontWeight: 300
  },
  panelName: {
    width: "100%",
    marginTop: 20,
    fontFamily: "'Lobster', cursive",
    textAlign: "center"
  },
  tableScrollBar: {
    "&::-webkit-scrollbar": {
      width: 8
    },

    "&::-webkit-scrollbar-track": {
      background: "#00000040"
    },

    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.secondary.main
    },

    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.secondary.dark
    }
  }
});

class NutritionPanel extends Component {
  state = {
    fetchDropdownData: false,
    data: {
      labels: [],
      datasets: [
        {
          label: "Nutrition",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          data: []
        }
      ]
    },
    value: 0,
    mealName: "",
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
    ],
    nutritionDate: moment().format("YYYY-MM-DD"),
    mealToLoad: { label: null },
    chartType: "pieChart",
    xAxis: "today"
  };

  componentDidMount = () => {
    this.selectMealsByDate(this.state.nutritionDate);
    this.getNutritionByTimeframe();
  };

  dayTotalsSum = (yAxis, mealData) => {
    let newSum = 0;
    switch (yAxis) {
      case "fat":
        yAxis = "fats";
        break;
      case "carbs":
        yAxis = "carbohydrates";
        break;
    }

    for (let j = 0; j < mealData.meal.length; j++) {
      for (let k = 0; k < mealData.meal[j].foodItem.length; k++) {
        newSum +=
          mealData.meal[j].foodItem[k][yAxis] *
          mealData.meal[j].foodItem[k].servingQty;
      }
    }

    return newSum;
  };

  getNutritionByTimeframe = () => {
    let newChartData = Object.assign({}, this.state.data);

    if (this.state.xAxis === "thisWeek") {
      API.getMealsByDate(moment().week(), localStorage.userId).then(res => {
        if (this.state.chartType === "pieChart") {
          newChartData.labels = ["Fat", "Carbs", "Protein"];

          let newData = [0, 0, 0];

          for (let b = 0; b < newData.length; b++) {
            for (let i = 0; i < res.data.length; i++) {
              let newSum = this.dayTotalsSum(
                newChartData.labels[b].toLowerCase(),
                res.data[i]
              );
              newData[b] += newSum;
            }
          }

          newChartData.datasets = [
            {
              data: [
                newData[0].toFixed(2),
                newData[1].toFixed(2),
                newData[2].toFixed(2)
              ],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }
          ];
        } else {
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
            let newSum = this.dayTotalsSum(this.state.yAxis, res.data[i]);
            const dateToFind = moment(res.data[i].date).format("MM-DD-YYYY");
            const id = dateArray.indexOf(dateToFind);
            newData[id] = newSum.toFixed(2);
          }

          let color = "";
          switch (this.state.yAxis) {
            case "calories":
              color = "cadetblue";
              break;
            case "fat":
              color = "#FF6384";
              break;
            case "carbs":
              color = "#36A2EB";
              break;
            case "protein":
              color = "#FFCE56";
              break;
          }

          newChartData.datasets = [
            {
              label: this.state.yAxis,
              backgroundColor: color,
              borderColor: "lightgrey",
              borderWidth: 2,
              hoverBackgroundColor: color,
              data: newData
            }
          ];
        }

        this.setState({ data: newChartData });
      });
    } else if (this.state.xAxis === "today") {
      API.getMealsByDate(
        moment().format("YYYY-MM-DD"),
        localStorage.userId
      ).then(res => {
        if (res.data.length) {
          let dailyData = [0, 0, 0, 0];
          res.data[0].meal.forEach(meal => {
            meal.foodItem.forEach(foodItem => {
              dailyData[0] += foodItem.calories * foodItem.servingQty;
              dailyData[1] += foodItem.fats * foodItem.servingQty;
              dailyData[2] += foodItem.carbohydrates * foodItem.servingQty;
              dailyData[3] += foodItem.protein * foodItem.servingQty;
            });
          });

          if (this.state.chartType === "pieChart") {
            newChartData.labels = ["Fat", "Carbs", "Protein"];

            newChartData.datasets = [
              {
                data: [
                  dailyData[1].toFixed(2),
                  dailyData[2].toFixed(2),
                  dailyData[3].toFixed(2)
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
              }
            ];
          } else {
            newChartData.labels = ["Daily Tracking"];

            newChartData.datasets = [
              {
                label: "Calories",
                backgroundColor: "cadetblue",
                borderWidth: 1,
                hoverBackgroundColor: "cadetblue",
                data: [dailyData[0].toFixed(2)]
              },
              {
                label: "Fat",
                backgroundColor: "#FF6384",
                borderWidth: 1,
                hoverBackgroundColor: "#FF6384",
                data: [dailyData[1].toFixed(2)]
              },
              {
                label: "Carbs",
                backgroundColor: "#36A2EB",
                borderWidth: 1,
                hoverBackgroundColor: "#36A2EB",
                data: [dailyData[2].toFixed(2)]
              },
              {
                label: "Protein",
                backgroundColor: "#FFCE56",
                borderWidth: 1,
                hoverBackgroundColor: "#FFCE56",
                data: [dailyData[3].toFixed(2)]
              }
            ];
          }

          this.setState({ data: newChartData });
        }
      });
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  changeQuantity = event => {
    const { name, id, value } = event.target;
    let newFoodToAdd = [...this.state.mealsToAdd];
    newFoodToAdd[name].foodItem[id].servingQty = parseInt(value);
    this.setState({ mealsToAdd: newFoodToAdd });
  };

  handleLoadMealChange = meal => {
    this.setState({ mealToLoad: meal });
  };

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      if (this.state.xAxis) {
        this.getNutritionByTimeframe();
      }
    });
  };

  addMeal = () => {
    let mealArray = [...this.state.mealsToAdd];
    mealArray.push({
      name: this.state.mealToLoad.label || this.state.mealName,
      foodItem: []
    });

    if (this.state.mealToLoad.label) {
      API.getMeal(this.state.mealToLoad.value).then(res => {
        res.data[0].meal.foodItem.forEach(foodItem => {
          mealArray[mealArray.length - 1].foodItem.push({
            name: foodItem.name,
            carbohydrates: foodItem.carbohydrates,
            fats: foodItem.fats,
            protein: foodItem.protein,
            calories: foodItem.calories,
            servingQty: foodItem.servingQty,
            servingUnit: foodItem.servingUnit
          });
        });

        this.setState({ value: mealArray.length - 1 });
      });
    }

    this.setState({
      mealsToAdd: mealArray,
      mealName: "",
      mealToLoad: { label: null }
    });
  };

  selectMealsByDate = date => {
    this.setState({ nutritionDate: date, value: 0 }, () => {
      API.getMealsByDate(this.state.nutritionDate, localStorage.userId).then(
        res => {
          if (res.data.length) {
            const newMealsArr = [...res.data[0].meal];

            this.setState({
              mealsToAdd: newMealsArr
            });
          } else {
            this.setState({
              mealsToAdd: [],
              mealName: ""
            });
          }
        }
      );
    });
  };

  selectDate = event => {
    const newDate = event.target.value;
    this.selectMealsByDate(newDate);
  };

  addFoodItem = food => {
    const foodArr = [...this.state.mealsToAdd];
    foodArr[this.state.value].foodItem.push({
      name: food.foodItem[0].name,
      fats: food.foodItem[0].fats,
      carbohydrates: food.foodItem[0].carbohydrates,
      protein: food.foodItem[0].protein,
      calories: food.foodItem[0].calories,
      servingQty: food.foodItem[0].servingQty,
      servingUnit: food.foodItem[0].servingUnit
    });
    // console.log(this.state.value)
    // debugger;
    this.setState({ mealsToAdd: foodArr });
  };

  saveNutritionDay = () => {
    this.setState({ fetchDropdownData: true }, () => {
      let data = {
        Nutrition: {
          date: this.state.nutritionDate,
          week: moment(this.state.nutritionDate, "YYYY-MM-DD").week(),
          user: localStorage.userId,
          meal: this.state.mealsToAdd
        }
      };
      API.saveMeal(data.Nutrition).then(res => {
        this.getNutritionByTimeframe();
        this.setState({ fetchDropdownData: false });
      });
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={8} className={classes.demo}>
        <Typography className={classes.panelName} variant="h3" gutterBottom>
          Nutrition
        </Typography>
        <Grid item sm={12} md={this.props.xlNut ? 12 : 6}>
          <NutritionTracker
            xlNut={this.props.xlNut}
            handleLoadMealChange={this.handleLoadMealChange}
            mealToLoad={this.state.mealToLoad.label}
            classes={classes}
            dropDownChange={this.dropDownChange}
            value={this.state.value}
            handleChange={this.handleChange}
            mealsToAdd={this.state.mealsToAdd}
            handleInputChange={this.handleInputChange}
            mealName={this.state.mealName}
            addMeal={this.addMeal}
            selectDate={this.selectDate}
            nutritionDate={this.state.nutritionDate}
            addFoodItem={this.addFoodItem}
            saveNutritionDay={this.saveNutritionDay}
            changeQuantity={this.changeQuantity}
          />
        </Grid>
        <Grid item sm={12} md={this.props.xlNut ? 12 : 6}>
          <NutritionReports
            textColor={this.props.theme.typography.body1.color}
            classes={classes}
            xlNut={this.props.xlNut}
            handleInputChange={this.handleInputChange}
            chartType={this.state.chartType}
            xAxis={this.state.xAxis}
            data={this.state.data}
            changeChartData={this.changeChartData}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(NutritionPanel);
