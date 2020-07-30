import {
    ORDER_HISTORY_DATA,
    ORDER_HISTORY_DATA_SUCCESS,
    ORDER_HISTORY_DATA_ERROR,
    ORDER_HISTORY_DATA_RESET_REDUCER,

} from "@redux/types";


const initialState = {
    isFetching: false,
    error: false,
    errorMsg: "",
    successOrderHistoryVersion: 0,
    errorOrderHistoryVersion: 0,
    orderHistoryData: [],
};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {

        case ORDER_HISTORY_DATA:
            return {
                ...state,
                isFetching: true
            };

        case ORDER_HISTORY_DATA_SUCCESS:
            return {
                ...state,
                errorMsg: "",
                isFetching: false,
                orderHistoryData: action.data.data,
                successOrderHistoryVersion: ++state.successOrderHistoryVersion,
                error: false
            };

        case ORDER_HISTORY_DATA_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMsg: action.error,
                orderHistoryData:[],
                errorOrderHistoryVersion: ++state.errorOrderHistoryVersion
            };

        case ORDER_HISTORY_DATA_RESET_REDUCER:
            return initialState;



        default:
            return state;
    }
}
