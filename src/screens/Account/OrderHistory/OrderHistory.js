import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Image,
  Platform
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { urls } from '@api/urls'
import { getOrderHistoryList } from '@orderHistory/OrderHistoryAction'
import { Toast } from 'native-base';


var userId = ''


class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {

      successOrderHistoryVersion: 0,
      errorOrderHistoryVersion: 0
    };
    userId = global.userId
  }



  componentDidMount = async () => {

    const data = new FormData();
    data.append('user_id', 94);

    await this.props.getOrderHistoryList(data)

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { successOrderHistoryVersion, errorOrderHistoryVersion } = nextProps;

    let newState = null;

    if (successOrderHistoryVersion > prevState.successOrderHistoryVersion) {
      newState = {
        ...newState,
        successOrderHistoryVersion: nextProps.successOrderHistoryVersion,
      };
    }
    if (errorOrderHistoryVersion > prevState.errorOrderHistoryVersion) {
      newState = {
        ...newState,
        errorOrderHistoryVersion: nextProps.errorOrderHistoryVersion,
      };
    }

    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { orderHistoryData } = this.props;

    if (this.state.successOrderHistoryVersion > prevState.successOrderHistoryVersion) {
      this.setState({
        cartStateData: orderHistoryData
      })
    }
    if (this.state.errorOrderHistoryVersion > prevState.errorOrderHistoryVersion) {
      Toast.show({
        text: this.props.errorMsg,
        duration: 2500
      })
    }
  }


  noDataFound = (msg) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center',height:hp(80) }}>
        <Image
          source={require("../../../assets/gif/noData.gif")}
          style={{ height: hp(20), width: hp(20) }}
        />
        <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center' }}>{msg}</Text>
      </View>
    )
  }

  orderHistoryView = (item) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('OrderHistoryDetail')}>
        <View>
          <Text>Order Number:75</Text>
          <View style={styles.rowTextStyle}>
            <Text>Order Date</Text>
            <Text>2020-07-04</Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text>Delivery Date</Text>
            <Text>2020-07-30</Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text>Total Weight</Text>
            <Text>167.000</Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text>Remarks</Text>
            <Text>Test</Text>
          </View>
          <View style={styles.bottomLine}></View>
        </View>
      </TouchableOpacity>

    )
  }

  render() {
    const { orderHistoryData } = this.props

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <_CustomHeader
          Title='Order History'
          RightBtnIcon1={require('../../../assets/image/BlueIcons/Search.png')}
          RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification.png')}
          LeftBtnPress={() => this.props.navigation.goBack()}
          RightBtnPressOne={() => this.props.navigation.navigate('SearchScreen')}
          RightBtnPressTwo={() => this.props.navigation.navigate('Notification')}
          rightIconHeight2={hp(3.5)}
        />

        {orderHistoryData && orderHistoryData.length > 0 &&
          <View style={styles.viewContainer}>
            <FlatList
              data={orderHistoryData}
              refreshing={this.props.isFetching}
              // onRefresh={() => this.scrollDownToRefreshWishList()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{ marginBottom: hp(1), marginTop: hp(1), }}>
                  {this.orderHistoryView(item)}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              style={{ marginTop: hp(1), }}
            />

          </View>
        }
        {!this.props.isFetching && this.props.orderHistoryData.length === 0 ?
          this.noDataFound(this.props.errorMsg) : null}

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  viewContainer: {
    marginTop: Platform.OS === 'ios' ? 12 : 10,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF'
  },
  rowTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Platform.OS === 'ios' ? 4 : 2,
  },
  bottomLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
    marginVertical: 10,
  },
});


function mapStateToProps(state) {
  return {
    isFetching: state.orderHistoryReducer.isFetching,
    error: state.orderHistoryReducer.error,
    errorMsg: state.orderHistoryReducer.errorMsg,
    successOrderHistoryVersion: state.orderHistoryReducer.successOrderHistoryVersion,
    errorOrderHistoryVersion: state.orderHistoryReducer.errorOrderHistoryVersion,
    orderHistoryData: state.orderHistoryReducer.orderHistoryData,


  };
}

export default connect(mapStateToProps, { getOrderHistoryList })(OrderHistory);
