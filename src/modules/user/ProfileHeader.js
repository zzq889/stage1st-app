import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Map } from 'immutable';
import { palette } from '../../styles/config';
import Avatar from '../../components/Avatar';

const ProfileHeader = ({ user, uid, userSign }) => {
  const signed = user.get('signed');
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>UID: {uid} 用户组: {user.get('grouptitle')}</Text>
      <Avatar style={styles.avatar} uid={uid} size={80} />
      <View style={styles.dashboard}>
        <View style={styles.item}>
          <Text style={styles.itemValue}>{user.get('credits')}</Text>
          <Text>积分</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemValue}>{user.get('e')}</Text>
          <Text>鹅</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemValue}>{user.get('coin')}</Text>
          <Text>金币</Text>
        </View>
        <TouchableOpacity
          style={signed ? [styles.button, styles.disabled] : styles.button}
          disabled={signed}
          onPress={() => userSign()}
        >
          <Text style={styles.buttonText}>{signed ? '已签到' : '签到'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ProfileHeader.propTypes = {
  uid: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Map),
  userSign: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  header: {
    margin: 15,
  },
  headerTitle: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  dashboard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemValue: {
    marginBottom: 5,
  },
  button: {
    height: 36,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.primary,
  },
  disabled: {
    backgroundColor: palette.lightGrey,
  },
  buttonText: {
    color: palette.white,
  },
});

export default ProfileHeader;
