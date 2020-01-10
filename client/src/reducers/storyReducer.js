import { storyActionTypes } from "../actions/storyActions";

const initialState = {
  stories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case storyActionTypes.addNewStory:
      return Object.assign({}, state, {
        stories: [action.story].concat(state.stories),
      });
    case storyActionTypes.initializeStories:
      return Object.assign({}, state, {
        stories: action.stories,
      });
    default:
      return state;
  }
};
