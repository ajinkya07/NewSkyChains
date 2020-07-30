import {
  PRODUCT_DETAILS_DATA,
  PRODUCT_DETAILS_DATA_SUCCESS,
  PRODUCT_DETAILS_DATA_ERROR,
  PRODUCT_DETAILS_DATA_RESET_REDUCER,

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

export function getProductDetails(data) {
console.log("getProductDetails data",data);

  return dispatch => {
    dispatch(showLoadingIndicator(PRODUCT_DETAILS_DATA));

    axios.post(urls.ProductDetails.url, data, header).then(response => {
        console.log("getProductDetails", response.data);
        if (response.data.ack ==='1') {
          dispatch(
            onSuccess(response.data, PRODUCT_DETAILS_DATA_SUCCESS)
          )
        }
        else {
          dispatch(
            onFailure(response.data.msg, PRODUCT_DETAILS_DATA_ERROR)
          )
        }
      })
      .catch(function (error) {
        console.log("getProductDetails", error);

        dispatch(
          onFailure(strings.serverFailedMsg, PRODUCT_DETAILS_DATA_ERROR)
        );
      });
  }
}


// export function afterOtpRequest(data) {
//   console.log("SendOtp data",data);
  
//     return dispatch => {
//       dispatch(showLoadingIndicator(OTP_DATA));
//       axios.post(urls.ChangePassword.url, data, header).then(response => {
//           console.log("afterOtpRequest", response.data);
//           if (response.data.ack ==='1') {
//             dispatch(
//               onSuccess(response.data, OTP_DATA_SUCCESS)
//             )
//           }
//           else {
//             dispatch(
//               onFailure(response.data.msg, OTP_DATA_ERROR)
//             )
//           }
//         })
//         .catch(function (error) {
//           console.log("AFTER OTP WITH MOB AND PASS ERROR ", error);
//           dispatch(
//             onFailure(strings.serverFailedMsg, OTP_DATA_ERROR)
//           );
//         });
//     }
//   }
  