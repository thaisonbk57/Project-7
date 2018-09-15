import {
    SAVE_USER_POSITION,
    SAVE_RESTAURANT,
    SAVE_RESTAURANT_IDs,
    FILTER_RESTAURANTS,
    UPDATE_FILTER_OBJECT,
    OPEN_COMMENT_FORM
} from "./actions";


const initState = {
    allRestaurants: [],
    restaurantsInRange: [],
    allRestaurantIDs: [],
    userPos:{},
    filterObject: { // use to filter the  restaurant in range from X stars to Y stars
        from: 1,
        to: 5
    },
    activeCommentForm: false, // if true, then the comment from will pop up.
    activeRestaurant: "" // here will be the PLACE_ID of the active restaurant that is goona receive new comment
};


export default function rootReducer(state = initState, action) {
    switch (action.type) {
        case SAVE_USER_POSITION:
        // have user's position returned from the navigatior, dispatch this action to update the store.
            return {
                ...state,
                userPos: action.payload.position
            }
        case SAVE_RESTAURANT_IDs:

            return {
                ...state,
                allRestaurantIDs: action.payload.restaurantIDs
            }
        case SAVE_RESTAURANT:
            return {
                ...state,
                allRestaurants: state.allRestaurants.concat([action.payload.restaurant])
            }
        case FILTER_RESTAURANTS:
            const [from, to] = [action.payload.filterObject.from, action.payload.filterObject.to];
            let restaurantsInRange = state.allRestaurants.filter(restaurant => {
                return restaurant.rating >= from && restaurant.rating <= to;
            });
            return {
                ...state,
                restaurantsInRange
            }
        case UPDATE_FILTER_OBJECT:
            return {
                ...state,
                filterObject: {...state.filterObject, ...action.payload.filterObj}
            }
        case OPEN_COMMENT_FORM:
            return {
                ...state,
                activeRestaurant: action.payload.place_id,
                activeCommentForm: true
            }
        default:
            return state;
    }
}

