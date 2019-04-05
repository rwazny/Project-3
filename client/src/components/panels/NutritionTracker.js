import React from "react";
import Meal from "../../pages/Meal";
import DatePickers from "../DatePicker";
import moment from "moment";

// Material UI imports
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 5 }}>
      {props.children}
    </Typography>
  );
}

function NutritionTracker(props) {
  const { value, classes } = props;

  return (
    <Paper className={classes.paper}>
      <div style={{ display: "flex" }}>
        <TextField
          id="filled-dense"
          value={props.mealName}
          onChange={props.handleInputChange("mealName")}
          label="Meal name"
          className=""
          margin="dense"
          variant="filled"
        />
        <Button
          variant="contained"
          size="small"
          color="primary"
          disabled={!props.mealName.trim()}
          className={classes.margin}
          onClick={props.addMeal}
        >
          Add Meal
        </Button>
        <DatePickers
          margin="dense"
          label="Meal date"
          variant="filled"
          style={{ width: 200 }}
          value={props.nutritionDate}
          changeHandler={props.selectDate}
          name="nutritionDate"
        />
      </div>
      <div style={{ height: 268 }} className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={props.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {props.mealsToAdd.length ? (
              props.mealsToAdd.map((meal, index) => (
                <Tab key={index} label={meal.name} />
              ))
            ) : (
              <Tab label="No meals" />
            )}
          </Tabs>
        </AppBar>
        {props.mealsToAdd.map(
          (meal, index) =>
            value === index && (
              <div
                style={{ height: 239, overflowY: "auto", overflowX: "hidden" }}
              >
                <TabContainer key={index}>
                  <Table style={{ width: "auto", tableLayout: "auto" }}>
                    <colgroup>
                      <col style={{ width: "60%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "10%" }} />
                    </colgroup>
                    <TableHead>
                      <TableRow style={{ height: 30 }}>
                        <TableCell>Food</TableCell>
                        <TableCell className={classes.cell} align="right">
                          Calories
                        </TableCell>
                        <TableCell className={classes.cell} align="right">
                          Fat (g)
                        </TableCell>
                        <TableCell className={classes.cell} align="right">
                          Carbs (g)
                        </TableCell>
                        <TableCell className={classes.cell} align="right">
                          Protein (g)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {meal.food
                        ? meal.food.map(food => (
                            <TableRow>
                              <TableCell component="th" scope="row">
                                {food.name}
                              </TableCell>
                              <TableCell className={classes.cell} align="right">
                                {food.calories}
                              </TableCell>
                              <TableCell className={classes.cell} align="right">
                                {food.fat}
                              </TableCell>
                              <TableCell className={classes.cell} align="right">
                                {food.carbs}
                              </TableCell>
                              <TableCell className={classes.cell} align="right">
                                {food.protein}
                              </TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </TabContainer>
              </div>
            )
        )}
      </div>
      <Meal addFoodItem={props.addFoodItem} />
    </Paper>
  );
}

export default NutritionTracker;
