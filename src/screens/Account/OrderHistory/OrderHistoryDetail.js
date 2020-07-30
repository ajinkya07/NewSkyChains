import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  StyleSheet,
  Image, FlatList,
  TouchableOpacity, ActivityIndicator,
} from 'react-native';

import _CustomHeader from '@customHeader/_CustomHeader'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { urls } from '@api/urls'
import { getOrderHistoryDetails } from '@orderHistory/OrderHistoryAction'
import { Toast } from 'native-base';
import Modal from 'react-native-modal';
import _Text from '@text/_Text'
import { color } from '@values/colors';



var userId = ''


const OrderDetailBottomTab = () => {
  return (
    <View style={BottomTabstyles.cardContainer}>
      <View
        style={{
          flex: 1.8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => alert('Detail')}>
          <Text style={BottomTabstyles.detailText}>DETAIL</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderLeftWidth: 1,
          borderLeftColor: '#fbcb84',
          marginVertical: 5,
        }}
      />
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => alert('Reorder')}>
          <Text style={BottomTabstyles.detailText}>RE-ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BottomTabstyles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    justifyContent: 'space-between',
    backgroundColor: '#11255a',
    height: 48,
    flexDirection: 'row',
  },
  detailText: {
    color: '#fbcb84',
  },
});

class OrderHistoryDetail extends Component {

  constructor(props) {
    super(props);

    const data = this.props.route.params.data;

    this.state = {
      orderItemdata: data,
      successOrderHistoryDetailsVersion: 0,
      errorOrderHistoryDetailsVersion: 0,

      isImageModalVisibel: false,
      imageToBeDisplayed: ''
    };
    userId = global.userId
  }



  componentDidMount = async () => {
    const { orderItemdata } = this.state

    const data = new FormData();
    data.append('order_id', orderItemdata.order_id);

    await this.props.getOrderHistoryDetails(data)

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { successOrderHistoryDetailsVersion, errorOrderHistoryDetailsVersion } = nextProps;

    let newState = null;

    if (successOrderHistoryDetailsVersion > prevState.successOrderHistoryDetailsVersion) {
      newState = {
        ...newState,
        successOrderHistoryDetailsVersion: nextProps.successOrderHistoryDetailsVersion,
      };
    }
    if (errorOrderHistoryDetailsVersion > prevState.errorOrderHistoryDetailsVersion) {
      newState = {
        ...newState,
        errorOrderHistoryDetailsVersion: nextProps.errorOrderHistoryDetailsVersion,
      };
    }

    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { orderHistoryDetailsData } = this.props;

    if (this.state.successOrderHistoryDetailsVersion > prevState.successOrderHistoryDetailsVersion) {
      this.setState({
        cartStateData: orderHistoryDetailsData
      })
    }
    if (this.state.errorOrderHistoryDetailsVersion > prevState.errorOrderHistoryDetailsVersion) {
      Toast.show({
        text: this.props.errorMsg,
        duration: 2500
      })
    }
  }


  noDataFound = (msg) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(80) }}>
        <Image
          source={require("../../../assets/gif/noData.gif")}
          style={{ height: hp(20), width: hp(20) }}
        />
        <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center' }}>{msg}</Text>
      </View>
    )
  }

  renderLoader = () => {
    return (
      <View style={{
        position: 'absolute', height: hp(90), width: wp(100),
        alignItems: 'center', justifyContent: 'center',
      }}>
        <ActivityIndicator size="large" color={color.brandColor} />
      </View>
    );
  };



  showImageModal = (item) => {
    console.log("data for image--", item);
    this.setState({
      imageToBeDisplayed: item,
      isImageModalVisibel: true
    })
  }


  OrderHistoryDetailComponent = (data) => {

    console.warn("data", data);

    return (
      <View style={styles.container}>
        <Text style={styles.productIdText}>Product Id: {data.product_id}</Text>
        <View style={styles.subcontainerView}>
          <View style={styles.imgView}>
            <TouchableOpacity onLongPress={() => this.showImageModal(data)}>
              <Image
                style={styles.imageStyle}
                source={{ uri: data.image_zoom }}
                defaultSource={require('../../../assets/image/default.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contentView}>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>order date:</Text>
              <Text style={styles.contentText}>{data.value[0]}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>delivery date:</Text>
              <Text style={styles.contentText}>{data.value[1]}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>quantity:</Text>
              <Text style={styles.contentText}>{data.value[2]}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>gross wt:</Text>
              <Text style={styles.contentText}>{data.value[3]}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>net wt:</Text>
              <Text style={styles.contentText}>{data.value[4]}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>order id:</Text>
              <Text style={styles.contentText}>{data.value[5]}</Text>
            </View>
            <View style={styles.rowTextStyle}>
              <Text style={styles.contentText}>order stage</Text>
              <Text style={styles.contentText}>{data.value[6]}</Text>
            </View>
            <View style={styles.bottomLine}></View>
          </View>
        </View>
      </View>
    );
  };


  render() {
    const { orderHistoryDetailsData } = this.props
    const { imageToBeDisplayed } = this.state

    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <_CustomHeader
            Title='Order History Details'
            RightBtnIcon1={require('../../../assets/image/BlueIcons/Search.png')}
            RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification.png')}
            LeftBtnPress={() => this.props.navigation.goBack()}
            RightBtnPressOne={() => this.props.navigation.navigate('SearchScreen')}
            RightBtnPressTwo={() => this.props.navigation.navigate('Notification')}
            rightIconHeight2={hp(3.5)}
          />

          {orderHistoryDetailsData &&
            <FlatList
              data={orderHistoryDetailsData.order_details}
              refreshing={this.props.isFetching}
              // onRefresh={() => this.scrollDownToRefreshWishList()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{}}>
                  {this.OrderHistoryDetailComponent(item)}
                </View>
              )}
              keyExtractor={(item, index) => index}
            />
          }

          {orderHistoryDetailsData &&
            <OrderDetailBottomTab />
          }

          {this.state.isImageModalVisibel &&
            <View>
              <Modal style={{ justifyContent: 'center' }}
                isVisible={this.state.isImageModalVisibel}
                onRequestClose={() => this.setState({ isImageModalVisibel: false })}
                onBackdropPress={() => this.setState({ isImageModalVisibel: false })}
                onBackButtonPress={() => this.setState({ isImageModalVisibel: false })}
              >
                <SafeAreaView>
                  <View style={{
                    height: hp(42), backgroundColor: 'white', alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10
                  }}>
                    <_Text fsMedium style={{ marginTop: hp(0.5) }}>Code: {imageToBeDisplayed.product_id}</_Text>
                    <View style={{ marginTop: 5, borderBottomColor: 'gray', borderBottomWidth: 1, width: wp(90) }} />
                    <Image
                      source={{ uri: imageToBeDisplayed.image_zoom }}
                      defaultSource={require('../../../assets/image/default.png')}
                      style={{
                        height: hp(35), width: wp(90), marginTop: hp(1),
                      }}
                      resizeMode='cover'
                    />
                  </View>
                </SafeAreaView>
              </Modal>
            </View>
          }

          {this.props.isFetching ? this.renderLoader() : null}


          <SafeAreaView />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  bottomLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
    marginVertical: 5,
    // marginTop: 10,
  },
  imageStyle: {
    width: hp(9),
    height: hp(17),
    resizeMode: 'contain',
    borderRadius:5,
    marginLeft:-10

  },
  container: {
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: Platform.OS === 'ios' ? 20 : 30,
  },
  productIdText: {
    textAlign: 'center',
    marginBottom: 6,
  },
  subcontainerView: {
    flexDirection: 'row',
  },
  imgView: {
    flex: 1.1,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentView: {
    flex: 3,
    height: 140,
  },
  rowTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  contentText: {
    color: '#808080',
  },
});


function mapStateToProps(state) {
  return {
    isFetching: state.orderHistoryReducer.isFetching,
    error: state.orderHistoryReducer.error,
    errorMsg: state.orderHistoryReducer.errorMsg,
    successOrderHistoryDetailsVersion: state.orderHistoryReducer.successOrderHistoryDetailsVersion,
    errorOrderHistoryDetailsVersion: state.orderHistoryReducer.errorOrderHistoryDetailsVersion,
    orderHistoryDetailsData: state.orderHistoryReducer.orderHistoryDetailsData,


  };
}

export default connect(mapStateToProps, { getOrderHistoryDetails })(OrderHistoryDetail);
