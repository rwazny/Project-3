import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import auth from '../firebase';
import API from '../utils/API';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  // root: {
  //   flexGrow: 1,
  // },
  main: {
    // width: 'auto',
    // display: 'block', // Fix IE 11 issue.
    // marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      // width: '30vw',
      // marginLeft: '5vw'
      // marginRight: '5vw'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    width: '40vw',
    marginLeft: '5vw'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const styles2= { 
  fontFamily: 'Helvetica', 
  fontSize:"1.2em",  
  width:"30vw", 
  marginTop: "5%",
  textAlign: "center",
  padding: "2% 0%"
}

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
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
        API.findUser({ email: this.state.email }).then(
          res => (localStorage.userId = res.data._id)
        );
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
      <div>
        <Grid container spacing={8} style={{ display: 'flex', justifyContent: "space-evenly" }}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>

          <main className={classes.main}>
            <Grid item sm={12} />

            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ fontFamily: 'Lobster' }}
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
                      color: 'red',
                      paddingTop: 10,
                      fontFamily: 'Helvetica',
                      fontSize: 12,
                      textAlign: 'center'
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
                        color: 'red',
                        paddingTop: 10,
                        fontFamily: 'Helvetica',
                        fontSize: 12,
                        textAlign: 'center'
                      }}
                    >
                      Password Must Be at Least 6 Characters
                    </div>
                  ) : (
                    ''
                  )}
                </FormControl>
                {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me" */}
                {/* /> */}
                <Grid container spacing={8}>
                  <Grid item sm={12} md={6}>
                    <Button
                      onClick={this.createAccount}
                      type="submit"
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
          {/* FOOTER */}


          <Grid container  style={{ display: 'flex', flexDirection: "row", justifyContent: "space-evenly" }}>
          
              <Paper   style={styles2}>
                <Typography style= {{fontSize: "1.1em"}}>
                  Quisque a finibus velit, non volutpat ipsum. Proin quis urna
                  nisl. Aenean pulvinar nunc quis cursus viverra. Ut semper arcu
                  urna.
                  </Typography> 
              </Paper>

              <Paper   style={styles2}>
              <Typography style= {{fontSize: "1.1em"}}>
                  Quisque a finibus velit, non volutpat ipsum. Proin quis urna
                  nisl. Aenean pulvinar nunc quis cursus viverra. Ut semper arcu
                  urna.
                  </Typography> 
              </Paper>

              <Paper   style={styles2}>
              <Typography style= {{fontSize: "1.1em"}}>
                  Quisque a finibus velit, non volutpat ipsum. Proin quis urna
                  nisl. Aenean pulvinar nunc quis cursus viverra. Ut semper arcu
                  urna.
                  </Typography> 
              </Paper>
           
          
              
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
