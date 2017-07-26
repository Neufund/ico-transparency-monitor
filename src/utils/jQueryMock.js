/**
 * Created by mostafa on 7/26/17.
 */
export default {
  jQuery: {
    ajax: (options, callback) => ({
      success: result => callback(result),
      error: status => callback(status),
    }),
  },
};
