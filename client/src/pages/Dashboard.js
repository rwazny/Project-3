import React, { Component } from "react";
import auth from "../firebase.js";
import Meal from "./Meal";

//Panel imports
import FitnessPanel from "../components/panels/FitnessPanel";
import NutritionPanel from "../components/panels/NutritionPanel";

// Material UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Settings from "../pages/Settings";

class Dashboard extends Component {
  state = { xlFit: this.props.xlFit };

  componentDidMount = () => {
    setTimeout(
      () =>
        auth.onAuthStateChanged(firebaseUser => {
          this.setState({
            user: firebaseUser
          });
        }),
      500
    );
  };

  toggleSettings = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />

        <AppBar position="static">
          <ToolBar
            style={{
              justifyContent: "space-between"
            }}
          >
            <Typography
              variant="h2"
              color="inherit"
              style={{ fontFamily: "Lobster" }}
            >
              Phit
            </Typography>
            <div>
              {this.state.user ? (
                <Tabs value={0} onChange={this.handleChange} centered>
                  <Tab
                    icon={<SettingsIcon />}
                    label={this.state.user.email}
                    onClick={this.toggleSettings("right", true)}
                  />
                </Tabs>
              ) : null}
            </div>
          </ToolBar>
        </AppBar>

        {this.state.user ? (
          <Grid container spacing={0} justify="center">
            {this.props.topPanel === "fitness" ? (
              <React.Fragment>
                <FitnessPanel
                  xlFit={this.props.xlFit}
                  theme={this.props.theme}
                />
                <NutritionPanel
                  xlNut={this.props.xlNut}
                  theme={this.props.theme}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NutritionPanel
                  xlNut={this.props.xlNut}
                  theme={this.props.theme}
                />
                <FitnessPanel
                  xlFit={this.props.xlFit}
                  theme={this.props.theme}
                />
              </React.Fragment>
            )}
          </Grid>
        ) : (
          "No user found"
        )}
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleSettings("right", false)}
        >
          <div
            tabIndex={0}
            role="button"
            // onClick={this.toggleSettings("right", false)}
            // onKeyDown={this.toggleSettings("right", false)}
          >
            <div style={{ width: 350 }}>
              <Settings
                currentUser={
                  this.state.user ? this.state.user.email : "no user"
                }
                signOut={this.props.signOut}
                handleSettingsChange={this.props.handleSettingsChange}
                topPanel={this.props.topPanel}
                orangeTheme={this.props.orangeTheme}
                pinkTheme={this.props.pinkTheme}
                greyTheme={this.props.greyTheme}
                cyanTheme={this.props.cyanTheme}
                switchUp={this.props.switchUp}
                theme={this.props.theme}
                xlNut={this.props.xlNut}
                xlFit={this.props.xlFit}
              />
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default Dashboard;
