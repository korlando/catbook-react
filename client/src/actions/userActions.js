export const userActionTypes = {
  updateUserId: 'UPDATE_USER_ID',
  updateUser: 'UPDATE_USER',
};

export const updateUserId = (userId) => {
  return {
    type: userActionTypes.updateUserId,
    userId,
  };
};

export const updateUser = (user) => {
  return {
    type: userActionTypes.updateUser,
    user,
  };
};
