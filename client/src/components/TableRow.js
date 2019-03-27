import React from "react";
const styles = {
  border: {
    border: "1px solid #dddddd",
    width: 140
  }
};
function TableRow(props) {
  return (
    <tr>
      <td style={styles.border}>
        <input
          id={props.id}
          onChange={props.changeHandler}
          value={props.data.exerciseName}
          name="exerciseName"
        />
      </td>
      <td style={styles.border}>
        <input
          type="number"
          id={props.id}
          onChange={props.changeHandler}
          value={props.data.sets}
          name="sets"
          min="1"
          max="10000"
        />
      </td>
      <td style={styles.border}>
        <input
          type="number"
          id={props.id}
          onChange={props.changeHandler}
          value={props.data.reps}
          name="reps"
          min="1"
          max="10000"
        />
      </td>
      {props.resistance ? (
        <td style={styles.border}>
          <input
            type="number"
            id={props.id}
            onChange={props.changeHandler}
            value={props.data.weight}
            name="weight"
            min="1"
            max="10000"
          />
        </td>
      ) : (
        ""
      )}
    </tr>
  );
}
export default TableRow;
