import React from "react";

///Material UI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

function Showcase(props) {
  return (
    <Paper
      style={{
        height: 290,
        padding: 20,
        margin: 20,
        display: "flex",
        textAlign: "center"
      }}
    >
      {props.left ? (
        <React.Fragment>
          <img src="https://via.placeholder.com/400x250" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "-webkit-fill-available"
            }}
          >
            <Typography variant="h4">{props.header}</Typography>
            <Typography variant="body1">{props.body}</Typography>
          </div>{" "}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "-webkit-fill-available"
            }}
          >
            <Typography variant="h4">{props.header}</Typography>
            <Typography variant="body1">{props.body}</Typography>
          </div>
          <img src="https://via.placeholder.com/400x250" />
        </React.Fragment>
      )}
    </Paper>
  );
}

export default Showcase;
