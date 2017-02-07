import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Text,
  Slider,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from '../../components/Modal';
import TextField from '../../components/TextField';
import { palette, rounded } from '../../styles/config';

export default class PagePicker extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPage: true,
      page: this.props.currentPage || 1,
      floor: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.setState({
        page: nextProps.currentPage || 1,
        floor: 1,
      });
    }
  }

  _onChangeType = (val) => {
    this.setState({ isPage: val });
  }

  _onChangeFloor = (val) => {
    this.setState({
      floor: Math.min(Number(val), this.props.maximumPage * 30),
      page: Math.min(Math.ceil(Number(val) / 30), this.props.maximumPage),
    });
  }

  _onChangePage = (val) => {
    this.setState({
      page: Math.min(Number(val), this.props.maximumPage),
    });
  }

  render() {
    const { visible, onRequestClose, jumpToPage } = this.props;
    const value = this.state.isPage ? this.state.page : this.state.floor;
    const onChange = this.state.isPage ? this._onChangePage : this._onChangeFloor;
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
              if (this.state.page) {
                jumpToPage(this.state.page);
              }
              onRequestClose();
            }}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>确认</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>{this.state.isPage ? `到页 (1-${this.props.maximumPage})` : `到楼层 (1-${this.props.maximumPage * 30})`}</Text>
            <Switch
              value={this.state.isPage}
              onValueChange={this._onChangeType}
              onTintColor={palette.primary}
            />
          </View>
          <TextField
            value={value ? String(value) : ''}
            onChangeText={onChange}
            style={styles.input}
            keyboardType="number-pad"
            underlineColorAndroid="transparent"
            clearTextOnFocus
          />
          <Slider
            step={1}
            minimumValue={1}
            maximumValue={this.state.isPage ? this.props.maximumPage : this.props.maximumPage * 30}
            value={value}
            onValueChange={onChange}
            maximumTrackTintColor={palette.mint3}
            minimumTrackTintColor={palette.primary}
          />
        </View>
      </Modal>
    );
  }
}

PagePicker.propTypes = {
  // maximumFloor: PropTypes.number,
  maximumPage: PropTypes.number,
  currentPage: PropTypes.number,
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  jumpToPage: PropTypes.func.isRequired,
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    ...rounded,
    textAlign: 'right',
    borderColor: palette.mint3,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: palette.white,
  },
});
