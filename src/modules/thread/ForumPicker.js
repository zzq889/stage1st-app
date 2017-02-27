import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from '../../components/Modal';
import { palette } from '../../styles/config';

export default class ForumPicker extends PureComponent {
  render() {
    const { visible, onRequestClose } = this.props;
    return (
      <Modal
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.modalToolbar}>
          <TouchableOpacity
            onPress={onRequestClose}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onRequestClose();
            }}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>确认</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <Text>Content</Text>
        </View>
      </Modal>
    );
  }
}

ForumPicker.propTypes = {
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

const styles = StyleSheet.create({
  modalToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: palette.mint3,
  },
  modalContent: {
    padding: 20,
  },
  modalButton: {
    padding: 10,
  },
  modalButtonText: {
    color: palette.primary,
    fontSize: 15,
  },
  label: {
    color: palette.foreground,
    fontSize: 17,
  },
});
