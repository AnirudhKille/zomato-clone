import React from "react";
import axios from "axios";

import Wallpaper from "./Wallpaper";

import QuickSearch from "./QuickSearch";
import "../Style/home.css";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      mealTypes: [],
    };
  }
  componentDidMount() {
    sessionStorage.clear();
    axios({
      method: "GET",
      url: "http://localhost:8900/getAllLocation",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        this.setState({ locations: response.data.locations });
      })
      .catch((err) => console.log(err));

    //get Meal types
    axios({
      method: "GET",
      url: "http://localhost:8900/getAllMealTypes",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        this.setState({ mealTypes: response.data.mealTypes });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { locations } = this.state;
    const { mealTypes } = this.state;
    return (
      <>
        <Wallpaper locationsData={locations} />
        <QuickSearch quicksearchData={mealTypes} />
      </>
    );
  }
}
export default Home;
