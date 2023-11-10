import React from "react";
import { withRouter } from "react-router-dom";

class QuickSearchItems extends React.Component {
  handleNavigate = (mealTypeId) => {
    const locationId = sessionStorage.getItem(`locationId`);
    if (locationId) {
      this.props.history.push(
        `/filter?mealtype=${mealTypeId}&location=${locationId}`
      );
    } else {
      this.props.history.push(`/filter?mealType=${mealTypeId}`);
    }
  };

  render() {
    const { name, content, image, meal_type } = this.props.quickseachitemData;

    return (
      <>
        {/* <div classNameName="bottamSection container">
        <div className="qs-boxes-container col"> */}
        <div className="qsBox col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 col-12 col container-fluid">
          <div
            className="qsBoxContents "
            onClick={() => this.handleNavigate(meal_type)}
          >
            <img src={`./${image}`} alt="breakfast" className="qsImage" />
            <h4 className="qsItemHeading">{name}</h4>
            <p className="qsItemDescription">{content}</p>
          </div>
        </div>
        {/* </div>
      </div> */}
      </>
    );
  }
}
export default withRouter(QuickSearchItems);
