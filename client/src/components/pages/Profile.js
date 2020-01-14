import React, { Component } from "react";
import CatHappiness from "../modules/CatHappiness.js";
import { get } from "../../utilities";
import { connect } from "react-redux";

import * as userActions from "../../actions/userActions";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catHappiness: 0,
    };
  }

  getUserData = () => {
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.props.updateUser(user));
  };

  componentDidMount() {
    document.title = "Profile Page";
    this.getUserData();
  }

  componentDidUpdate(oldProps) {
    // this is called whenever the props change (call API again if the userId changes)
    if (oldProps.userId !== this.props.userId) {
      this.getUserData();
    }
  }

  incrementCatHappiness = () => {
    this.setState({
      catHappiness: this.state.catHappiness + 1,
    });
  };

  render() {
    const { user } = this.props;
    if (!user) {
      return <div> Loading! </div>;
    }
    return (
      <>
        <div
          className="Profile-avatarContainer"
          onClick={() => {
            this.incrementCatHappiness();
          }}
        >
          <div className="Profile-avatar" />
        </div>
        <h1 className="Profile-name u-textCenter">{user.name}</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div id="profile-description">
              Extra Challenge: Modify catbook to show a personalized description here!
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">Cat Happiness</h4>
            <CatHappiness catHappiness={this.state.catHappiness} />
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
            <div id="favorite-cat">corgi</div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    userId: state.user.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(userActions.updateUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
