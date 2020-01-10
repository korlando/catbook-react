import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";
import { connect } from "react-redux";
import Feed from "./pages/Feed.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import Chatbook from "./pages/Chatbook.js";

import { get } from "../utilities";

import * as userActions from "../actions/userActions";

// to use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.props.updateUserId(user._id);
      }
    });
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      // <> is like a <div>, but won't show
      // up in the DOM tree
      <>
        <NavBar />
        <div className="App-container">
          <Router>
            <Feed path="/" />
            <Profile path="/profile/:userId" />
            <Chatbook path="/chat/" />
            <NotFound default />
          </Router>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserId: (userId) => dispatch(userActions.updateUserId(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
