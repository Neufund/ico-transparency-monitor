const notifications = (state = 0, action) => {
  switch (action.type) {
    case 'INCREASE_COUNTER':
      return state + 1;
    case 'RESET_COUNTER':
      return 0;
    default:
      return state
  }
};

export default notifications;
