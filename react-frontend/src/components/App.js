import React from 'react';
import LoggedInApp from './LoggedInApp';
import GoogleLogin from 'react-google-login';
import { Icon } from 'bloomer/lib/elements/Icon';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle'
import classNames from 'classnames';
import * as api from '../api';

const clientId = "1094098933377-h2er2a2nkep72q9g1jqto7n9qi20t18o.apps.googleusercontent.com";

export default class App extends React.Component {
  state = {
    loggedIn: false,
    loading: false,
    status: ""
  }

  login = (response) => {
    api.login(response.tokenId);
    this.setState({ loading: false, loggedIn: true })
  }

  requesting = () => {
    this.setState({ loading: true })
  }

  googleError = (err) => {
    console.error(err);
    this.setState({
      loading: false,
      status: "error"
    })
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <LoggedInApp />
      )
    } else {
      const classes = classNames({
        button: true,
        "is-loading": this.state.loading,
        "is-danger": this.state.status === "error"
      })
      return (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={this.login}
          onFailure={this.googleError}
          onRequest={this.requesting}
          style={{}}
          className={classes}
          isSignedIn={true}
        >
          <Icon><FontAwesomeIcon icon={faGoogle} /></Icon> <span>Login</span>
        </GoogleLogin>
      )
    }
  }
}
