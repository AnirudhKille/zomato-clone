import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Wallpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      inputText: "",
      suggestions: [],
    };
  }

  showSuggestion = () => {
    const { suggestions, inputText } = this.state;

    if (suggestions.length === 0 && inputText === undefined) {
      return null;
    }
    if (suggestions.length > 0 && inputText === "") {
      return null;
    }
    if (suggestions.length === 0 && inputText) {
      return (
        <ul>
          <li>No Search Result Found</li>
        </ul>
      );
    }
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li
            key={index}
            onClick={() => this.selectingRestaurant(item)}
          >{`${item.name} - ${item.locality},${item.city}`}</li>
        ))}
      </ul>
    );
  };

  selectingRestaurant = (resObj) => {
    this.props.history.push(`/details?restaurant=${resObj._id}`);
  };

  handleLocation = (event) => {
    const locationId = event.target.value;
    sessionStorage.setItem(`locationId`,locationId);
    axios({
      method: "GET",
      url: `http://localhost:8900/getRestaurantsByLocation/${locationId}`,
      // url: `http://localhost:8900/getAllRestaurants`,
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        this.setState({ restaurants: response.data.restaurants });
      })
      .catch((err) => console.log(err));
  };

  handleSeach = (event) => {
    let inputText = event.target.value;

    const { restaurants } = this.state;
    const suggestions = restaurants.filter((item) =>
      item.name.toLowerCase().includes(inputText.toLowerCase())
    );
    this.setState({ suggestions, inputText });
  };

  render() {
    const { locationsData } = this.props;

    return (
      <>
        <img src="./Assets/pxfuel.jpg" className="homeImg" alt="background" />

        <div className="topSection container">
          <div className="centerLogo">e!</div>
          <div className="headerText">
            Find the best resturants, cafes, and bars
          </div>
          <div className="searchOption">
            <span>
              <select className="locationBox" onChange={this.handleLocation}>
                <option value="0">--Select City--</option>
                {locationsData.map((item) => {
                  return (
                    <option
                      value={item.location_id}
                      key={item.location_id}
                    >{`${item.name}, ${item.city}`}</option>
                  );
                })}
              </select>
            </span>

            <span className="searchBox" id="notebook">
              <i className="bi bi-search seachIcon"></i>
              <input
                type="text"
                placeholder="search for a resturants"
                className="searchInput"
                id="query"
                onChange={this.handleSeach}
              />
            </span>
            {this.showSuggestion()}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Wallpaper);
