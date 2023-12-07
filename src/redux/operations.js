import axios from 'axios';
import {
  fetchingInProgress,
  fetchingError,
  fetchingSuccess,
} from './contactsSlice';

axios.defaults.baseURL = 'https://656fba356529ec1c623828f2.mockapi.io';

export const fetchContacts = () => async dispatch => {
  try {
    dispatch(fetchingInProgress());
    const response = await axios.get('/contacts');
    dispatch(fetchingSuccess(response.data));
  } catch (e) {
    dispatch(fetchingError(e.message));
  }
};
