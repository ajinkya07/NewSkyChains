import React, { Component, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity, FlatList,
  StyleSheet, ActivityIndicator,
  Dimensions, ScrollView, SafeAreaView
} from 'react-native';
import { Container, Tab, Tabs, TabHeading, Icon, Toast } from 'native-base';
import IconPack from '@login/IconPack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text'
import { color } from '@values/colors';
import { getCartData, getWishlistData, deleteCartWishListProduct,
  getTotalCartCount
} from '@cartContainer/CartContainerAction';
import { connect } from 'react-redux';
import { urls } from '@api/urls'
import Modal from 'react-native-modal';
import { withNavigationFocus } from "@react-navigation/compat";
import { strings } from '@values/strings';



var userId = ''

const { width } = Dimensions.get('window');


const ActionButtonRounded = ({ title, onButonPress, containerStyle }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onButonPress();
      }}>
      <View
        style={[
          actionButtonRoundedStyle.mainContainerStyle,
          containerStyle || null,
        ]}>
        <View style={actionButtonRoundedStyle.innerContainer}>
          <Text style={actionButtonRoundedStyle.titleStyle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const actionButtonRoundedStyle = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: '#11255a',
    height: 42,
    width: width - 36,
    justifyContent: 'center',
    borderRadius: 40,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#fbcb84',
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});



class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      isToggle: false,
      isToogleTwo: false,
      cartStateData: [],
      wishStateData: [],
      openMoreDetailsIdwish: '',
      openMoreDetailsIdCart: '',

      successCartVersion: 0,
      errorCartVersion: 0,

      successWishlistVersion: 0,
      errorWishlistVersion: 0,

      isCartImageModalVisibel: false,
      imageToBeDisplayed: '',

      successDeleteProductVersion: 0,
      errorDeleteProductVersion: 0,
  
      successTotalCartCountVersion: 0,
      errorTotalCartCountVersion: 0,


    };
    userId = global.userId;

  }

  componentDidMount = async () => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android'

    const data = new FormData();
    data.append('user_id', userId);
    data.append('table', 'cart');

    await this.props.getCartData(data)

    const data2 = new FormData();
    data2.append('user_id', userId);
    data2.append('table', 'wishlist');

    await this.props.getWishlistData(data2)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { successCartVersion, errorCartVersion,
      successWishlistVersion, errorWishlistVersion,
      successDeleteProductVersion,errorDeleteProductVersion,
      successTotalCartCountVersion, errorTotalCartCountVersion,

    } = nextProps;
    let newState = null;

    if (successCartVersion > prevState.successCartVersion) {
      newState = {
        ...newState,
        successCartVersion: nextProps.successCartVersion,
      };
    }
    if (errorCartVersion > prevState.errorCartVersion) {
      newState = {
        ...newState,
        errorCartVersion: nextProps.errorCartVersion,
      };
    }
    if (successWishlistVersion > prevState.successWishlistVersion) {
      newState = {
        ...newState,
        successWishlistVersion: nextProps.successWishlistVersion,
      };
    }
    if (errorWishlistVersion > prevState.errorWishlistVersion) {
      newState = {
        ...newState,
        errorWishlistVersion: nextProps.errorWishlistVersion,
      };
    }

    
    if (successDeleteProductVersion > prevState.successDeleteProductVersion) {
      newState = {
        ...newState,
        successDeleteProductVersion: nextProps.successDeleteProductVersion,
      };
    }
    if (errorDeleteProductVersion > prevState.errorDeleteProductVersion) {
      newState = {
        ...newState,
        errorDeleteProductVersion: nextProps.errorDeleteProductVersion,
      };
    }

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
    const { cartData, wishlistData, totalCartCountData } = this.props;


    if (prevProps.isFocused !== this.props.isFocused) {
      const data3 = new FormData();
      data3.append('user_id', userId);
      data3.append('table', 'cart');

      await this.props.getCartData(data3)

      const data4 = new FormData();
      data4.append('user_id', userId);
      data4.append('table', 'wishlist');

      await this.props.getWishlistData(data4)
    }

    if (this.state.successCartVersion > prevState.successCartVersion) {
      this.setState({
        cartStateData: cartData
      })
    }
    if (this.state.successWishlistVersion > prevState.successWishlistVersion) {
      this.setState({
        wishStateData: wishlistData
      })
    }

    
    if (this.state.successDeleteProductVersion > prevState.successDeleteProductVersion) {
      Toast.show({
        text:this.props.errorMsg ? this.props.errorMsg : '',
        duration:2500
      })
      const data5 = new FormData();
      data5.append('user_id', userId);
      data5.append('table', 'cart');

      await this.props.getCartData(data5)

      const data6 = new FormData();
      data6.append('user_id', userId);
      data6.append('table', 'wishlist');

      await this.props.getWishlistData(data6)

      if(this.state.currentPage == 0){
      const data7 = new FormData();
      data7.append('user_id', userId);
      data7.append('table', 'cart');
  
      await this.props.getTotalCartCount(data7)
      }
  

    }

    
    if (this.state.errorDeleteProductVersion > prevState.errorDeleteProductVersion) {
      Toast.show({
        text:this.props.errorMsg ? this.props.errorMsg : strings.serverFailedMsg,
        duration:2500,
        type:'danger'
      })
    }

    if (this.state.successTotalCartCountVersion > prevState.successTotalCartCountVersion) {
      global.totalCartCount = totalCartCountData.count
    }
    if (this.state.errorTotalCartCountVersion > prevState.errorTotalCartCountVersion) {
      global.totalCartCount = totalCartCountData.count
    }

  }

  renderLoader = () => {
    return (
      <View style={{
        position: 'absolute', height: hp(80), width: wp(100),
        alignItems: 'center', justifyContent: 'center',
      }}>
        <ActivityIndicator size="large" color={color.brandColor} />
      </View>
    );
  };

  noDataFound = (msg) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', bottom: hp(30) }}>
        <Image
          source={require("../../assets/gif/noData.gif")}
          style={{ height: hp(20), width: hp(20) }}
        />
        <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center' }}>{msg}</Text>
      </View>
    )
  }

  setToggleView = (data) => {
    this.setState({
      isToggle: !this.state.isToggle,
      openMoreDetailsIdwish: data.cart_wish_id
    })
  }


  wishListView = (data) => {
    const { isToggle, openMoreDetailsIdwish } = this.state

    let baseurl = urls.imageUrl + data.zoom_image

    return (
      <TouchableOpacity
        onPress={() => this.setToggleView(data)}>
        <View style={styles.tabCartTopContainer}>
          <View style={styles.imgView}>
            <TouchableOpacity
              onLongPress={() => this.showImageModal(data)}>
              <Image
                style={styles.imgStyle}
                source={{ uri: baseurl + data.images }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.codeCollectionView}>
            <Text style={styles.codeText}>Code</Text>
            <Text style={styles.textColor}>Collection</Text>
          </View>
          <View style={styles.chainTitleView}>
            <Text style={styles.chainTitleText}>{data.collection_sku_code}</Text>
            <Text style={styles.textColor}>{data.collection_name}</Text>
          </View>
        </View>
        <View style={styles.moreDetailView}>
          <View>
            <Text style={styles.moreDetailText}>More Details</Text>
          </View>
          <View>
            <Image source={require('../../assets/image/DownArrow.png')}
              style={{ height: hp(2), width: hp(2) }}
            />
          </View>
        </View>
        {isToggle && (openMoreDetailsIdwish === data.cart_wish_id)
          ? (
            <>
              <View style={styles.tabCartMiddleContainer}>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>gross wt:</Text>
                  <Text style={styles.text}>{data.values[0]}</Text>
                </View>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>net wt:</Text>
                  <Text style={styles.text}>{data.values[1]}</Text>
                </View>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>quantity:</Text>
                  <Text style={styles.text}>{data.values[2]}</Text>
                </View>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>remarks:</Text>
                  <Text style={styles.text}>{data.values[3]}</Text>
                </View>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>length:</Text>
                  <Text style={styles.text}>{data.values[4]}</Text>
                </View>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>weight:</Text>
                  <Text style={styles.text}>{data.values[5]}</Text>
                </View>
              </View>
              <View style={styles.tabCartBottomContainer}>
                <TouchableOpacity onPress={() => alert('MoveToCart')}>
                  <View style={styles.tabCartBottomImgView}>
                    <Image
                      style={styles.tabCartBottomImg}
                      source={IconPack.MOVE_TO}
                    />
                    <Text style={styles.btnText}>MOVE TO CART</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deleteFromWishlist(data)}>
                  <View style={styles.tabCartBottomImgView}>
                    <Image
                      style={styles.tabCartBottomImg}
                      source={IconPack.DELETE}
                    />
                    <Text style={styles.btnText}>DELETE</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        <View style={styles.border} />
      </TouchableOpacity>
    );
  };


  deleteFromCart = async(i) =>{
    const deleteData = new FormData();
    deleteData.append('user_id', userId);
    deleteData.append('table', 'cart');
    deleteData.append('id', i.cart_wish_id);

    await  this.props.deleteCartWishListProduct(deleteData)

  }


  deleteFromWishlist = async(j) =>{
    
    const wishData = new FormData();
    wishData.append('user_id', userId);
    wishData.append('table', 'wishlist');
    wishData.append('id', j.cart_wish_id);

    await  this.props.deleteCartWishListProduct(wishData)

  }


  favoriteDetail = (k) => {
    return (
      <FlatList
        data={k}
        refreshing={this.props.isFetching}
        onRefresh={() => this.scrollDownToRefreshWishList()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ marginBottom: hp(1), marginTop: hp(1), }}>
            {this.wishListView(item)}
          </View>
        )}
        keyExtractor={(item, index) => (item.cart_wish_id).toString()}
        style={{ marginTop: hp(1), }}
      />

    );
  };

  scrollDownToRefreshWishList = () => {

    const wishDataRefresh = new FormData();
    wishDataRefresh.append('user_id', userId);
    wishDataRefresh.append('table', 'wishlist');

    this.props.getWishlistData(wishDataRefresh)

  }


  setCartToggleView = (data) => {
    this.setState({
      isToogleTwo: !this.state.isToogleTwo,
      openMoreDetailsIdCart: data.cart_wish_id
    })
  }


  cartView = (item) => {
    // const [isToggle, setToggleView] = useState(false);

    // const setToggleValue = isToggle => {
    //   isToggle = !isToggle;
    //   setToggleView(isToggle);
    // };
    const { isToogleTwo, openMoreDetailsIdCart } = this.state

    let baseurl2 = urls.imageUrl + item.zoom_image

    return (
      <TouchableOpacity
        onPress={() => this.setCartToggleView(item)}>

        <View style={styles.tabCartTopContainer}>
          <View style={styles.imgView}>
            <TouchableOpacity
              onLongPress={() => this.showImageModal(item)}>
              <Image
                style={styles.imgStyle}
                source={{ uri: baseurl2 + item.images }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.codeCollectionView}>
            <Text style={styles.codeText}>Code</Text>
            <Text style={styles.textColor}>Collection</Text>
          </View>
          <View style={styles.chainTitleView}>
            <Text style={styles.chainTitleText}>{item.collection_sku_code}</Text>
            <Text style={styles.textColor}>{item.collection_name}</Text>
          </View>
        </View>
        <View style={styles.moreDetailView}>
          <View>
            <Text style={styles.moreDetailText}>More Details</Text>
          </View>
          <View>
            <Image source={require('../../assets/image/DownArrow.png')}
              style={{ height: hp(2), width: hp(2) }}
            />
          </View>
        </View>
        {isToogleTwo && (openMoreDetailsIdCart === item.cart_wish_id)
          ? (
            <>
              <View style={styles.tabCartMiddleContainer}>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>gross wt:</Text>
                  <Text style={styles.text}>{item.values[0]}</Text>
                </View>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>net wt:</Text>
                  <Text style={styles.text}>{item.values[1]}</Text>
                </View>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>quantity:</Text>
                  <Text style={styles.text}>{item.values[2]}</Text>
                </View>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>remarks:</Text>
                  <Text style={styles.text}>{item.values[3]}</Text>
                </View>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>length:</Text>
                  <Text style={styles.text}>{item.values[4]}</Text>
                </View>
                <View style={styles.cartDetail}>
                  <Text style={styles.textColor}>weight:</Text>
                  <Text style={styles.text}>{item.values[5]}</Text>
                </View>
              </View>
              <View style={styles.tabCartBottomContainer}>
                <TouchableOpacity onPress={() => alert('edit')}>
                  <View style={styles.tabCartBottomImgView}>
                    <Image style={styles.tabCartBottomImg} source={IconPack.EDIT} />
                    <Text style={styles.btnText}>EDIT</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('MoveToWishList')}>
                  <View style={styles.tabCartBottomImgView}>
                    <Image
                      style={styles.tabCartBottomImg}
                      source={IconPack.MOVE_TO}
                    />
                    <Text style={styles.btnText}>MOVE TO WISHLIST</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deleteFromCart(item)}>
                  <View style={styles.tabCartBottomImgView}>
                    <Image
                      style={styles.tabCartBottomImg}
                      source={IconPack.DELETE}
                    />
                    <Text style={styles.btnText}>DELETE</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        <View style={styles.border} />
      </TouchableOpacity>
    );
  };



  CartDetails = (cartData) => {
    return (
      <FlatList
        data={cartData}
        refreshing={this.props.isFetching}
        onRefresh={() => this.scrollDownToRefreshCart()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ marginBottom: hp(1), marginTop: hp(1), }}>
            {this.cartView(item)}
          </View>
        )}
        keyExtractor={(item, index) => (item.cart_wish_id).toString()}
        style={{ marginTop: hp(1), }}
      />
    );
  };

  scrollDownToRefreshCart = () => {

    const refreshData = new FormData();
    refreshData.append('user_id', userId);
    refreshData.append('table', 'cart');

    this.props.getCartData(refreshData)

  }


  showImageModal = (item) => {
    this.setState({
      imageToBeDisplayed: item,
      isCartImageModalVisibel: true
    })
  }

  render() {
    const { cartData, wishlistData, isFetching } = this.props
    const { wishStateData, cartStateData, isCartImageModalVisibel, imageToBeDisplayed } = this.state

    let url = 'http://jewel.jewelmarts.in/public/backend/product_images/zoom_image/'

    return (
      <Container style={{ flex: 1 }}>
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: color.brandColor }}
          onChangeTab={({ i }) => this.setState({ currentPage: i })}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#ffffff' }}>
                <Image
                  resizeMode="contain"
                  style={{ width: 22, height: 22 }}
                  source={
                    this.state.currentPage ?
                      require('../../assets/image/GreyCart.png')
                      : require('../../assets/image/BlueIcons/DarkCart.png')
                  }
                />
              </TabHeading>
            }>
            {cartData.length > 0 && !isFetching && this.CartDetails(cartData)}
          </Tab>

          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#ffffff' }}>
                <Image
                  resizeMode="contain"
                  style={{ width: 22, height: 22 }}
                  source={
                    this.state.currentPage ?
                      require('../../assets/image/BlueIcons/Heart.png') :
                      require('../../assets/image/GreyHeart.png')
                  }
                />
              </TabHeading>
            }>
            {wishlistData.length > 0 && !isFetching && this.favoriteDetail(wishlistData)}
          </Tab>
        </Tabs>

        {cartData.length > 0 && this.state.currentPage === 0 ?
          <View
            style={{
              height: 52,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 20,
            }}>
            <ActionButtonRounded
              title="CART WEIGHT"
              onButonPress={() => alert('cart Weight')}
              containerStyle={styles.buttonStyle}
            />
            <ActionButtonRounded
              title="PLACE ORDER"
              onButonPress={() => alert('PlaceOrder')}
              containerStyle={styles.buttonStyle}
            />
          </View> : null
        }
        {wishlistData.length > 0 && this.state.currentPage === 1 ?
          <View
            style={{
              height: 52,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 20,
            }}>
            <ActionButtonRounded
              title="CART WEIGHT"
              onButonPress={() => alert('cart Weight')}
              containerStyle={styles.buttonStyle}
            />
            <ActionButtonRounded
              title="PLACE ORDER"
              onButonPress={() => alert('PlaceOrder')}
              containerStyle={styles.buttonStyle}
            />
          </View> : null
        }
        {this.props.isFetching ? this.renderLoader() : null}

        {!this.props.isFetching && this.props.cartData.length === 0 && this.state.currentPage === 0 ? this.noDataFound(this.props.errorMsgCart) : null}
        {!this.props.isFetching && this.props.wishlistData.length === 0 && this.state.currentPage === 1 ? this.noDataFound(this.props.errorMsgWishlist) : null}


        {this.state.isCartImageModalVisibel &&
          <View>
            <Modal style={{ justifyContent: 'center' }}
              isVisible={this.state.isCartImageModalVisibel}
              onRequestClose={() => this.setState({ isCartImageModalVisibel: false })}
              onBackdropPress={() => this.setState({ isCartImageModalVisibel: false })}
              onBackButtonPress={() => this.setState({ isCartImageModalVisibel: false })}
            >
              <SafeAreaView>
                <View style={{
                  height: hp(42), backgroundColor: 'white', alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10
                }}>
                  <_Text fsMedium style={{ marginTop: hp(0.5) }}>Code: {imageToBeDisplayed.collection_sku_code}</_Text>
                  <View style={{ marginTop: 5, borderBottomColor: 'gray', borderBottomWidth: 1, width: wp(90) }} />
                  <Image
                    source={{ uri: url + imageToBeDisplayed.images }}
                    defaultSource={require('../../assets/image/default.png')}
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

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  tabCartTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 10,
  },
  imgView: {
    height: hp(7),
    width: hp(9),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: color.gray,
    borderRadius: 5
  },
  imgStyle: {
    width: hp(8),
    height: hp(6),

  },
  codeCollectionView: {
    justifyContent: 'center',
  },
  codeText: {
    textAlign: 'left',
    color: '#808080',
  },
  chainTitleView: {
    justifyContent: 'center',
  },
  chainTitleText: {
    textAlign: 'right',
    color: '#808080',
  },
  moreDetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
  },
  moreDetailText: {
    fontWeight: '600',
    color: '#808080',
  },
  tabCartMiddleContainer: {
    marginTop: 10,
    marginHorizontal: 18,
  },
  cartDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginBottom: 10,
    color: '#808080',
  },
  tabCartBottomContainer: {
    marginHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabCartBottomImgView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabCartBottomImg: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  btnText: {
    fontSize: 12,
  },
  border: {
    marginHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    marginTop: 10,
    marginBottom: 10,
  },
  textColor: {
    color: '#808080',
  },
  buttonStyle: {
    backgroundColor: '#11255a',
    height: 42,
    width: 140,
    justifyContent: 'center',
    borderRadius: 40,
    marginVertical: 5,
  },
});




function mapStateToProps(state) {
  return {
    isFetching: state.cartContainerReducer.isFetching,
    error: state.cartContainerReducer.error,
    errorMsgCart: state.cartContainerReducer.errorMsgCart,
    successCartVersion: state.cartContainerReducer.successCartVersion,
    errorCartVersion: state.cartContainerReducer.errorCartVersion,
    cartData: state.cartContainerReducer.cartData,

    errorMsgWishlist: state.cartContainerReducer.errorMsgWishlist,
    successWishlistVersion: state.cartContainerReducer.successWishlistVersion,
    errorWishlistVersion: state.cartContainerReducer.errorWishlistVersion,
    wishlistData: state.cartContainerReducer.wishlistData,

    errorMsg: state.cartContainerReducer.errorMsg,
    successDeleteProductVersion: state.cartContainerReducer.successDeleteProductVersion,
    errorDeleteProductVersion: state.cartContainerReducer.errorDeleteProductVersion,
    deleteProductData: state.cartContainerReducer.deleteProductData,

    successTotalCartCountVersion: state.cartContainerReducer.successTotalCartCountVersion,
    errorTotalCartCountVersion: state.cartContainerReducer.errorTotalCartCountVersion,
    totalCartCountData: state.cartContainerReducer.totalCartCountData,

  };
}

export default connect(mapStateToProps, { getCartData, getWishlistData,
  deleteCartWishListProduct, getTotalCartCount })(withNavigationFocus(CartContainer));
