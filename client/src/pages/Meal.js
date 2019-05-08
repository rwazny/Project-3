import React, { Component, Fragment } from "react";
import API from "../utils/API";
import auth from "../firebase.js";
import Dropdown from "../../src/components/Dropdown";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

//Modal
const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Meal extends Component {
  state = {
    mealDate: null,
    results: [],
    food: "",
    open: false,
    foodNames: "",
    foodData: []
  };

  fetchInstantData = data => {
    this.setState({ foodNames: data });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  clickFood = index => {
    this.handleClose();
    this.props.addFoodItem(this.state.foodData[index]);
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
    this.handleClickOpen();
    this.setState({ foodData: [] });
    event.preventDefault();

    const APP_ID = "eb95abc3";
    const APP_KEY = "368d7805ed86900874f9dc4fb92aba0f";

    let foodSearchQuery = document.getElementById("foodSearchInput").value;
    console.log(foodSearchQuery);
    for (let i = 0; i < 5; i++) {
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
            query: this.state.foodNames[i].label
          })
        }
      );

      if (response.status !== 200) {
        console.log("Error: " + response);
      }
      const data = await response.json();

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
          food["servingQty"] = element.serving_qty;
          food["servingUnit"] = element.serving_unit;
          foodItemArr.push(food);
        });

        const data = {
          Meal: {
            name: foodSearchQuery,
            foodItem: foodItemArr
          }
        };

        let foodDataArr = [...this.state.foodData];
        foodDataArr.push(data.Meal);
        this.setState({ foodData: foodDataArr });
      } else {
        alert("invalid food");
      }
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        style={{ marginTop: 6 }}
        container
        spacing={8}
        direction="row"
        justify="space-between"
      >
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Food
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {this.state.foodData.map((food, index) => (
              <Fragment>
                <ListItem button>
                  <ListItemText
                    id={index}
                    onClick={() => this.clickFood(index)}
                    primary={food.foodItem[0].name}
                    secondary={food.foodItem[0].calories}
                  />
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </List>
        </Dialog>
        <Grid item md={6}>
          <Dropdown fetchInstantData={this.fetchInstantData} />
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
                Search For Food
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

Meal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Meal);
