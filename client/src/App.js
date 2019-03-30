import React, { Component } from "react";
import API from "../src/utils/API";
import auth from "./firebase.js";
import LogIn from "./components/LogIn";
import TableRow from "./components/TableRow";
import Tab from "./components/Tab";

class App extends Component {
  state = {
    resistanceToAdd: [],
    cardioToAdd: [],
    user: null,
    workoutDate: null,
    selectedWorkout: null,
    woName: ""
  };
  styles = {
    table: {
      table: {
        borderCollapse: "collapse"
      },
      border: {
        border: "1px solid #dddddd",
        width: 140
      }
    }
  };
  componentDidMount = () => {
    API.getAllWorkOuts().then(res => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      console.log(today);
      this.setState({ workoutDate: today });

      console.log(res);

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
    });
  };

  addExercise = event => {
    const { name } = event.target;
    var joined = this.state[name].concat({ name: "" });
    this.setState({ [name]: joined });
  };
  handleInputChange = event => {
    const { id, value, name } = event.target;
    this.state.resistanceToAdd[id][name] = value;
    this.setState({ resistanceToAdd: this.state.resistanceToAdd });
  };
  saveDay = () => {
    const data = {
      WorkOut: {
        name: this.state.woName,
        resistance: {
          name: this.state.resistanceToAdd[0].exerciseName,
          sets: parseInt(this.state.resistanceToAdd[0].sets),
          reps: parseInt(this.state.resistanceToAdd[0].reps),
          weight: parseInt(this.state.resistanceToAdd[0].weight)
        }
      }
    };
    // SAVE WORKOUT, NOT SINGLE EXERCISE
    API.saveWorkOut(data.WorkOut).then(res =>
      API.pushWorkOut({ userId: localStorage.userId, id: res.data._id })
    );
  };

  selectDate = event => {
    this.setState({ workoutDate: event.target.value });
  };

  selectWorktout = event => {
    this.setState({ selectedWorkout: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="App">
          {this.state.user && <h1>{this.state.user.email}</h1>}
          <LogIn />
        </div>
        <br />
        <br />
        <Tab>
          <select onChange={this.selectWorktout}>
            <option value="" disabled selected>
              Select a workout
            </option>
            <option>Bench</option>
          </select>
          <input
            value={this.state.workoutDate}
            onChange={this.selectDate}
            type="date"
            name="workoutDate"
          />
          {this.state.selectedWorkout ? (
            <button>Save Workout</button>
          ) : (
            <button disabled>Save Workout</button>
          )}

          <button>New Workout</button>
          <br />
          <input type="text" value={this.state.selectedWorkout} />
          <br />

          <button name="resistanceToAdd" onClick={this.addExercise}>
            Add Resistance Exercise
          </button>
          <button name="cardioToAdd" onClick={this.addExercise}>
            Add Cardio Exercise
          </button>
          {this.state.resistanceToAdd.length ? (
            <table style={this.styles.table.table}>
              Resistance
              <tbody>
                <tr>
                  <th style={this.styles.table.border}>Exercise</th>
                  <th style={this.styles.table.border}>Sets</th>
                  <th style={this.styles.table.border}>Reps</th>
                  <th style={this.styles.table.border}>Weight</th>
                </tr>
                {this.state.resistanceToAdd.map((row, index) => (
                  <TableRow
                    id={index}
                    data={this.state.resistanceToAdd[index]}
                    resistance={true}
                    key={row}
                    changeHandler={this.handleInputChange}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
          <br />
          {this.state.cardioToAdd.length ? (
            <table style={this.styles.table.table}>
              Cardio
              <tbody>
                <tr>
                  <th style={this.styles.table.border}>Exercise</th>
                  <th style={this.styles.table.border}>Time</th>
                  <th style={this.styles.table.border}>Distance</th>
                </tr>
                {this.state.cardioToAdd.map(row => (
                  <TableRow key={row} />
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
          {this.state.resistanceToAdd.length ||
          this.state.cardioToAdd.length ? (
            <button onClick={this.saveDay}>Save Day</button>
          ) : (
            ""
          )}
        </Tab>
      </React.Fragment>
    );
  }
}
export default App;
