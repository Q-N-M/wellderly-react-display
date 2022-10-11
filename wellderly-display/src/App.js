import FetchAPI from "./components/FetchAPI";

function App() {

  const wellderlyAPI = "https://backend-deco.herokuapp.com/api/v1/user-emoji/";

  return (
    <FetchAPI url={wellderlyAPI} dummy="true"></FetchAPI>
  );
}

export default App;
