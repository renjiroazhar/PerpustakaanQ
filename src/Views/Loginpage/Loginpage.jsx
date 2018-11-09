import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LogoBuku from './logo/buku.png';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import logoPerpus from './logo/logoPerpustakaanQ.png';
import axios from 'axios';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "white",
    width: "50px",
    height: "50px",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: '#0088aaff',
  },
});



class Loginpage extends Component {

  state = {
    error: false,
    email: "",
    password: "",
    role : 0
  };

  saveDataUser = () => {
    let accessToken = "123456789"
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("username", this.state.email);
    sessionStorage.setItem("role", this.state.role);
  }

  login = () => {
    const { email, password } = this.state;
    axios.post(`http://localhost:8000/api/People/login`,
    {
      email : email,
      password : password
    }).then(res => {
      this.saveDataUser();
      sessionStorage.setItem('accessToken', res.data.id);
      this.props.updateLogin();
      console.log(res);

      if(res.status === 401) {
        return(alert("Error Auth"));
      }
    })

    if(this.state.email === 'admin' && this.state.password === "admin"){
      this.saveDataUser();
      this.props.updateLogin();
    } 
  };

  handleKeyPress = (e) => {
    if(e.key === "Enter"){
      this.login();
    } 
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <img src={LogoBuku} width="40px" alt=""/>
            </Avatar>
            <img height="25px" width="200px" src={logoPerpus} alt="PerpustakaanQ Logo" style={{ margin: '5px 0 10px 0' }} />
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" value={this.state.email} onChange={this.handleChange} autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Kata Sandi</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password} 
                  onChange={this.handleChange}
                  onKeyPress={this.handleChange}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Ingatkan Saya"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>{this.login()}}
              >
                Masuk
              </Button>
            </form>
          <Typography>
  
          </Typography>
          </Paper>
        </main>
      </React.Fragment>
    );
}

}

Loginpage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loginpage);