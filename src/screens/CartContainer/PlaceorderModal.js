import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import IconPack from '@login/IconPack';
import { strings } from '@values/strings';
import FloatingLabelTextInput from '@floatingInputBox/FloatingLabelTextInput';
const {width} = Dimensions.get('window');
 import DateTimePicker from 'react-native-modal-datetime-picker';



 
export default class PlaceorderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mobileNo: '1980110078',
      comments: '',
      value: '',
      email: 'John@mailinator.com',
      isDateTimePickerVisible: false,
    };
  }
  state = {
    isModalVisible: false,
  };

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
    //console.log('A date has been picked: ', date);
    this.hideDateTimePicker();
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  handleNameChange = newText =>
    this.setState({
      name: newText,
    });
  handleEmailChange = newText =>
    this.setState({
      email: newText,
    });
  handleMobileChange = newText =>
    this.setState({
      mobileNo: newText,
    });
  handleCommentsChange = newText =>
    this.setState({
      comments: newText,
    });

  resetFieldEmail = () =>
    this.setState({
      email: '',
    });
  resetFieldName = () =>
    this.setState({
      name: '',
    });
  resetFieldMobileNo = () =>
    this.setState({
      mobileNo: '',
    });
  resetFieldComment = () =>
    this.setState({
      comments: '',
    });
  render() {
    const {isDateTimePickerVisible} = this.state;
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button title="Show modal" onPress={this.toggleModal} />
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          transparent={true}
          onRequestClose={() => alert('Close')}>
          {/* <TouchableWithoutFeedback
            style={{flex: 1}}
            onPress={() =>
              this.setState({
                isModalVisible: false,
              })
            }> */}
          <View style={styles.mainContainer}>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => null}>
              <View style={styles.bottomContainer}>
                <ScrollView>
                  <View style={{marginHorizontal: 20, marginTop: 5}}>
                    <FloatingLabelTextInput
                      label="Name"
                      value={this.state.name}
                      onChangeText={this.handleNameChange}
                      resetValue={this.resetFieldName}
                      imageIcon="profile"
                      width="88%"
                    />
                    <FloatingLabelTextInput
                      label="Email"
                      value={this.state.email}
                      onChangeText={this.handleEmailChange}
                      resetValue={this.resetFieldEmail}
                      imageIcon="email"
                      editable={false}
                      selectTextOnFocus={false}
                      width="88%"
                    />
                    <FloatingLabelTextInput
                      label="Mobile"
                      value={this.state.mobileNo}
                      onChangeText={this.handleMobileChange}
                      resetValue={this.resetFieldMobileNo}
                      imageIcon="Mobile"
                      width="88%"
                    />
                    <FloatingLabelTextInput
                      label="Comments"
                      value={this.state.comments}
                      onChangeText={this.handleCommentsChange}
                      resetValue={this.resetFieldComment}
                      imageIcon="comments"
                      width="88%"
                    />
                    <View
                      style={{
                        marginTop: 32,
                        flexDirection: 'row',
                      }}>
                      <View style={{marginRight: 10}}>
                        <Image
                          source={IconPack.GRAY_DATE}
                          style={{width: 25, height: 25, resizeMode: 'cover'}}
                        />
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 0.5,
                          borderColor: '#a3a3a3',
                          width: '88%',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.showDateTimePicker();
                          }}>
                          <Text style={styles.textDatePickerStyle}>Date</Text>
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
                  </View>
                  <View style={styles.btnView}>
                    <ActionButtonRounded
                      title="PLACE ORDER"
                      onButonPress={() => Alert.alert('Placeorder')}
                      containerStyle={styles.buttonStyle}
                    />
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* </TouchableWithoutFeedback> */}
        </Modal>
   
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 10,
  },
  alertContainer: {
    height: 100,
    backgroundColor: '#11255a',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  alertText: {
    fontSize: 21,
    color: '#fbcb84',
  },
  alertIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  closeIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 12,
    right: 10,
    bottom: 0,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  cartSummaryText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  middleViewContainer: {
    marginVertical: 20,
  },
  middleText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#A9A9A9',
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDatePickerStyle: {
    color: '#a3a3a3',
    //textAlign: 'left',
    marginTop: 5,
    fontSize: 18,
  },
});
//---------------------------------------Action Button----------

const ActionButtonRounded = ({title, onButonPress, containerStyle}) => {
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
    height: 44,
    width: width - 210,
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
