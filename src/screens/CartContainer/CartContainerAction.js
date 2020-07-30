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
  
  import { strings } from '@values/strings'
  import axios from 'axios'
  import { urls } from '@api/urls'
  
  const header = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  }
  
  export function showLoadingIndicator(type) {  
    return {
      type: type
    };
  }
  
  
  export function onSuccess(data, type) {
    return {
      data,
      type: type,
    };
  }
  
  export function onFailure(error, type) {
    return {
      type: type,
      error
    };
  }
  
  export function getCartData(data) {
  console.log("getCartData",data);
  
    return dispatch => {
      dispatch(showLoadingIndicator(CART_DATA));
  
      axios.post(urls.CartData.url, data, header).then(response => {
          console.log("getCartData", response.data);
          if (response.data.ack ==='1') {
            dispatch(
              onSuccess(response.data, CART_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, CART_DATA_ERROR)
            )
          }
        })
        .catch(function (error) {
          console.log("getHomePageData ERROR", error);
  
          dispatch(
            onFailure(strings.serverFailedMsg, CART_DATA_ERROR)
          );
        });
    }
  }
  
  export function getWishlistData(data) {
    console.log("getWishlistData",data);
    
      return dispatch => {
        dispatch(showLoadingIndicator(WISHLIST_DATA));
    
        axios.post(urls.CartData.url, data, header).then(response => {
            console.log("getWishlistData", response.data);
            if (response.data.ack ==='1') {
              dispatch(
                onSuccess(response.data, WISHLIST_DATA_SUCCESS)
              )
            }
            else {
              dispatch(
                onFailure(response.data.msg, WISHLIST_DATA_ERROR)
              )
            }
          })
          .catch(function (error) {
            console.log("getHomePageData ERROR", error);
    
            dispatch(
              onFailure(strings.serverFailedMsg, WISHLIST_DATA_ERROR)
            );
          });
      }
    }
      
  