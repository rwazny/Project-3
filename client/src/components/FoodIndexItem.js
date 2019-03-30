import React from "react";

export function FoodIndexItem({
  name,
  brand_name,
  calories,
  protein,
  carbohydrates,
  fats
  }) {
    return (
      <ul>
      <li>
        <div className="food-idx-item">
          <b>
            {name}
          </b>
          <p>brand_name: {brand_name}</p>
          <p>Calories: {calories}</p>
          <p>Protein: {protein} g</p>
          <p>Total Carbs: {carbohydrates} g</p>
          <p>Fat: {fats} g</p>
        </div>
      </li>
      </ul>
    );
  }
  export default FoodIndexItem;
