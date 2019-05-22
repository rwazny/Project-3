import React from "react";
import { Bar, Pie } from "react-chartjs-2";

function LandingChart(props) {
  return (
    <React.Fragment>
      {props.isPie ? (
        <Pie
          data={props.data}
          width={100}
          height={50}
          options={props.options}
        />
      ) : (
        <Bar
          data={props.data}
          width={100}
          height={50}
          options={props.options}
        />
      )}
    </React.Fragment>
  );
}

export default LandingChart;
