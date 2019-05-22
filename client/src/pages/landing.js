import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import auth from "../firebase";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import landingBG from "../images/landingBG.jpg";

const styles = theme => ({
  demo: {
    [theme.breakpoints.up("lg")]: {
      width: 1170
    }
  },
  featureContainer: {
    [theme.breakpoints.up("lg")]: {
      width: 1170
    },
    marginTop: "200px "
  },
  background: {
    background: `linear-gradient(rgba(84, 138, 130, 0.43), rgba(105, 89, 94, 0.6)), url(${landingBG})`,
    height: 660,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed"
  },
  logo: {
    height: 364,
    width: 364,
    top: 150,
    left: "calc(221px / 2)",
    margin: "auto",
    backgroundColor: "#f06292",
    background: "linear-gradient(-69deg, #f06292, #ff94b8)",
    borderRadius: "50%",
    display: "inline-block",
    position: "relative",
    boxShadow: "4px 6px 8px #00000069"
  },
  main: {
    width: 364,
    margin: "auto",
    marginTop: 150,
    display: "block" // Fix IE 11 issue.
  },
  title: {
    fontSize: 170,
    fontFamily: "Lobster",
    position: "absolute",
    top: 95,
    right: 57,
    textShadow: "4px 0px 4px #00000070"
  },
  paper: {
    display: "flex",
    minHeight: 260,
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  phitlosophy: {},
  calorie: {
    display: "flex",
    flexDirection: "column"
  },
  exampleBtn: {
    width: 100,
    height: 100,
    borderRadius: "50%"
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between"
  }
});

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    errors: null
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  createAccount = event => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.setState({
          errors: null
        });

        API.createUser({ email: this.state.email }).then(res => {
          localStorage.userId = res.data._id;
          //setTimeout(() => this.props.history.push("/dashboard"), 500);
        });
      })
      .catch(error => {
        this.setState({
          errors: error.message
        });
      });
  };

  signIn = event => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.setState({
          errors: null
        });
        API.findUser(this.state.email).then(res => {
          localStorage.userId = res.data._id;
          //setTimeout(() => this.props.history.push("/dashboard"), 500);
        });
      })
      .catch(error => {
        this.setState({
          errors: error.message
        });
      });
  };

  signOut = event => {
    event.preventDefault();
    auth.signOut();
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.background} justify="center">
        <Grid container className={classes.demo}>
          <Grid item sm={6}>
            <div className={classes.logo}>
              <Typography className={classes.title} variant="h1">
                Phit
              </Typography>
            </div>
          </Grid>
          <Grid item sm={6}>
            <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ fontFamily: "Lobster" }}
                >
                  Sign In
                </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                      id="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <div
                      style={{
                        color: "red",
                        paddingTop: 10,
                        fontFamily: "Helvetica",
                        fontSize: 12,
                        textAlign: "center"
                      }}
                    >
                      {this.state.errors}
                    </div>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      id="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      autoComplete="current-password"
                    />
                    {this.state.password.length < 6 &&
                    this.state.password.length > 0 ? (
                      <div
                        style={{
                          color: "red",
                          paddingTop: 10,
                          fontFamily: "Helvetica",
                          fontSize: 12,
                          textAlign: "center"
                        }}
                      >
                        Password Must Be at Least 6 Characters
                      </div>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <Grid container spacing={8}>
                    <Grid item sm={12} md={6}>
                      <Button
                        onClick={this.createAccount}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Create Account
                      </Button>
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <Button
                        onClick={this.signIn}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </main>
          </Grid>
        </Grid>
        {/* Calorie & phitlosophy */}
        <Grid container className={classes.featureContainer} spacing={32}>
          <Grid item sm={6}>
            <Typography variant="h3" style={{ textAlign: "center" }}>
              The <span style={{ fontFamily: "lobster" }}>Phit</span> Philosophy
            </Typography>
            <Typography variant="body1" style={{ padding: 20 }}>
              Some text about how all individuals are different. As such,
              nutrition & exercise needs differ from person to person. Designied
              to be intuitive first, while maintaining a high level of
              customization to track the perfect amount of data for you.{" "}
            </Typography>
          </Grid>
          <Grid item sm={6} className={classes.calorie}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              Take the frustration out of calorie counting
            </Typography>
            <img
              src="https://via.placeholder.com/400x250"
              style={{ padding: 20 }}
            />
            <div className={classes.btnContainer}>
              <div
                className={classes.exampleBtn}
                style={{ backgroundColor: "#81C0AD" }}
              />
              <div
                className={classes.exampleBtn}
                style={{ backgroundColor: "#6EBEB9" }}
              />
              <div
                className={classes.exampleBtn}
                style={{ backgroundColor: "#D3AE75" }}
              />
              <div
                className={classes.exampleBtn}
                style={{ backgroundColor: "#BA7D8F" }}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container className={classes.demo}>
          <Grid item sm={12}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              Weekend warroir or full-time phitness guru
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
