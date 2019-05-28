import React from "react";
import GifPlayer from "react-gif-player";
import Gif1 from "../images/phit1.gif";
import Gif2 from "../images/phit2.gif";
import Gif3 from "../images/phit3.gif";
import Still1 from "../images/phit1Still.jpg";
import Still2 from "../images/phit2Still.jpg";
import Still3 from "../images/phit3Still.jpg";
import Dialog from "@material-ui/core/Dialog";
import { css } from "emotion";

///Material UI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

const classes = {
  fullScreenBtn: css`
    position: absolute;
    bottom: 4px;
    cursor: pointer;
    right: 4px;
    font-size: 40px !important;
    color: papayawhip;
    z-index: 1;
    background-color: #00000073;
  `,
  textDiv: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: -webkit-fill-available;
    padding: 74px;
    margin: 30px;
    background: #00000030;
    border-radius: 4px;
    box-shadow: 2px 4px 8px #00000063;
    text-shadow: 1px 1px 2px #0000008a;
  `,
  gifDiv: css`
    width: 740px;
    height: 250px;
    overflow: hidden;
    border-radius: 4px;
    position: relative;
    box-shadow: 1px 1px 9px #00000080;
  `
};

class Showcase extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = newGif => {
    this.setState({ open: true, fullScreenGif: newGif });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { props } = this;
    return (
      <Paper
        style={{
          height: 290,
          padding: 20,
          margin: 20,
          display: "flex",
          textAlign: "center",
          backgroundColor: props.background
        }}
      >
        {props.left ? (
          <React.Fragment>
            <div className={classes.gifDiv}>
              <FullscreenIcon
                className={classes.fullScreenBtn}
                onClick={() => this.handleClickOpen(Gif1)}
              />
              <GifPlayer
                gif={Gif1}
                still={Still1}
                pauseRef={pause => (this.pauseGif = pause)}
              />
            </div>
            <div className={classes.textDiv}>
              <Typography variant="h4">{props.header}</Typography>
              <Typography variant="body1">{props.body}</Typography>
            </div>{" "}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={classes.textDiv}>
              <Typography variant="h4">{props.header}</Typography>
              <Typography variant="body1">{props.body}</Typography>
            </div>

            <div className={classes.gifDiv}>
              <FullscreenIcon
                className={classes.fullScreenBtn}
                onClick={
                  props.workout
                    ? () => this.handleClickOpen(Gif2)
                    : () => this.handleClickOpen(Gif3)
                }
              />
              <GifPlayer
                gif={props.workout ? Gif2 : Gif3}
                still={props.workout ? Still2 : Still3}
                pauseRef={pause => (this.pauseGif = pause)}
              />
            </div>
          </React.Fragment>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <img style={{ width: "100%" }} src={this.state.fullScreenGif} />
        </Dialog>
      </Paper>
    );
  }
}

export default Showcase;
