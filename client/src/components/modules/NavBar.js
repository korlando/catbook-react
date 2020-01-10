import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { connect } from 'react-redux';
import * as userActions from "../../actions/userActions";

import { post } from "../../utilities";
import { socket } from "../../client-socket.js";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.props.updateUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.props.updateUserId(undefined);
    post("/api/logout");
  };

  render() {
    const { userId } = this.props;
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">Catbook</div>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          {userId && (
            <Link to={`/profile/${userId}`} className="NavBar-link">
              Profile
            </Link>
          )}
          <Link to="/chat/" className="NavBar-link">
            Chat
          </Link>
          {userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserId: (userId) => dispatch(userActions.updateUserId(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
