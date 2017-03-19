import React, { PropTypes, PureComponent } from 'react';
import { Set, List } from 'immutable';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { connectActionSheet } from '@exponent/react-native-action-sheet';
import ComposeButton from '../../components/ComposeButton';

@connect(
  state => ({
    forums: state
      .getIn(['forum', 'subscriptions'], Set())
      .map(fid => state.getIn(['entities', 'forums', String(fid)]))
      .toList(),
  }),
)
@withNavigation
@connectActionSheet
export default class ThreadComposeButton extends PureComponent {
  state = {
    isModalVisible: false,
  }

  showActionSheet = () => {
    const options = [
      ...this.props.forums.map(forum => forum.get('name')),
      this.props.forums.size > 0 ? '取消' : '去订阅，再来发帖',
    ];

    const cancelButtonIndex = this.props.forums.size;
    if (cancelButtonIndex === 1) {
      const fid = this.props.forums.getIn([0, 'fid']);
      this.props.navigation.navigate('NewThread', { fid });
    } else {
      // show actionsheet
      this.props.showActionSheetWithOptions({
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButtonIndex) {
          const fid = this.props.forums.getIn([buttonIndex, 'fid']);
          this.props.navigation.navigate('NewThread', { fid });
        }
      });
    }
  }

  render() {
    if (this.props.forums.size > 0) {
      return <ComposeButton onPress={this.showActionSheet} />;
    }
    return null;
  }
}

ThreadComposeButton.propTypes = {
  forums: PropTypes.instanceOf(List),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  showActionSheetWithOptions: PropTypes.func,
};
