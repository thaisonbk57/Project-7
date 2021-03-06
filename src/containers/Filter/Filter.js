import React, { Component } from "react";
import { connect } from "react-redux";
import { updateFilterObject, filterRestaurants } from "../../store/actions";
import FilterStar from "./StarInput/StarInput";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star: {
        from: 1,
        to: 5
      }
    };
  }

  onChangeHandler = e => {
    let target = e.target;
    let stars = target.value;
    this.setState((prevState, props) => {
      return {
        star: {
          ...prevState.star,
          from: stars
        }
      };
    });
  };

  componentDidUpdate() {
    this.props.updateFilter(this.state.star);
    this.props.filterRestaurants(this.state.star, this.props.mapBounds);
  }

  render() {
    return (
      <div className="h-100">
        <div className="text-center p-1">
          <FilterStar onchange={this.onChangeHandler} />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    mapBounds: state.mapBounds
  };
};

const mapDispatch = dispatch => {
  return {
    updateFilter: filterObj => {
      dispatch(updateFilterObject(filterObj));
    },
    filterRestaurants: (filterObj, bounds) => {
      dispatch(filterRestaurants(filterObj, bounds));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Filter);
