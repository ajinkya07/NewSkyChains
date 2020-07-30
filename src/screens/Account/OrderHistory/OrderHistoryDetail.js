import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import _CustomHeader from '@customHeader/_CustomHeader'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



const OrderHistoryDetailComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.productIdText}>Product Id:1077</Text>
      <View style={styles.subcontainerView}>
        <View style={styles.imgView}>
          <Image
            style={styles.imageStyle}
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHnx2IxXolP5b4-ZWmOhi6JgsAJDHH7Y1fnw&usqp=CAU',
            }}
            defaultSource={require('../../../assets/image/default.png')}
          />
        </View>
        <View style={styles.contentView}>
          <View style={styles.rowTextStyle}>
            <Text style={styles.contentText}>order date:</Text>
            <Text style={styles.contentText}>2020-07-04</Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text style={styles.contentText}>delivery date:</Text>
            <Text style={styles.contentText}>2020-07-30</Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text style={styles.contentText}>quantity:</Text>
            <Text style={styles.contentText}>1</Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text style={styles.contentText}>gross wt:</Text>
            <Text style={styles.contentText}>0.000</Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text style={styles.contentText}>net wt:</Text>
            <Text style={styles.contentText}>0.000</Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text style={styles.contentText}>order id:</Text>
            <Text style={styles.contentText}>75</Text>
          </View>
          <View style={styles.rowTextStyle}>
            <Text style={styles.contentText}>order stage</Text>
            <Text style={styles.contentText}>Pending</Text>
          </View>
          <View style={styles.bottomLine}></View>
        </View>
      </View>
    </View>
  );
};

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

export default class OrderHistoryDetail extends Component {
  render() {
    return (
      <>
      <SafeAreaView style={{flex:1}}>
          <_CustomHeader
          Title='Order History Details'
          RightBtnIcon1={require('../../../assets/image/BlueIcons/Search.png')}
          RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification.png')}
          LeftBtnPress={() => this.props.navigation.goBack()}
          RightBtnPressOne={()=> this.props.navigation.navigate('SearchScreen')}
          RightBtnPressTwo={()=> this.props.navigation.navigate('Notification')}
          rightIconHeight2={hp(3.5)}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <OrderHistoryDetailComponent />
            <OrderHistoryDetailComponent />
            <OrderHistoryDetailComponent />
            <OrderHistoryDetailComponent />
          </ScrollView>
          <OrderDetailBottomTab />
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
    width: 50,
    height: 56,
    resizeMode: 'contain',
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
