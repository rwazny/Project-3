import React, { Component } from "react";
import API from "../utils/API";
import auth from "../firebase.js";
import FoodResults from "../components/FoodResults";
import Dropdown from "../../src/components/Dropdown";
import Button from "@material-ui/core/Button";
import DatePickers from "../components/DatePicker";
import moment from "moment";
import { Grid } from "@material-ui/core";

class Meal extends Component {
  state = {
    mealDate: null,
    results: [],
    food: ""
  };

  componentDidMount = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    console.log(today);
    this.setState({ mealDate: today });

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

  selectDate = event => {
    this.setState({ mealDate: event.target.value });
  };

  saveMeal(mealData) {
    console.log("saving meal data to the database");
    console.log(mealData);

    API.saveMeal(mealData)
      .then(res => this.load())
      .catch(err => console.log(err));
  }

  handleSubmit = async event => {
    event.preventDefault();

    const APP_ID = "eb95abc3";
    const APP_KEY = "368d7805ed86900874f9dc4fb92aba0f";

    let foodSearchQuery = document.getElementById("foodSearchInput").value;
    console.log(foodSearchQuery);
    const response = await fetch(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      {
        method: "post",
        headers: {
          "x-app-key": APP_KEY,
          "x-app-id": APP_ID,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: foodSearchQuery
        })
      }
    );
    if (response.status !== 200) {
      console.log("Error: " + response);
    }
    const data = await response.json();
    //console.log(data);
    console.log(data);
    const results = data.foods;
    // console.log(results);

    if (results !== undefined) {
      this.setState({ results });
      const foodItemArr = [];
      results.forEach(element => {
        let food = {};
        food["name"] = element.food_name;
        food["calories"] = element.nf_calories;
        food["protein"] = element.nf_protein;
        food["carbohydrates"] = element.nf_total_carbohydrate;
        food["fats"] = element.nf_total_fat;
        foodItemArr.push(food);
      });

      const data = {
        Meal: {
          name: foodSearchQuery,
          foodItem: foodItemArr
        }
      };

      this.props.addFoodItem(data.Meal);
    } else {
      alert("invalid food");
    }
  };

  render() {
    return (
      <Grid
        style={{ marginTop: 6 }}
        container
        spacing={8}
        direction="row"
        justify="space-between"
      >
        <Grid item md={6}>
          <Dropdown />
        </Grid>
        <Grid item md={6}>
          <Grid container justify="space-between">
            <Grid item>
              <Button
                style={{ marginRight: 6 }}
                variant="contained"
                size="small"
                color="primary"
                onClick={this.handleSubmit}
              >
                Search
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={this.props.saveNutritionDay}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default Meal;
