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
import { Grid } from "@material-ui/core";
import landingBG from "../images/landingBG.jpg";
import { css, cx } from "emotion";
import FontAwesome from "react-fontawesome";
import LandingChart from "../components/LandingChart";
import Showcase from "../components/Showcase";

const emotionClasses = {
  exampleBtn: {
    width: 128,
    height: 128,
    borderRadius: "50%",
    boxShadow: "2px 4px 7px #00000042",
    transition: "all 0.1s",
    position: "relative",
    ":hover": {
      cursor: "pointer",
      boxShadow: "3px 6px 10px #00000042",
      transform: "scale(1.1)"
    }
  },
  exampleIcon: {
    textShadow: "rgba(0, 0, 0, 0.36) 1px 1px 2px",
    pointerEvents: "none",
    position: "absolute",
    color: "#252525",
    top: 32,
    right: 40,
    fontSize: "4rem"
  },
  pieIcon: {
    textShadow: "rgba(0, 0, 0, 0.36) 1px 1px 2px",
    pointerEvents: "none",
    position: "absolute",
    color: "#252525",
    top: 32,
    right: 29,
    fontSize: "4rem"
  }
};

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
  fitness: {},
  exampleBtn: {
    width: 128,
    height: 128,
    borderRadius: "50%",
    boxShadow: "2px 4px 7px #00000042",
    ":hover": {
      cursor: "pointer"
    }
  },
  exampleText: {
    marginBottom: -12,
    textAlign: "center"
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  footer: {
    position: "fixed !important",
    bottom: 0,
    zIndex: -1000,
    height: 350,
    width: "100%",
    color: "white",
    background: "red"
  }
});

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    errors: null,
    isPie: false,
    exampleData: {
      labels: [
        ["Sun."],
        ["Mon."],
        ["Tues."],
        ["Wed."],
        ["Thur."],
        ["Fri."],
        ["Sat."]
      ],
      datasets: [
        {
          label: "Calories",
          backgroundColor: "#f06292",
          borderColor: "#f06292",
          borderWidth: 2,
          hoverBackgroundColor: "#f06292",
          data: [0, 0, 1653, 1458, 2019, 678]
        }
      ]
    },
    options: {
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: "white"
            },
            display: true,
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: "white"
            },
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
      },
      legend: {
        labels: {
          fontColor: "white"
        },
        position: "bottom"
      }
    }
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleExampleClick = event => {
    let newData = {};
    let newOptions = {};
    let isPie = false;

    switch (event.target.id) {
      case "ex1":
        newData = {
          labels: [
            ["Sun."],
            ["Mon."],
            ["Tues."],
            ["Wed."],
            ["Thur."],
            ["Fri."],
            ["Sat."]
          ],
          datasets: [
            {
              label: "Calories",
              backgroundColor: "#f06292",
              borderColor: "#f06292",
              borderWidth: 2,
              hoverBackgroundColor: "#f06292",
              data: [0, 0, 1653, 1458, 2019, 678]
            }
          ]
        };
        newOptions = {
          maintainAspectRatio: true,
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "white"
                },
                display: true,
                gridLines: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: "white"
                },
                type: "linear",
                display: true,
                position: "left",
                id: "y-axis-1",
                gridLines: {
                  display: false
                },
                labels: {
                  show: true
                }
              },
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: "white"
                },
                type: "linear",
                display: true,
                position: "left",
                id: "y-axis-1",
                gridLines: {
                  display: false
                },
                labels: {
                  show: false
                }
              }
            ]
          },
          legend: {
            labels: {
              fontColor: "white"
            },
            position: "bottom"
          }
        };
        break;
      case "ex2":
        newData = {
          labels: [
            ["Sun."],
            ["Mon."],
            ["Tues."],
            ["Wed."],
            ["Thur."],
            ["Fri."],
            ["Sat."]
          ],
          datasets: [
            {
              label: "Time (minutes)",
              type: "line",
              backgroundColor: "#74d6c8",
              borderColor: "#74d6c8",
              borderWidth: 3,
              hoverBackgroundColor: "#74d6c8",
              hoverBorderColor: "#74d6c8",
              data: [null, null, 19, 26, 39, 24],
              yAxisID: "y-axis-2",
              fontColor: "white"
            },
            {
              label: "Distance (miles)",
              type: "bar",
              backgroundColor: "#f06292",
              borderColor: "#f06292",
              borderWidth: 1,
              hoverBackgroundColor: "#f06292",
              hoverBorderColor: "#f06292",
              data: [null, null, 3, 4, 6, 4],
              yAxisID: "y-axis-1",
              fontColor: "white"
            }
          ]
        };
        newOptions = {
          responsive: true,
          tooltips: {
            mode: "label"
          },
          elements: {
            line: {
              fill: false
            }
          },
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: false
                },
                ticks: {
                  fontColor: "white"
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: "white"
                },
                type: "linear",
                display: true,
                position: "left",
                id: "y-axis-1",
                gridLines: {
                  display: false
                },
                labels: {
                  show: true
                }
              },
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: "white"
                },
                type: "linear",
                display: true,
                position: "right",
                id: "y-axis-2",
                gridLines: {
                  display: false
                },
                labels: {
                  show: true
                }
              }
            ]
          },
          legend: {
            labels: {
              fontColor: "white"
            },
            position: "bottom"
          }
        };
        break;
      case "ex3":
        isPie = true;
        newData = {
          labels: ["Fat", "Carbs", "Protein"],
          datasets: [
            {
              data: [120, 89, 142],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }
          ]
        };
        newOptions = {
          maintainAspectRatio: true,
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "white"
                },
                display: false,
                gridLines: {
                  display: false
                }
              }
            ]
          },
          legend: {
            labels: {
              fontColor: "white"
            },
            position: "bottom"
          }
        };
        break;
    }

    this.setState({ exampleData: newData, options: newOptions, isPie });
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
      <Grid
        container
        className={classes.background}
        justify="center"
        style={{ zIndex: 9001 }}
      >
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
            <Typography
              variant="h3"
              style={{ textAlign: "center", marginTop: "calc(65% - 170px)" }}
            >
              The <span style={{ fontFamily: "lobster" }}>Phit</span> Philosophy
            </Typography>
            <Typography variant="body1" style={{ padding: 20 }}>
              Designied to be{" "}
              <span style={{ color: "#f06292" }}>intuitive</span>, while
              maintaining a high level of{" "}
              <span style={{ color: "#f06292" }}>customization</span>, Phit
              differentiates itself from similar applications by streamlining
              the aspects of nutrition and fitness tracking that matter most.
            </Typography>
          </Grid>
          <Grid item sm={6} className={classes.calorie}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              Tracking your progress made simple
            </Typography>
            <Paper style={{ padding: "20px", margin: "30px 0" }}>
              <LandingChart
                data={this.state.exampleData}
                options={this.state.options}
                isPie={this.state.isPie}
              />
            </Paper>
            <div className={classes.btnContainer}>
              <div>
                <div
                  className={css(emotionClasses.exampleBtn)}
                  style={{ backgroundColor: "#81C0AD" }}
                  id="ex1"
                  onClick={this.handleExampleClick}
                >
                  <FontAwesome
                    name="utensils"
                    size="2x"
                    style={emotionClasses.exampleIcon}
                  />
                </div>
                <Typography variant="overline" className={classes.exampleText}>
                  Example 1
                </Typography>
                <Typography variant="caption" style={{ textAlign: "center" }}>
                  Weekly Calorie Tracking
                </Typography>
              </div>
              <div>
                <div
                  className={css(emotionClasses.exampleBtn)}
                  style={{ backgroundColor: "#BA7D8F" }}
                  id="ex2"
                  onClick={this.handleExampleClick}
                >
                  <FontAwesome
                    name="running"
                    size="2x"
                    style={emotionClasses.exampleIcon}
                  />
                </div>
                <Typography variant="overline" className={classes.exampleText}>
                  Example 2
                </Typography>
                <Typography variant="caption" style={{ textAlign: "center" }}>
                  Weekly Cardio Progress
                </Typography>
              </div>
              <div>
                <div
                  className={css(emotionClasses.exampleBtn)}
                  style={{ backgroundColor: "#D3AE75" }}
                  id="ex3"
                  onClick={this.handleExampleClick}
                >
                  <FontAwesome
                    name="chart-pie"
                    size="2x"
                    style={emotionClasses.pieIcon}
                  />
                </div>
                <Typography variant="overline" className={classes.exampleText}>
                  Example 3
                </Typography>
                <Typography variant="caption" style={{ textAlign: "center" }}>
                  Daily Macros
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
        {/* Fitness Section */}
        <div
          style={{
            background: "#292929",
            width: "-webkit-fill-available",
            display: "flex",
            justifyContent: " center",
            padding: "50px 0",
            marginTop: 50
          }}
        >
          <Grid
            style={{ marginTop: 100, marginBottom: 350 }}
            container
            className={classes.demo}
            style={{ zIndex: 100 }}
          >
            <Grid item sm={12}>
              <Typography
                variant="h2"
                style={{
                  textAlign: "center",
                  fontFamily: "lobster"
                }}
              >
                <span
                  style={{
                    color: "#74d6c8",
                    textShadow: "1px 3px 4px hsla(0, 0%, 0%, 0.49)"
                  }}
                >
                  Easy to use
                </span>{" "}
                design & features
              </Typography>

              <Showcase
                background="#ba7d8f"
                header="Create and save workouts"
                body="Both regular workouts and that one day you felt like changing it up can easily be added. See your progress report updated instantly."
                workout
              />
              <Showcase
                background="#81c0ad"
                header="Create and save meals"
                body="All your favorite meals can be loaded up and saved with just a couple of clicks. Want to change the serving size or add some food? No problem!"
                left
              />
              <Showcase
                background="#d3ae75"
                header="Customize your dashboard"
                body="Your look, your layout. Change your panels, theme, and sizing to whatever fits your current goals. Whenever you want to change it, click a few buttons and you're done."
              />
            </Grid>
          </Grid>
        </div>
        <div style={{ padding: 50 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Phit Boyz
          </Typography>
        </div>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
