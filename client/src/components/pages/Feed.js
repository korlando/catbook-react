import React, { Component } from "react";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPostInput.js";
import { connect } from 'react-redux';

import * as storyActions from "../../actions/storyActions"

import { get } from "../../utilities";

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "News Feed";
    get("/api/stories").then((storyObjs) => {
      storyObjs.reverse();
      this.props.initializeStories(storyObjs);
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewStory = (storyObj) => {
    this.props.addNewStory(storyObj);
  };

  render() {
    const { stories } = this.props;
    let storiesList = null;
    const hasStories = stories.length !== 0;
    if (hasStories) {
      storiesList = stories.map((storyObj) => (
        <Card
          key={`Card_${storyObj._id}`}
          _id={storyObj._id}
          creator_name={storyObj.creator_name}
          creator_id={storyObj.creator_id}
          content={storyObj.content}
        />
      ));
    } else {
      storiesList = <div>No stories!</div>;
    }
    return (
      <>
        {this.props.userId && <NewStory addNewStory={this.addNewStory} />}
        {storiesList}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    stories: state.story.stories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewStory: (story) => dispatch(storyActions.addNewStory(story)),
    initializeStories: (stories) => dispatch(storyActions.initializeStories(stories)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
