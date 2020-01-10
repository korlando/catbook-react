export const socketActionTypes = {
  socketDisconnected: true,
};

export const updateSocketDisconnected = (socketDisconnected) => {
  return {
    type: socketActionTypes.socketDisconnected,
    socketDisconnected,
  };
};
