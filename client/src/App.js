import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import auth from "./firebase";
import API from "./utils/API";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./pages/landing";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import HomeIcon from "@material-ui/icons/Home";
import DnsIcon from "@material-ui/icons/Dns";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import SimpleTable from "./components/Table";

import pink from "@material-ui/core/colors/pink";
import cyan from "@material-ui/core/colors/cyan";
import {
  deepOrange,
  deepPurple,
  purple,
  teal,
  yellow
} from "@material-ui/core/colors";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { Typography } from "@material-ui/core";
import { setTimeout } from "timers";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: localStorage.primaryTheme || pink[300]
    },
    secondary: {
      main: localStorage.secondaryTheme || "#74d6c8"
    },
    type: localStorage.darkToggle || "dark"
  }
});

class App extends Component {
  state = {
    value: 1,
    theme: theme,
    darkMode: true,
    topPanel: "fitness",
    xlFit: false,
    xlNut: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(firebaseUser => {
      this.setState({
        user: firebaseUser.email
      });

      //USER AUTH STUFF
      if (firebaseUser) {
        API.findUser(firebaseUser.email).then(res => {
          this.setState(
            {
              topPanel: res.data.topPanel,
              darkMode: res.data.darkMode,
              xlFit: res.data.xlFit,
              xlNut: res.data.xlNut
            },
            () => {
              switch (res.data.theme) {
                case "orange":
                  this.theme();
                  break;
                case "cyan":
                  this.cyanTheme();
                  break;
                case "pink":
                  this.pinkTheme();
                  break;
                case "grey":
                  this.greyTheme();
                  break;
              }
            }
          );
        });

        console.log("I AM THE FB USER" + JSON.stringify(firebaseUser.email));
      } else {
        console.log("not logged in");
      }
    });
  };
  signOut = event => {
    this.setState({ user: null, value: 0, darkMode: true }, () => {
      auth.signOut();
      localStorage.userId = null;
      this.pinkTheme();
    });
  };
  //THEME STUFF
  theme = () => {
    this.handleSettingsChange("theme", "orange");
    let colorType = "";

    if (this.state.darkMode) colorType = "dark";
    else colorType = "light";

    this.setState(
      {
        theme: createMuiTheme({
          palette: {
            primary: {
              main: deepOrange[300]
            },
            secondary: {
              main: blueGrey[200]
            },
            type: colorType
          }
        })
      },
      () => this.setLocalTheme()
    );
  };

  pinkTheme = () => {
    if (this.state.user) this.handleSettingsChange("theme", "pink");
    let colorType = "";

    if (this.state.darkMode) colorType = "dark";
    else colorType = "light";

    this.setState(
      {
        theme: createMuiTheme({
          palette: {
            primary: {
              main: pink[300]
            },
            secondary: {
              main: "#74d6c8"
            },
            type: colorType
          }
        })
      },
      () => this.setLocalTheme()
    );
  };

  cyanTheme = () => {
    this.handleSettingsChange("theme", "cyan");
    let colorType = "";

    if (this.state.darkMode) colorType = "dark";
    else colorType = "light";

    this.setState(
      {
        theme: createMuiTheme({
          palette: {
            primary: cyan,
            secondary: {
              main: yellow[400]
            },
            type: colorType
          }
        })
      },
      () => this.setLocalTheme()
    );
  };

  greyTheme = () => {
    this.handleSettingsChange("theme", "grey");
    let colorType = "";

    if (this.state.darkMode) colorType = "dark";
    else colorType = "light";

    this.setState(
      {
        theme: createMuiTheme({
          palette: {
            primary: {
              main: "#d4d4dc"
            },
            secondary: {
              main: "#eccc69"
            },
            type: colorType
          }
        })
      },
      () => this.setLocalTheme()
    );
  };

  switchUp = () => {
    this.handleSettingsChange("darkMode", !this.state.darkMode);
    let colorType = "";
    if (this.state.theme.palette.type === "dark") {
      colorType = "light";
    } else {
      colorType = "dark";
    }
    let newVar = Object.assign({}, this.state.theme);
    newVar.palette.type = "light";
    this.setState(
      {
        darkMode: !this.state.darkMode,
        theme: createMuiTheme({
          palette: {
            primary: {
              main: newVar.palette.primary.main
            },
            secondary: {
              main: newVar.palette.secondary.main
            },
            type: colorType
          }
        })
      },
      () => this.setLocalTheme()
    );
  };

  handleSettingsChange = (setting, value) => {
    API.updateSettings({
      setting: setting,
      settingValue: value,
      id: localStorage.userId
    });

    if (setting === "xlNut") this.setState({ xlNut: value });
    if (setting === "xlFit") this.setState({ xlFit: value });
    if (setting === "topPanel") this.setState({ topPanel: value });
  };

  setLocalTheme = () => {
    localStorage.setItem("primaryTheme", this.state.theme.palette.primary.main);
    localStorage.setItem(
      "secondaryTheme",
      this.state.theme.palette.secondary.main
    );
    localStorage.setItem("darkToggle", this.state.theme.palette.type);
  };

  toggleSettings = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { value } = this.state;
    let { pinkTheme, theme, cyanTheme, greyTheme, switchUp } = this.state;

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Route
              path="/"
              render={({ location }) => (
                <Fragment>
                  <Switch>
                    <Route
                      exact
                      path="/settings"
                      render={() => (
                        <Settings
                          handleSettingsChange={this.handleSettingsChange}
                          topPanel={this.state.topPanel}
                          orangeTheme={this.theme}
                          pinkTheme={this.pinkTheme}
                          greyTheme={this.greyTheme}
                          cyanTheme={this.cyanTheme}
                          switchUp={this.switchUp}
                          theme={this.state.theme}
                          xlNut={this.state.xlNut}
                          xlFit={this.state.xlFit}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/dashboard"
                      render={() => (
                        <Dashboard
                          xlFit={this.state.xlFit}
                          topPanel={this.state.topPanel}
                          theme={this.state.theme}
                          xlNut={this.state.xlNut}
                          signOut={this.signOut}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/"
                      render={() =>
                        this.state.user ? (
                          <Dashboard
                            xlFit={this.state.xlFit}
                            topPanel={this.state.topPanel}
                            theme={this.state.theme}
                            xlNut={this.state.xlNut}
                            signOut={this.signOut}
                            handleSettingsChange={this.handleSettingsChange}
                            topPanel={this.state.topPanel}
                            orangeTheme={this.theme}
                            pinkTheme={this.pinkTheme}
                            greyTheme={this.greyTheme}
                            cyanTheme={this.cyanTheme}
                            switchUp={this.switchUp}
                            theme={this.state.theme}
                            xlNut={this.state.xlNut}
                            xlFit={this.state.xlFit}
                          />
                        ) : (
                          <Landing />
                        )
                      }
                    />
                  </Switch>
                </Fragment>
              )}
            />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
