import React, { Component } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from 'react-native';
import { Icon, Header, Item, Input, Card, Body, Toast } from 'native-base';
import _Container from '@container/_Container';
import { color } from '@values/colors';
import _Tabs from '@tabs/_Tabs';
import HomePageStyle from '@homepage/HomePageStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { strings } from '@values/strings';
import {
  getTotalCartCount
}
  from '@homepage/HomePageAction';
import { connect } from 'react-redux';

var userId = ''

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    userId = global.userId;

  }


  componentDidMount = async () => {
    const data2 = new FormData();
    data2.append('user_id', userId);
    data2.append('table', 'cart');

    await this.props.getTotalCartCount(data2)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successTotalCartCountVersion, errorTotalCartCountVersion, } = nextProps;
    let newState = null;
    if (successTotalCartCountVersion > prevState.successTotalCartCountVersion) {
      newState = {
        ...newState,
        successTotalCartCountVersion: nextProps.successTotalCartCountVersion,
      };
    }
    if (errorTotalCartCountVersion > prevState.errorTotalCartCountVersion) {
      newState = {
        ...newState,
        errorTotalCartCountVersion: nextProps.errorTotalCartCountVersion,
      };
    }


    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { totalCartCountData } = this.props;

    if (this.state.successTotalCartCountVersion > prevState.successTotalCartCountVersion) {
      //AsyncStorage.setItem("totalCartCount", totalCartCountData.count)
      global.totalCartCount = totalCartCountData.count
    }
  }



  onNotificationPress() {
    this.props.navigation.navigate('Notification');
  }

  renderSearchbar = () => {
    this.props.navigation.navigate('SearchScreen');

  }

  renderCall = () => {
    alert('call')
  }

  render() {
    const { safeAreaView } = HomePageStyle;

    return (
      <SafeAreaView style={safeAreaView}>
        <_Container
          showHeader
          showSearch
          showNotification
          showCalling
          showLogo={false}
          showBack={false}
          showLoading={false}
          onSearchPress={() => this.renderSearchbar()}
          onCallingPress={() => this.renderCall()}
          onNotificationPress={() => this.onNotificationPress()}>
          <_Tabs count={global.totalCartCount}/>
        </_Container>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.homePageReducer.isFetching,
    error: state.homePageReducer.error,
    errorMsg: state.homePageReducer.errorMsg,

    successTotalCartCountVersion: state.homePageReducer.successTotalCartCountVersion,
    errorTotalCartCountVersion: state.homePageReducer.errorTotalCartCountVersion,
    totalCartCountData: state.homePageReducer.totalCartCountData,

  };
}

export default connect(mapStateToProps, { getTotalCartCount })(Container);
