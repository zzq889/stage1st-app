import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
  Modal,
  View,
  StyleSheet,
  Picker,
} from 'react-native';
import { List } from 'immutable';
import { palette } from '../../styles/config';

class QuestionPicker extends Component {
  state = {
    modalVisible: false,
  }

  _setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { items, style, selectedValue, ...props } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this._setModalVisible(true)}
        style={[style, styles.picker]}
      >
        <Text style={styles.pickerText}>{items.get(selectedValue || 0)}</Text>
        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => this._setModalVisible(false)}
        >
          <View style={styles.container}>
            <View style={styles.modal}>
              <View style={styles.toolbar}>
                <TouchableOpacity
                  onPress={() => this._setModalVisible(false)}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
              <Picker
                selectedValue={selectedValue}
                {...props}
              >
                {items.map((item, idx) => (
                  <Picker.Item
                    key={idx}
                    label={item}
                    value={idx}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  }
}

QuestionPicker.propTypes = {
  style: PropTypes.number,
  items: PropTypes.instanceOf(List),
  selectedValue: PropTypes.number,
  onValueChange: PropTypes.func,
};

const styles = StyleSheet.create({
  picker: {
    height: 44,
    padding: 10,
    justifyContent: 'center',
  },
  pickerText: {
    fontSize: 17,
    color: palette.deepMint,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: palette.mint,
    borderTopColor: palette.toolbar,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  modal: {
    backgroundColor: palette.toolbar,
  },
  modalButton: {
    padding: 10,
  },
  modalButtonText: {
    color: palette.primary,
    fontSize: 15,
  },
});

export default QuestionPicker;
