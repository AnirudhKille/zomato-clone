import React from "react";
import QuickSearchItmes from "./QuickSearchItems";

class QuickSearch extends React.Component {
  render() {
    const { quicksearchData } = this.props;

    return (
      <>
        <div className="bottamSection container">
          <h2 className="qs-heading">Quick Searches</h2>
          <h4 className="qs-subHeading">
            Discover the resturants by type of meal
          </h4>
          <div className="container-fluid">
            <div className="row">
              {quicksearchData.map((item) => {
                return <QuickSearchItmes quickseachitemData={item} />;
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default QuickSearch;
