import React, { Component } from "react";
import FoodIndexItem from "./FoodIndexItem";

class FoodResults extends Component {
  constructor(props, context) {
    super(props, context);
  }

  totalCal = () => {
    let totalcal = 0;
    this.props.results.forEach(element => {
      totalcal += element.nf_calories;
    });
    
    return totalcal;
  };


  render() {
    return (
      <div className="food-results-container">
        {/* <h4>Total Calories: {this.totalCal()}</h4>
        <h4>Total Calories Remaining for Today: {2500 - this.totalCal()}</h4> */}

        <div id="food-results">
          {this.props.results.map((element, index) => {
            const name = element.food_name;
            const brand_name = element.brand_name;
            const calories = element.nf_calories;
            const protein = element.nf_protein;
            const carbohydrates = element.nf_total_carbohydrate;
            const fats = element.nf_total_fat;

            return (
              <FoodIndexItem
                name={name}
                key={`food-idx-${index}`}
                brand_name={brand_name}
                calories={calories}
                protein={protein}
                carbohydrates={carbohydrates}
                fats={fats}
              
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default FoodResults;
