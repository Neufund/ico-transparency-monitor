export default {
  jQuery: {
    ajax: (options, callback) => ({
      success: result => callback(result),
      error: status => callback(status),
    }),
  },
};
