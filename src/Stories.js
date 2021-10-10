import { useDispatch, useSelector } from "react-redux";
import { removeStory, selectSearch } from "./store/searchSlice";
import "./Stories.css";

function Stories() {
  const dispatch = useDispatch();
  const state = useSelector(selectSearch);

  if (state.isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <div className="stories">
      {state.data.map(
        ({ objectID, title, num_comments, url, points, author }) => (
          <div key={objectID} className="story">
            <h4 className="story__title">{title}</h4>
            <p className="story__info">
              {points} points by <span>{author} | </span> {num_comments} comments
            </p>
            <div>
              <a
                href={url}
                className="story__readLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                read more
              </a>
              <button className="story__removeBtn" onClick={() => dispatch(removeStory(objectID))}>remove</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Stories;
