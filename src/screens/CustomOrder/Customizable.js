import React, { Component, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,ActivityIndicator,
  SafeAreaView,
  Image, TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Container, Content, Icon, Picker, ActionSheet, Toast } from 'native-base';
import IconPack from '@login/IconPack';
import FloatingLabelTextInput from '@floatingInputBox/FloatingLabelTextInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import moment from 'moment'
import { color } from '@values/colors';
import { submitCustomOrder } from '@customOrder/CustomOrderAction'

var BUTTONS = ["Take Photo", "Choose from Library", "Cancel"];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;

var userId = ''


const { width, height } = Dimensions.get('window');



class Customizable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      karatValue: '',
      grossWeight: '',
      length: '',
      quantity: '',
      hookType: '',
      color: '',
      diameter: '',
      remark: '',
      isDateTimePickerVisible: false,
      imageUrl: '',
      date: '',

      successCustomOrderVersion: 0,
      errorCustomOrderVersion: 0
    };

    userId = global.userId;

    this.lengthRef = React.createRef();
    this.quantityRef = React.createRef();
    this.hookTypeRef = React.createRef();
    this.colorTypeRef = React.createRef();
    this.diameterRef = React.createRef();
    this.remarkRef = React.createRef();
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const { successCustomOrderVersion, errorCustomOrderVersion } = nextProps;
    let newState = null;

    if (successCustomOrderVersion > prevState.successCustomOrderVersion) {
      newState = {
        ...newState,
        successCustomOrderVersion: nextProps.successCustomOrderVersion,
      };
    }
    if (errorCustomOrderVersion > prevState.errorCustomOrderVersion) {
      newState = {
        ...newState,
        errorCustomOrderVersion: nextProps.errorCustomOrderVersion,
      };
    }
    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { customOrderData } = this.props;
    console.warn("customOrderData", customOrderData);

    if (this.state.successCustomOrderVersion > prevState.successCustomOrderVersion) {
        this.showToast(this.props.errorMsg, 'success');
      
    }
    if (this.state.errorCustomOrderVersion > prevState.errorCustomOrderVersion) {
      this.showToast(this.props.errorMsg, 'danger');
    }
  }




  showDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: true,
    });
  };

  hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false,
    });
  };

  handleDatePicked(date) {
    let d = moment(new Date(date).toISOString().slice(0, 10)).format('DD-MM-YYYY')

    this.setState({
      date: d,
      isDateTimePickerVisible: false,
    })
    // this.hideDateTimePicker();
  }

  handleGrossWeightChange = newText =>
    this.setState({
      grossWeight: newText,
    });
  handleLengthChange = newText =>
    this.setState({
      length: newText,
    });
  handleQuantityChange = newText =>
    this.setState({
      quantity: newText,
    });
  handleHookTypeChange = newText =>
    this.setState({
      hookType: newText,
    });
  handleColorChange = newText =>
    this.setState({
      color: newText,
    });

  handleDiameterChange = newText =>
    this.setState({
      diameter: newText,
    });


  handleRemarkChange = newText =>
    this.setState({
      remark: newText,
    });

  // image selection

  showActionSheet = () => {
    return (
      ActionSheet.show(
        {
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX,
          destructiveButtonIndex: DESTRUCTIVE_INDEX,
        },
        buttonIndex => {
          switch (buttonIndex) {
            case 0: {
              this.openCamera();
              break;
            }
            case 1: {
              this.openImagePicker();
              break;
            }
          }
        }
      )
    );
  }

  openCamera = () => {
    ImagePicker.openCamera({
      width: wp(95),
      height: hp(35),
      cropping: true,
      includeBase64: true
    }).then(image => {
      //     var  url = image &&  image.path.replace(/ /g, "%20");
      this.setState({ imageUrl: image.path, })
    });
  }

  openImagePicker = () => {
    ImagePicker.openPicker({
      width: wp(95),
      height: hp(35),
      includeBase64: true,
      cropping: true
    }).then(image => {
      this.setState({ imageUrl: image.path, })
    })
  }


  submitCustomOrder = () => {
    const { grossWeight, length, quantity, hookType, color, diameter, remark, imageUrl, date } = this.state

    console.warn("url", imageUrl);


    if (!grossWeight) {
      this.showToast('Please enter gross weight', 'danger')
    }
    else if (!length) {
      this.showToast('Please enter length', 'danger')
    }
    else if (!quantity) {
      this.showToast('Please enter quantity', 'danger')
    }
    else if (!hookType) {
      this.showToast('Please enter hookType', 'danger')
    }
    else if (!color) {
      this.showToast('Please enter color', 'danger')
    }
    else if (!diameter) {
      this.showToast('Please enter diameter', 'danger')
    }
    else if (!date) {
      this.showToast('Please select date', 'danger')
    }
    // if(!remark){
    //   this.showToast('Please enter remark','danger')
    // }
    else if (!imageUrl) {
      this.showToast('Please add image', 'danger')
    }

    else {
      console.warn("for submit");
      const data = new FormData();

      data.append('user_id', userId);
      data.append('gross_wt', grossWeight);
      data.append('size', length);
      data.append('net_wt', grossWeight);
      data.append('length', length);
      data.append('delivery_date', date);
      data.append('remark', remark);
      data.append('file', imageUrl);
      data.append('color', color);
      data.append('diameter', diameter);
      data.append('hook', hookType);

      this.props.submitCustomOrder(data)

    }

  }

  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : strings.serverFailedMsg,
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };

  setSelectedValue = (karat) => {
    this.setState({
      karatValue: karat
    })
  }


  PickerDropDown = () => {
    const { karatValue } = this.state

    return (
      <View>
        <Picker
          iosIcon={
            <Image
              source={IconPack.DOWN_ARROW}
              style={{ width: 12, height: 12, resizeMode: 'cover' }}
            />
          }
          mode="dropdown"
          style={{ height: 50, width: wp(55) }}
          selectedValue={karatValue}
          onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}>
          <Picker.Item label="18k" value="18k" />
          <Picker.Item label="22k" value="22k" />
        </Picker>
      </View>
    );
  };

  renderLoader = () => {
    return (
      <View style={{    position: 'absolute',height: hp(100),width: wp(100),
      alignItems: 'center',justifyContent: 'center',}}>
        <ActivityIndicator size="large" color={color.white} />
      </View>
    );
  };


  render() {
    const { isDateTimePickerVisible } = this.state;


    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <View
              style={{
                alignItems: 'center', justifyContent: 'center', flex: 1,
                backgroundColor: '#11255a',
              }}>
              {this.state.imageUrl == '' &&
                <Image
                  style={{
                    width: wp(95),
                    height: hp(30),
                    resizeMode: 'contain',
                  }}
                  source={IconPack.PROFILE}
                />
              }
              {this.state.imageUrl !== '' &&
                <Image
                  style={{
                    width: wp(95),
                    height: hp(30),
                    resizeMode: 'contain',
                  }}
                  source={{ uri: this.state.imageUrl }}
                />
              }
            </View>

            <View
              style={{
                backgroundColor: '#11255a',
                flex: 2,
              }}>
              <View
                style={{
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  backgroundColor: '#ffffff',
                }}>
                <View style={{ marginHorizontal: 16, marginTop: 20 }}>
                  <FloatingLabelTextInput
                    label="Gross Weight (gm)"
                    value={this.state.grossWeight}
                    onChangeText={this.handleGrossWeightChange}
                    resetValue={this.resetFieldGross}
                    width="100%"
                    keyboardType="numeric"
                    onSubmitEditing={() => this.lengthRef.current.focus()}
                  />
                  <FloatingLabelTextInput
                    label="Length/Size (Inches)"
                    value={this.state.length}
                    onChangeText={this.handleLengthChange}
                    resetValue={this.resetFieldLength}
                    width="100%"
                    keyboardType="numeric"
                    textInputRef={this.lengthRef}
                    onSubmitEditing={() => this.quantityRef.current.focus()}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{ fontSize: 18, color: '#000000', marginLeft: 10 }}>
                        Select Karat
                        </Text>
                    </View>
                    {this.PickerDropDown()}
                    {/* <PickerDropDown /> */}


                  </View>
                  <FloatingLabelTextInput
                    label="Quantity"
                    value={this.state.quantity}
                    onChangeText={this.handleQuantityChange}
                    resetValue={this.resetFieldQuantity}
                    width="100%"
                    keyboardType="numeric"
                    textInputRef={this.quantityRef}
                    onSubmitEditing={() => this.hookTypeRef.current.focus()}
                  />
                  <FloatingLabelTextInput
                    label="Hook Type"
                    value={this.state.hookType}
                    onChangeText={this.handleHookTypeChange}
                    resetValue={this.resetFieldHook}
                    width="100%"
                    textInputRef={this.hookTypeRef}
                    onSubmitEditing={() => this.colorTypeRef.current.focus()}
                  />
                  <FloatingLabelTextInput
                    label="Color"
                    value={this.state.color}
                    onChangeText={this.handleColorChange}
                    resetValue={this.resetFieldColor}
                    width="100%"
                    textInputRef={this.colorTypeRef}
                    onSubmitEditing={() => this.diameterRef.current.focus()}
                  />
                  <FloatingLabelTextInput
                    label="Diameter"
                    value={this.state.diameter}
                    onChangeText={this.handleDiameterChange}
                    resetValue={this.resetDiameter}
                    width="100%"
                    textInputRef={this.diameterRef}
                    onSubmitEditing={() => this.remarkRef.current.focus()}
                  />
                  <View
                    style={{
                      marginTop: 26,
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        borderBottomWidth: 0.5,
                        borderColor: '#a3a3a3',
                        width: '100%',
                      }}>

                      <TouchableOpacity onPress={() => this.showDateTimePicker()}>
                        <Text style={{ color: '#a3a3a3', marginTop: 5, fontSize: 18, marginLeft: 10 }}>
                          {!this.state.date ? 'Delivery Date' : this.state.date}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {isDateTimePickerVisible && (
                    <DateTimePicker
                      isVisible={isDateTimePickerVisible}
                      onConfirm={date => this.handleDatePicked(date)}
                      onCancel={() => hideDateTimePicker()}
                    />
                  )}
                  <FloatingLabelTextInput
                    label="Remarks"
                    value={this.state.remark}
                    onChangeText={this.handleRemarkChange}
                    resetValue={this.resetFieldRemark}
                    width="100%"
                    textInputRef={this.remarkRef}
                  />
                </View>

              </View>
            </View>

          </ScrollView>


          <View style={{ position: 'absolute', top: height / 3.50, right: wp(10) }} >
            <TouchableOpacity onPress={() => this.showActionSheet()}>
              <Image
                style={{
                  //position: 'absolute',
                  resizeMode: 'cover',
                  width: 50,
                  height: 50,
                }}
                source={IconPack.PLUS_ICON}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => this.submitCustomOrder()}>
            <View
              style={{
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#11255a',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}>
              <Text style={{ fontSize: 16, color: '#fbcb84' }}>SUBMIT ORDER</Text>

            </View>
          </TouchableOpacity>

            {this.props.isFetching && this.renderLoader()}

        </Container>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  textWrapper: {
    height: hp('90%'),
    width: wp('80%'),
    backgroundColor: 'yellow',
  },
  myText: {
    fontSize: hp('15%'),
  },
});


function mapStateToProps(state) {
  return {
    isFetching: state.customOrderReducer.isFetching,
    error: state.customOrderReducer.error,
    errorMsg: state.customOrderReducer.errorMsg,
    successCustomOrderVersion: state.customOrderReducer.successCustomOrderVersion,
    errorCustomOrderVersion: state.customOrderReducer.errorCustomOrderVersion,
    customOrderData: state.customOrderReducer.customOrderData,

  };
}

export default connect(mapStateToProps, { submitCustomOrder })(Customizable);
