import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
} from 'react-native';
import { fromJS, is } from 'immutable';
import Moment from 'moment';
// import * as PostState from './PostState';
import Row from './PostRow';


const posts = fromJS([
  {
    pid: 34299132,
    fid: 132,
    tid: 1350288,
    message: '想出刀油这张卡的就是傻逼，应该踢出团队。<br />\ndz如果维持这个风格那就依然是看环境决定能不能赢的卡组，亡语虽然变少了但是衍生物套路可能很克制盗贼',
    author: '白昼梦',
    createdAt: Moment.unix(1480161198),
  },
  {
    pid: 34299179,
    fid: 132,
    tid: 1350288,
    message: '<div class="quote"><blockquote><font size="2"><a href="http://app.saraba1st.com/2b/api/app/forum.php?mod=redirect&amp;goto=findpost&amp;pid=34299132&amp;ptid=1350288" target="_blank"><font color="#999999">白昼梦 发表于 2016-11-26 19:53</font></a></font><br />\r\n想出刀油这张卡的就是傻逼，应该踢出团队。<br />\r\ndz如果维持这个风格那就依然是看环境决定能不能赢的卡组，亡语 ...</blockquote></div><br />\n这和刀油没关系，暴雪说了盗贼就该打不过快攻，我们就是这么设计的，快攻环境下你用盗贼你就是sb',
    author: '飞雪小狂',
    createdAt: Moment.unix(1480163344),
  },
  {
    pid: 34299385,
    fid: 132,
    tid: 1350288,
    message: '<div class="quote"><blockquote><font size="2"><a href="http://app.saraba1st.com/2b/api/app/forum.php?mod=redirect&amp;goto=findpost&amp;pid=34299179&amp;ptid=1350288" target="_blank"><font color="#999999">飞雪小狂 发表于 2016-11-26 19:58</font></a></font><br />\r\n这和刀油没关系，暴雪说了盗贼就该打不过快攻，我们就是这么设计的，快攻环境下你用盗贼你就是sb ...</blockquote></div><br />\n没问题，就像到现在也牧师打不过所有有斩杀的组合技卡组或控制一样，很正常，',
    author: '10925',
    createdAt: Moment.unix(1480163344),
  },
]);

const renderRow = rowData => (
  <Row
    message={rowData.get('message')}
    author={rowData.get('author')}
    createdAt={rowData.get('createdAt')}
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
