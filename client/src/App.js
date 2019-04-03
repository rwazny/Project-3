import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./pages/landing";
import Dashboard from "./pages/Dashboard";

import Paper from "@material-ui/core/Paper";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DnsIcon from "@material-ui/icons/Dns";
class App extends Component {
  state = {
    value: 1
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount = () => {};

  render() {
    const { value } = this.state;

    return (
      <Router>
        <div className="App">
          <Route
            path="/"
            render={({ location }) => (
              <Fragment>
                <AppBar position="static">
                  <Tabs value={value} onChange={this.handleChange} centered>
                    <Tab
                      icon={<HomeIcon />}
                      label="Home"
                      component={Link}
                      to="/"
                    />
                    <Tab
                      icon={<DnsIcon />}
                      label="Dashboard"
                      component={Link}
                      to="/dashboard"
                    />
                  </Tabs>
                </AppBar>
                <Switch>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/" component={Landing} />
                </Switch>
              </Fragment>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
