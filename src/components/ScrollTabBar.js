/* eslint-disable react/forbid-prop-types */

import React, { PureComponent, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

class ScrollTabBar extends PureComponent {
  renderTab = (name, page, isTabActive, onPressHandler) => {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <TouchableOpacity
        key={page}
        onPress={() => onPressHandler(page)}
      >
        <View style={[isTabActive ? styles.activeTab : styles.tab, this.props.tabStyle]}>
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[styles.tabs, { backgroundColor: this.props.backgroundColor }, this.props.style]}>
        <ScrollView
          ref={(c) => { this.scrollView = c; }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage);
          })}
        </ScrollView>
      </View>
    );
  }
}

ScrollTabBar.propTypes = {
  style: PropTypes.number,
  goToPage: PropTypes.func,
  activeTab: PropTypes.number,
  tabs: PropTypes.array,
  backgroundColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  inactiveTextColor: PropTypes.string,
  textStyle: Text.propTypes.style,
  tabStyle: View.propTypes.style,
  renderTab: PropTypes.func,
  // underlineStyle: View.propTypes.style,
  // containerWidth: PropTypes.number,
  // scrollValue: PropTypes.shape({
  //   interpolate: PropTypes.func.isRequired,
  // }).isRequired,
};

ScrollTabBar.defaultProps = {
  activeTextColor: 'navy',
  inactiveTextColor: 'black',
  backgroundColor: null,
};

const styles = StyleSheet.create({
  tabs: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 2,
    borderColor: 'navy',
  },
});

export default ScrollTabBar;
