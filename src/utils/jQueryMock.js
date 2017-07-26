/**
 * Created by mostafa on 7/26/17.
 */
export default {
  jQuery: {
    ajax: (options , callback) => {

      return {
        success: result => callback(result),
        error: status => callback(status)
      }
    }
  }
};
