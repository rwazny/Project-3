import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./pages/landing";
import Dashboard from "./pages/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import DnsIcon from "@material-ui/icons/Dns";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import cyan from "@material-ui/core/colors/cyan"
import { deepOrange, deepPurple, purple, teal, yellow } from "@material-ui/core/colors";
import blueGrey from "@material-ui/core/colors/blueGrey"


const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[300]
    },
    secondary: {
      main: blueGrey[200]
    } ,
    type: "dark"
  }
});

const pinkTheme = createMuiTheme({
  palette: {
    primary: {
      main: pink[300]
    },
    secondary: {
      main: '#74d6c8'
    },
    type: "dark"
  }
});

const cyanTheme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary:{
     main: yellow[400]
    } ,
    type: "dark"
  }
});

const greyTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#d4d4dc"},
    secondary:{
     main:"#eccc69"
    } ,
    type: "dark"
  }
});


class App extends Component {
  state = {
    value: 1,
    theme: theme
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount = () => {};


  theme = () => {
    this.setState({ theme: theme });
  };

  pinkTheme = () => {
    this.setState({ theme: pinkTheme });
  };

  cyanTheme = ()=>{
    this.setState({theme: cyanTheme})
  };

  greyTheme = ()=>{
    this.setState({theme:greyTheme})
  };

  switchUp = ()=>{
    if(this.state.theme.palette.type ==="dark"){
      this.setState({theme:{
        palette:{
          type: 'light'
        }
      }})
    }
  }

  render() {
    const { value } = this.state;
    const { pinkTheme, theme, cyanTheme, greyTheme } = this.state;
console.log(`this is the theme ${JSON.stringify(this.state.theme.palette.type)}`)
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Route
              path="/"
              render={({ location }) => (
                <Fragment>
                  <AppBar position="static">
                  <ToolBar style={{maxWidth: 960, margin: 'auto', justifyContent: 'space-around'}}>
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.pinkTheme}
                    >
                      Pink
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.theme}
                    >
                      Orange
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.cyanTheme}
                    >
                      Cyan
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.greyTheme}
                    >
                     Grey
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.switchUp}
                    >
                     Light/Dark
                    </Button>
                    </ToolBar>
                  </AppBar>
                  <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/" component={Landing} />
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
