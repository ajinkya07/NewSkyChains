import {
    CART_DATA,
    CART_DATA_SUCCESS,
    CART_DATA_ERROR,
    CART_DATA_RESET_REDUCER,

    WISHLIST_DATA,
    WISHLIST_DATA_SUCCESS,
    WISHLIST_DATA_ERROR,
    WISHLIST_DATA_RESET_REDUCER,

    DELETE_FROM_CART_WISHLIST_DATA,
    DELETE_FROM_CART_WISHLIST_DATA_SUCCESS,
    DELETE_FROM_CART_WISHLIST_DATA_ERROR,
    DELETE_FROM_CART_WISHLIST_DATA_RESET_REDUCER,

    TOTAL_CART_COUNT_DATA,
    TOTAL_CART_COUNT_DATA_SUCCESS,
    TOTAL_CART_COUNT_DATA_ERROR,
    TOTAL_CART_COUNT_DATA_RESET_REDUCER,
  
} from "@redux/types";
import { act } from "react-test-renderer";


const initialState = {
    isFetching: false,
    error: false,
    errorMsg:'',
    errorMsgCart: "",
    errorMsgWishlist:"",
    successCartVersion: 0,
    errorCartVersion: 0,
    cartData: [],

    successWishlistVersion: 0,
    errorWishlistVersion: 0,
    wishlistData: [],
    
    successDeleteProductVersion: 0,
    errorDeleteProductVersion: 0,
    deleteProductData: [],

    successTotalCartCountVersion: 0,
    errorTotalCartCountVersion: 0,
    totalCartCountData: [],
  
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
                wishlistData: [],
                errorMsgWishlist: action.error,
                errorWishlistVersion: ++state.errorWishlistVersion
            };

        case WISHLIST_DATA_RESET_REDUCER:
            return initialState;


            case DELETE_FROM_CART_WISHLIST_DATA:
                return {
                    ...state,
                    isFetching: true
                };
    
            case DELETE_FROM_CART_WISHLIST_DATA_SUCCESS:
                return {
                    ...state,
                    errorMsg: action.data.msg,
                    isFetching: false,
                    deleteProductData: action.data.data,
                    successDeleteProductVersion: ++state.successDeleteProductVersion,
                    error: false
                };
    
            case DELETE_FROM_CART_WISHLIST_DATA_ERROR:
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    errorMsg: action.error,
                    errorDeleteProductVersion: ++state.errorDeleteProductVersion
                };
    
            case DELETE_FROM_CART_WISHLIST_DATA_RESET_REDUCER:
                return initialState;
    

                case TOTAL_CART_COUNT_DATA:
                    return {
                      ...state,
                      isFetching: true
                    };
              
                  case TOTAL_CART_COUNT_DATA_SUCCESS:
                    return {
                      ...state,
                      errorMsg: "",
                      isFetching: false,
                      totalCartCountData: action.data.data,
                      successTotalCartCountVersion: ++state.successTotalCartCountVersion,
                      error: false
                    };
              
                  case TOTAL_CART_COUNT_DATA_ERROR:
                    return {
                      ...state,
                      isFetching: false,
                      error: true,
                      errorMsg: action.error,
                      totalCartCountData:{count:0},
                      errorTotalCartCountVersion: ++state.errorTotalCartCountVersion
                    };
              
                  case TOTAL_CART_COUNT_DATA_RESET_REDUCER:
                    return initialState;
              
    
        default:
            return state;
    }
}
