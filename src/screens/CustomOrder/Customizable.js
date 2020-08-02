import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Container, Content, Icon, Picker} from 'native-base';
import IconPack from '@login/IconPack';
import FloatingLabelTextInput from '@floatingInputBox/FloatingLabelTextInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
const {width, height} = Dimensions.get('window');

const PickerDropDown = () => {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <View>
      <Picker
        iosIcon={
          <Image
            source={IconPack.DOWN_ARROW}
            style={{width: 12, height: 12, resizeMode: 'cover'}}
          />
        }
        mode="dropdown"
        style={{height: 50, width: wp(55)}}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="18k" value="18k" />
        <Picker.Item label="22k" value="22k" />
      </Picker>
    </View>
  );
};

export default class Customizable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grossWeight: '',
      length: '',
      quantity: '',
      hookType: '',
      color: '',
      remark: '',
      isDateTimePickerVisible: false,
    };

    this.lengthRef = React.createRef();
    this.quantityRef = React.createRef();
    this.hookTypeRef = React.createRef();
    this.colorTypeRef = React.createRef();
    this.remarkRef = React.createRef();
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
    this.hideDateTimePicker();
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
  handleRemarkChange = newText =>
    this.setState({
      remark: newText,
    });
  render() {
    const {isDateTimePickerVisible} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Container
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <Content contentContainerStyle={{flex: 1}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                backgroundColor: '#11255a',
              }}>
              <Image
                style={{
                  height: 160,
                  width: 160,
                  resizeMode: 'cover',
                }}
                source={IconPack.PROFILE}
              />
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
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{marginHorizontal: 16, marginTop: 20}}>
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
                        <Text style={{fontSize: 18, color: '#000000'}}>
                          Select Karat
                        </Text>
                      </View>
                      <PickerDropDown />
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
                        <TouchableOpacity
                          onPress={() => {
                            this.showDateTimePicker();
                          }}>
                          <Text
                            style={{
                              color: '#a3a3a3',

                              marginTop: 5,
                              fontSize: 18,
                            }}>
                            Delivery Date
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
                </ScrollView>
              </View>
            </View>
          </Content>
          <Image
            style={{
              position: 'absolute',
              top: height / 3.81,
              right: 16,
              resizeMode: 'cover',
              width: 50,
              height: 50,
            }}
            source={IconPack.PLUS_ICON}
          />
          <View
            style={{
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#11255a',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <TouchableOpacity onPress={() => alert('submitOrder')}>
              <Text style={{fontSize: 16, color: '#fbcb84'}}>SUBMIT ORDER</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  textWrapper: {
    height: hp('90%'),
    width: wp('80%'),
    backgroundColor: 'yellow',
  },
  myText: {
    fontSize: hp('15%'),
  },
});
