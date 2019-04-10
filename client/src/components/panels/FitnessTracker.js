import React from "react";
import moment from "moment";

// Material UI imports
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DatePickers from "../DatePicker";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import WorkoutsDropdown from "../WorkoutsDropdown";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 5 }}>
      {props.children}
    </Typography>
  );
}

function FitnessTracker(props) {
  const { value, classes } = props;
  return (
    <Paper className={props.xlFit ? classes.xlPaperHeight : classes.paper}>
      <Typography
        component="h1"
        className={classes.panelHeader}
        color="secondary"
      >
        Tracking
      </Typography>
      <Grid justify="space-between" container>
        <Grid item xs={6}>
          <WorkoutsDropdown
            handleLoadWorkoutChange={props.handleLoadWorkoutChange}
          />
          <TextField
            fullWidth
            id="outlined-name"
            label="Name"
            value={props.woName}
            onChange={props.handleNameChange}
            className={classes.textField}
            margin="dense"
            variant="filled"
          />
        </Grid>
        <Grid item xs={5}>
          <DatePickers
            margin="dense"
            label="Workout Date"
            variant="filled"
            value={props.workoutDate}
            changeHandler={props.selectDate}
            name="workoutDate"
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
          <Tab label="Resistance" />
          <Tab label="Cardio" />
        </Tabs>
      </AppBar>

      <div
        className={classes.tableScrollBar}
        style={{
          flexGrow: 1,
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden"
        }}
      >
        {value === 0 && (
          <TabContainer>
            <Table style={{ tableLayout: "auto" }}>
              <colgroup>
                <col style={{ width: "70%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <TableHead>
                <TableRow style={{ height: 30 }}>
                  <TableCell className={classes.cell} align="right">
                    Exercise
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Reps
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Sets
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Weight
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.resistanceToAdd.map((exercise, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Input
                        id={index.toString()}
                        onChange={props.handleInputChange("resistanceToAdd")}
                        name="name"
                        placeholder="Exercise"
                        className={classes.input}
                        value={exercise.name}
                      />
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      <Input
                        id={index.toString()}
                        name="reps"
                        onChange={props.handleInputChange("resistanceToAdd")}
                        style={{ width: 50 }}
                        placeholder="Reps"
                        type="number"
                        className={classes.input}
                        value={exercise.reps}
                      />
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      <Input
                        id={index.toString()}
                        onChange={props.handleInputChange("resistanceToAdd")}
                        name="sets"
                        placeholder="Sets"
                        type="number"
                        className={classes.input}
                        value={exercise.sets}
                      />
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      <Input
                        id={index.toString()}
                        onChange={props.handleInputChange("resistanceToAdd")}
                        name="weight"
                        placeholder="Weight"
                        type="number"
                        className={classes.input}
                        value={exercise.weight}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <Table style={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow style={{ height: 30 }}>
                  <TableCell className={classes.cell} align="right">
                    Exercise
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Distance (mi)
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Time (mins)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.cardioToAdd.map((exercise, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Input
                        id={index.toString()}
                        onChange={props.handleInputChange("cardioToAdd")}
                        name="name"
                        placeholder="Exercise"
                        className={classes.input}
                        value={exercise.name}
                      />
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      <Input
                        id={index.toString()}
                        onChange={props.handleInputChange("cardioToAdd")}
                        name="distance"
                        style={{ width: 50 }}
                        placeholder="Distance"
                        type="number"
                        className={classes.input}
                        value={exercise.distance}
                      />
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      <Input
                        id={index.toString()}
                        onChange={props.handleInputChange("cardioToAdd")}
                        name="time"
                        style={{ width: 50 }}
                        placeholder="Time"
                        type="number"
                        className={classes.input}
                        value={exercise.time}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabContainer>
        )}
      </div>
      <Grid style={{ marginTop: 6 }} container>
        <Grid item xs={8}>
          <Button
            style={{ marginRight: 6 }}
            color="primary"
            variant="contained"
            onClick={props.handleClose("resistanceToAdd")}
          >
            Add Resistance
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={props.handleClose("cardioToAdd")}
          >
            Add Cardio
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ float: "right" }}
            // size="small"
            color="secondary"
            disabled={
              !props.resistanceToAdd.length && !props.cardioToAdd.length
            }
            onClick={props.saveDay}
            className={classes.button}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FitnessTracker;
