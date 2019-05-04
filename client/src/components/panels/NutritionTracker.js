import React from "react";
import Meal from "../../pages/Meal";
import DatePickers from "../DatePicker";
import moment from "moment";
import IntegrationReactSelect from "../MealsDropdown";

// Material UI imports
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

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
    <Paper
      className={props.xlNut ? classes.xlPaperHeight : classes.paper}
      style={{ position: "relative" }}
    >
      <Typography
        component="h1"
        className={classes.panelHeader}
        color="secondary"
      >
        Tracking
      </Typography>
      {/* <h2 className={classes.panelHeader}>Tracking</h2> */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={5}>
          <IntegrationReactSelect
            fetchDropdownData={props.fetchDropdownData}
            handleLoadMealChange={props.handleLoadMealChange}
          />
          <TextField
            fullWidth
            id="filled-dense"
            value={props.mealName}
            onChange={props.handleInputChange("mealName")}
            label="New meal name"
            style={{ padding: 0 }}
            margin="dense"
            variant="filled"
          />
        </Grid>
        <Grid item sm={2}>
          <Button
            disabled={!props.mealToLoad}
            variant="contained"
            size="small"
            color="primary"
            disabled={!props.mealToLoad}
            className={classes.margin}
            onClick={props.addMeal}
          >
            Load Meal
          </Button>
          <br />
          <Button
            variant="contained"
            size="small"
            color="primary"
            disabled={props.mealName.trim().length < 2}
            className={classes.margin}
            onClick={props.addMeal}
          >
            Add Meal
          </Button>
        </Grid>

        <Grid item xs={12} sm={5}>
          <DatePickers
            //margin="dense"
            label="Meal Date"
            variant="filled"
            //style={{ width: 200 }}
            value={props.nutritionDate}
            changeHandler={props.selectDate}
            name="nutritionDate"
          />
        </Grid>
      </Grid>
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
              className={classes.tableScrollBar}
              style={{
                flexGrow: 1,
                flexDirection: "column",
                overflowY: "auto",
                overflowX: "hidden",
                backgroundColor: "#00000017"
              }}
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
                    {meal.foodItem
                      ? meal.foodItem.map(food => (
                          <TableRow>
                            <TableCell component="th" scope="row">
                              {food.name}
                            </TableCell>
                            <TableCell className={classes.cell} align="right">
                              {food.calories}
                            </TableCell>
                            <TableCell className={classes.cell} align="right">
                              {food.fats}
                            </TableCell>
                            <TableCell className={classes.cell} align="right">
                              {food.carbohydrates}
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
      {props.mealsToAdd.length ? (
        <Meal
          addFoodItem={props.addFoodItem}
          saveNutritionDay={props.saveNutritionDay}
        />
      ) : null}
    </Paper>
  );
}

export default NutritionTracker;
