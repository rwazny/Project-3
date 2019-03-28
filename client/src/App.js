import React, { Component } from 'react';
import API from '../src/utils/API';
import auth from './firebase.js';
import LogIn from './components/LogIn';
import TableRow from './components/TableRow';

class App extends Component {
  state = {
    resistanceToAdd: [],
    cardioToAdd: [],
    user: null
  };
  styles = {
    table: {
      table: {
        borderCollapse: 'collapse'
      },
      border: {
        border: '1px solid #dddddd',
        width: 140
      }
    }
  };
  componentDidMount = () => {
    API.getAllWorkOuts().then(res => {
      console.log(res);
    });
    auth.onAuthStateChanged(firebaseUser => {
      this.setState({
        user: firebaseUser
      });

      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log('not logged in');
      }
    });
  };

  addExercise = event => {
    const { name } = event.target;
    var joined = this.state[name].concat({ name: '' });
    this.setState({ [name]: joined });
  };
  handleInputChange = event => {
    const { id, value, name } = event.target;
    this.state.resistanceToAdd[id][name] = value;
    this.setState({ resistanceToAdd: this.state.resistanceToAdd });
  };
  saveDay = () => {
    const data = {
      resistance: {
        name: this.state.resistanceToAdd[0].exerciseName,
        sets: parseInt(this.state.resistanceToAdd[0].sets),
        reps: parseInt(this.state.resistanceToAdd[0].reps),
        weight: parseInt(this.state.resistanceToAdd[0].weight)
      }
    };
    API.addExercise(data);
    console.log(data);
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          {this.state.user && <h1>{this.state.user.email}</h1>}
          <LogIn />
        </div>
        <div>
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
            ''
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
            ''
          )}
          {this.state.resistanceToAdd.length ||
          this.state.cardioToAdd.length ? (
            <button onClick={this.saveDay}>Save Day</button>
          ) : (
            ''
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default App;
