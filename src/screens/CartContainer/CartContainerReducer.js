import {
    CART_DATA,
    CART_DATA_SUCCESS,
    CART_DATA_ERROR,
    CART_DATA_RESET_REDUCER,

    WISHLIST_DATA,
    WISHLIST_DATA_SUCCESS,
    WISHLIST_DATA_ERROR,
    WISHLIST_DATA_RESET_REDUCER,

} from "@redux/types";


const initialState = {
    isFetching: false,
    error: false,
    errorMsgCart: "",
    errorMsgWishlist:"",
    successCartVersion: 0,
    errorCartVersion: 0,
    cartData: [],

    successWishlistVersion: 0,
    errorWishlistVersion: 0,
    wishlistData: [],
};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {

        case CART_DATA:
            return {
                ...state,
                isFetching: true
            };

        case CART_DATA_SUCCESS:
            return {
                ...state,
                errorMsgCart: "",
                isFetching: false,
                cartData: action.data.data,
                successCartVersion: ++state.successCartVersion,
                error: false
            };

        case CART_DATA_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMsgCart: action.error,
                cartData:[],
                errorCartVersion: ++state.errorCartVersion
            };

        case CART_DATA_RESET_REDUCER:
            return initialState;

        case WISHLIST_DATA:
            return {
                ...state,
                isFetching: true
            };

        case WISHLIST_DATA_SUCCESS:
            return {
                ...state,
                errorMsgWishlist: "",
                isFetching: false,
                wishlistData: action.data.data,
                successWishlistVersion: ++state.successWishlistVersion,
                error: false
            };

        case WISHLIST_DATA_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMsgWishlist: action.error,
                errorWishlistVersion: ++state.errorWishlistVersion
            };

        case WISHLIST_DATA_RESET_REDUCER:
            return initialState;


        default:
            return state;
    }
}
