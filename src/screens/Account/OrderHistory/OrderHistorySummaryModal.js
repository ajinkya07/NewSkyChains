import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import IconPack from '../utils/IconPack';

export default class OrderHistorySummaryModal extends Component {
  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button title="Show modal" onPress={this.toggleModal} />
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          transparent={true}
          onRequestClose={() => alert('Close')}
          style={{margin: 0}}>
          <TouchableWithoutFeedback
            style={{flex: 1}}
            onPress={() =>
              this.setState({
                isModalVisible: false,
              })
            }>
            <View
              style={{flex: 1, justifyContent: 'flex-end', marginBottom: 45}}>
              <TouchableWithoutFeedback style={{flex: 1}} onPress={() => null}>
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    marginHorizontal: 16,
                    borderRadius: 10,
                  }}>
                  <View style={styles.topContainer}>
                    <Text style={styles.titleText}>Order History Summary</Text>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            isModalVisible: false,
                          })
                        }>
                        <Image
                          style={styles.closeIcon}
                          source={IconPack.CROSS_CLOSE}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.border}></View>
                  <View style={styles.bottomContainer}>
                    <View style={styles.contentView}>
                      <Text style={styles.textStyle}>Order No.</Text>
                      <Text style={[styles.textStyle, {marginRight: 10}]}>
                        75
                      </Text>
                    </View>
                    <View style={styles.contentView}>
                      <Text style={styles.textStyle}>Total Items.</Text>
                      <Text style={[styles.textStyle, {marginRight: 10}]}>
                        4
                      </Text>
                    </View>
                    <View style={styles.contentView}>
                      <Text style={styles.textStyle}>Total weight</Text>
                      <Text style={[styles.textStyle, {marginRight: 10}]}>
                        167
                      </Text>
                    </View>
                    <View style={styles.contentView}>
                      <Text style={styles.textStyle}>Order Date</Text>
                      <Text style={[styles.textStyle, {marginRight: 10}]}>
                        2020-07-04
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#a3a3a3',
    fontSize: 13,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    height: 36,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    color: '#11255a',
  },
  closeIcon: {
    width: 26,
    height: 26,
    resizeMode: 'cover',
  },
  border: {
    borderBottomColor: '#a3a3a3',
    borderBottomWidth: 0.3,
    marginHorizontal: 5,
  },
  bottomContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
});
