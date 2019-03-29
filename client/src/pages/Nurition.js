import React, { Component } from "react";
import API from "../utils/API";


class Nutrition extends Component {
  state = {
    nutrition: [],
    food: ""
  };

  componentDidMount() {
    this.loadNutrition();
  }

  loadNutrition = () => {
      console.log("load nutrition on nutrition.js");
    //  API.getNutrition()
    //    .then(res =>
    //      this.setState({ nutrition: res.data, food: "" })
    //    )
    //    .catch(err => console.log(err));
  };

  handleSubmit = async event => {
    event.preventDefault();


    // const BASE_URL = "https://trackapi.nutritionix.com/v2/search/instant?"+ query
    // console.log(BASE_URL);

    const APP_ID = 'eb95abc3';
    const APP_KEY = '368d7805ed86900874f9dc4fb92aba0f';
    // var options = {
    //   headers: { 'x-app-id': APP_ID, 'x-app-key': APP_KEY}
    // };

    let foodSearchQuery = document.getElementById("foodSearchInput").value;

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
      console.log("Error: " + response.status);
    }
    const data = await response.json();
    console.log(data);
    const nutrition = data.foods;
    if (nutrition !== undefined) {
      this.setState({ nutrition });
    }
    else {
      alert("invalid food");
    }
    console.log("new state: ", this.state.nutrition);
  };


  render() {
      return(

<div className="container">
<h2>
  What did you eat?{" "}
</h2>
<form onSubmit={this.handleSubmit}>
  <input
    id="foodSearchInput"
    placeholder="Example: chicken momo"
    type="text"
    required
  />

  <input id="submit-button" type="submit" value="Submit" />
  <br />
</form>

          <p> My data: </p>
          {/* <p>{this.state.nutrition}</p> */}
</div>
      );
  }
}
  export default Nutrition;