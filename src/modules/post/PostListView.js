import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
} from 'react-native';
import { fromJS, is } from 'immutable';
import Moment from 'moment';
import * as PostState from './PostState';
import Row from '../../components/PostRow';


const posts = fromJS([
  { subject: '我又来招人了，这次是直播主持和运营主管', author: 'snoopy', updatedAt: Moment.unix(1479378120) },
  { subject: '招聘手游运营经理', author: 'Mufasa', updatedAt: Moment.unix(1478782200) },
  { subject: '广州青宫动漫嘉年华暨Comic Member04', author: '亚里士缺德', updatedAt: Moment.unix(1478764500) },
  { subject: '山贺博之上海交流会&amp;《王立宇宙军》上映会11月8日开场', author: '白鹅君', updatedAt: Moment.unix(1478674320) },
  { subject: '锤子公司濒临倒闭 - 被裁员工谈在锤子科技工作感受', author: 'dx2', updatedAt: Moment.unix(1478362692) },
]);

const renderRow = rowData => (
  <Row
    subject={rowData.get('subject')}
    author={rowData.get('author')}
    updatedAt={rowData.get('updatedAt')}
  />
);

class PostListView extends Component {
  static route = {
    navigationBar: {
      title: 'Posts',
    },
  }

  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !is(r1, r2),
    });
    // Shallow convert to a JS array, leaving immutable row data.
    this.state = {
      dataSource: ds.cloneWithRows(posts.toArray()),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default PostListView;
