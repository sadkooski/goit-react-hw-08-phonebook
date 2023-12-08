import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/operations';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleBrowser = evt => {
    const filterValue = evt.target.value.toLowerCase();
    dispatch(setFilter(filterValue));
  };

  return (
    <div>
      <span>Find contacts by name</span>
      <input
        onChange={handleBrowser}
        type="text"
        name="browser"
        title="Find contacts by name"
        required
      ></input>
    </div>
  );
};
