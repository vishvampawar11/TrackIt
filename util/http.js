import axios from "axios";

export const fetchUsers = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return (dispatch) => {
    return response.then((data) => {
      dispatch({
        type: "FETCH_USERS",
        payload: data,
      });
    });
  };

  return response.data;
};
