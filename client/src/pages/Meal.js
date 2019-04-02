import React, { Component } from "react";
import API from "../utils/API";
import FoodResults from "../components/FoodResults";
import Dropdown from "../../src/components/Dropdown";
import Button from "@material-ui/core/Button";



class Meal extends Component {
  state = {
    results: [],
    food: ""
  };

  componentDidMount() {
    this.load();
  }

  load = () => {
      console.log("method to call on loading");
  };

  saveMeal(mealData){
    console.log("saving meal data to the database");
    console.log(mealData);

    API.saveMeal(mealData)
      .then(res => this.load())
      .catch(err => console.log(err));
  };

  handleSubmit = async event => {
    event.preventDefault();

    const APP_ID = 'eb95abc3';
    const APP_KEY = '368d7805ed86900874f9dc4fb92aba0f';

    let foodSearchQuery = document.getElementById("foodSearchInput").value;
    console.log(foodSearchQuery)
    const response = await fetch(
      'https://trackapi.nutritionix.com/v2/natural/nutrients',
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
    console.log(data)
    const results = data.foods;
    // console.log(results);

    if (results !== undefined) {
      this.setState({ results });
      let foodItemArr = [];
      results.forEach(element => {
        let food = {};
        food['name'] = element.food_name;
        food['calories'] = element.nf_calories;
        food['protein'] = element.nf_protein;
        food['carbohydrates'] = element.nf_total_carbohydrate;
        food['fats'] = element.nf_total_fat;
        foodItemArr.push(food);
      });

      const data = {
        Meal: {
          name: foodSearchQuery,
          foodItem: foodItemArr
        }
      };

      this.saveMeal(data.Meal);
    }
    else {
      alert("invalid food");
    }
  };


  render() {
      return(
          <div className="container">
          <div style={{ display: 'flex' }}>
          <div>
            <Dropdown />
            </div>
            <div>
            <Button 
              style={{ margin: "25px 10px" }}
              variant="contained"
              size="small"
              color="primary"
              onClick={this.handleSubmit}>
              Submit
              </Button>


              <br />
            </div>
            </div>
                <FoodResults results={this.state.results}/>
          </div>
      );
  }
}
  export default Meal;