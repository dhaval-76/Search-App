import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import {
  fetchStories,
  handlePage,
  handleSearch,
  selectSearch,
} from "./store/searchSlice";

function Header() {
  const dispatch = useDispatch();
  const state = useSelector(selectSearch);

  useEffect(() => {
    dispatch(fetchStories(state.query, state.page));
  }, [state.query, state.page, dispatch]);

  return (
    <div className="header">
      <form className="header__search">
        <h2>Search Hacker News</h2>
        <input
          type="text"
          className="header_searchInput"
          value={state.query}
          onChange={(e) => dispatch(handleSearch(e.target.value))}
        />
      </form>
      <div className="header__btns">
        <button
          disabled={state.isLoading}
          onClick={() => dispatch(handlePage("dec"))}
        >
          Prev
        </button>
        <p>
          {state.page} of {state.totalPages}
        </p>
        <button
          disabled={state.isLoading}
          onClick={() => dispatch(handlePage("inc"))}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Header;
