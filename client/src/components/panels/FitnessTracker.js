import React from "react";
import moment from "moment";

// Material UI imports
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import DatePickers from "../DatePicker";
import SimpleTable from "../Table";
import Grid from "@material-ui/core/Grid";

function FitnessTracker(props) {
  return (
    <Paper className={props.classes.paper}>
      <Grid container> 
        <Grid item xs={6}>
          <TextField
            fullWidth
            select
            label="Saved Workouts"
            className={props.classes.textField}
            SelectProps={{
              native: true,
              MenuProps: {
                className: props.classes.menu
              }
            }}
            margin="dense"
            variant="filled"
            value={props.selectedWorkout}
            onChange={props.clickSavedWorkout}
          >
            <option>None</option>
            {props.savedWorkouts.length
              ? props.savedWorkouts.map(workout => (
                  <option key={workout.name}>{workout.name}</option>
                ))
              : null}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <DatePickers
            margin="dense"
            label="Workout Date"
            variant="filled"
            style={{ float: "right" }}
            value={props.workoutDate}
            changeHandler={props.selectDate}
            name="workoutDate"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-name"
            label="Name"
            value={props.woName}
            onChange={props.handleNameChange}
            className={props.classes.textField}
            margin="dense"
            variant="filled"
          />
        </Grid>
        <Grid>
          <Button
            style={{ margin: "25px 10px" }}
            variant="contained"
            size="small"
            color="primary"
            className={props.classes.button}
            onClick={props.loadWorkOuts}
          >
            Save Workout
          </Button>

          <Button
            style={{ margin: "25px 10px" }}
            variant="contained"
            size="small"
            color="primary"
            className={props.classes.button}
          >
            New Workout
          </Button>
        </Grid>
        </Grid>
      {!props.resistanceToAdd.length && !props.cardioToAdd.length ? (
        <h3 style={{ flexGrow: 1, textAlign: "center" }}>
          No exercises :(
        </h3>
      ) : (
        <div>
          {props.resistanceToAdd.length ? (
            <SimpleTable
              style={{ marginTop: 0 }}
              exerciseType="resistanceToAdd"
              changeHandler={props.handleInputChange}
              newValue={props.resistanceToAdd}
              headings={["Exercise", "Sets", "Reps", "Weight"]}
              rows={props.resistanceToAdd}
            />
          ) : (
            ""
          )}
          {props.cardioToAdd.length ? (
            <SimpleTable
              exerciseType="cardioToAdd"
              changeHandler={props.handleCardio}
              newValue={props.cardioToAdd}
              headings={["Exercise", "Distance", "Time"]}
              rows={props.cardioToAdd}
            />
          ) : (
            ""
          )}
        </div>
      )}
      <Grid container >
      <Grid item xs={3}>
      <Button
        color="primary"
        onClick={props.handleClose("resistanceToAdd")}
      >
        Add Resistance
      </Button>
      </Grid>

      <Grid item xs={3}>
      <Button
        color="primary"
        onClick={props.handleClose("cardioToAdd")}
      >
        Add Cardio
      </Button>
      </Grid>

    {/*   <Popper
        open={props.open}
        anchorEl={props.anchorEl}
        transition
        disablePortal
        placement="top-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={props.handleClickAway}>
                <MenuList>
                  <MenuItem onClick={props.handleClose("resistanceToAdd")}>
                    Add Resistance
                  </MenuItem>
                  <MenuItem onClick={props.handleClose("cardioToAdd")}>
                    Add Cardio
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper> */}

      <Grid item xs={6}>
      <Button
        variant="contained"
        style={{ float: "right" }}
        // size="small"
        color="primary"
        disabled={!props.resistanceToAdd.length && !props.cardioToAdd.length}
        onClick={props.saveDay}
        className={props.classes.button}
      >
        Save
      </Button>
      </Grid>
      </Grid>


    </Paper>
  );
}

export default FitnessTracker;
