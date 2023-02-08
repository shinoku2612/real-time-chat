import { showLoading, hideLoading } from '../store/ui-slice';

const withLoading = (fn) => {
  return async (dispatch, ...args) => {
    try {
      dispatch(showLoading());
      return await fn(dispatch, ...args);
    } catch (error) {
      throw new Error(error);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export default withLoading();
