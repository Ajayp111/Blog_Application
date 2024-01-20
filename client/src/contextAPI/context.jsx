/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const Context = createContext();

const initialState = {
  posts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
  }
};

const Provider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:5000/api/posts");
      const data = await response.json();
      if (data.data.length) {
        dispatch({
          type: "GET_POSTS",
          payload: data.data,
        });
      }
    };
    fetchPosts();
  }, [dispatch, ignored]);
  return (
    <Context.Provider
      value={{
        loggedUser,
        setLoggedUser,
        state,
        dispatch,
        forceUpdate,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;

export const useProvider = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useProvider must be used within a Provider");
  }
  return context;
};
