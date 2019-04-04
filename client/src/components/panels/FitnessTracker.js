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

function FitnessTracker(props) {
  return (
    <Paper className={props.classes.paper}>
      <div style={{ display: "flex", marginBottom: -8 }}>
        <TextField
          select
          label="Saved Workouts"
          className={props.classes.textField}
          SelectProps={{
            native: true,
            MenuProps: {
              className: props.classes.menu
            }
          }}
          style={{ width: "45%" }}
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
        <DatePickers
          margin="dense"
          label="Workout Date"
          variant="filled"
          style={{ float: "right" }}
          value={props.workoutDate}
          changeHandler={props.selectDate}
          name="workoutDate"
        />
      </div>
      <div style={{ marginBottom: -14 }}>
        <TextField
          style={{ width: "45%" }}
          id="outlined-name"
          label="Name"
          value={props.woName}
          onChange={props.handleNameChange}
          className={props.classes.textField}
          margin="dense"
          variant="filled"
        />

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
          variant="contained"
          size="small"
          color="primary"
          className={props.classes.button}
        >
          New Workout
        </Button>
      </div>

      <div
        style={{
          height: 230,
          marginBottom: 5,
          overflowY: "auto"
        }}
      >
        {!props.resistanceToAdd.length && !props.cardioToAdd.length ? (
          <h3 style={{ margin: "auto", marginTop: 110, width: 117 }}>
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
      </div>
      <Button
        size="small"
        color="primary"
        buttonRef={node => {
          props.handleAnchorEl(node);
        }}
        aria-owns={props.open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={props.handleToggle}
      >
        Add Exercise
      </Button>
      <Popper
        open={props.open}
        anchorEl={props.anchorEl}
        transition
        disablePortal
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
      </Popper>
      <Button
        variant="contained"
        style={{ float: "right" }}
        size="small"
        color="primary"
        disabled={!props.resistanceToAdd.length && !props.cardioToAdd.length}
        onClick={props.saveDay}
        className={props.classes.button}
      >
        Save
      </Button>
    </Paper>
  );
}

export default FitnessTracker;
