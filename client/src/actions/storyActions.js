export const storyActionTypes = {
  addNewStory: 'ADD_NEW_STORY',
  initializeStories: 'INITIALIZE_STORIES',
};

export const addNewStory = (story) => {
  return {
    type: storyActionTypes.addNewStory,
    story,
  };
};

export const initializeStories = (stories) => {
  return {
    type: storyActionTypes.initializeStories,
    stories,
  };
};
