export const userActionTypes = {
  updateUserId: 'UPDATE_USER_ID',
};

export const updateUserId = (userId) => ({
  type: userActionTypes.updateUserId,
  userId,
});
