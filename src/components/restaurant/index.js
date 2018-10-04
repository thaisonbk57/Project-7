import React from 'react';
import StaticInfo from './staticInfo';
import DynamicInfo from './dynamicInfo/index';
import { API_KEY } from '../../store/actions';
import { updateMapCenter } from './../../store/actions';
import { connect } from 'react-redux';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDynamicInfo: false
    };
  }

  toggleDynamicInfoHandler = e => {
    this.props.updateMapCenter(
      this.props.info.geometry.location,
      this.props.info.place_id
    );
    this.setState((prevState, props) => {
      return {
        showDynamicInfo: !prevState.showDynamicInfo
      };
    });
  };

  render() {
    let dynamicInfo = null;

    if (this.state.showDynamicInfo) {
      dynamicInfo = (
        <DynamicInfo
          reviews={this.props.reviews}
          place_id={this.props.info.place_id}
          photo={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${
            this.props.info.geometry.location.lat
          },${
            this.props.info.geometry.location.lng
          }&key=${API_KEY}&fov=90&heading=235&pitch=10`}
        />
      );
    }

    return (
      <div className="restaurant">
        <StaticInfo
          restaurantAddress={this.props.info.formatted_address}
          restaurantName={this.props.info.name}
          restaurantRating={this.props.info.rating}
          toggleDynamicInfo={this.toggleDynamicInfoHandler}
        />
        {dynamicInfo}
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    updateMapCenter: (coords, place_id) => {
      dispatch(updateMapCenter(coords, place_id));
    }
  };
};

export default connect(
  null,
  mapDispatch
)(Restaurant);
