/* eslint-disable react/forbid-prop-types */

import React, { Component, PropTypes } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  View,
  WebView,
  Dimensions,
} from 'react-native';
import Image from 'react-native-fit-image';
import { withNavigation } from 'react-navigation';
import SafariView from 'react-native-safari-view';
import { getConfiguration } from '../utils/configuration';
import htmlToElement from '../utils/htmlToElement';

import { palette } from '../styles/config';

const boldStyle = { fontWeight: '500' };
const italicStyle = { fontStyle: 'italic' };
const codeStyle = { fontFamily: 'Menlo' };
const htmlWidth = Dimensions.get('window').width * 0.92;

const baseStyles = StyleSheet.create({
  b: boldStyle,
  strong: boldStyle,
  i: {
    ...italicStyle,
    color: palette.red,
  },
  em: italicStyle,
  pre: codeStyle,
  code: codeStyle,
  a: {
    color: palette.blue,
  },
  text: {
    fontSize: 17,
    color: palette.foreground,
  },
  br: {
    color: palette.orange,
  },
  blockquote: {
    color: palette.grey,
    backgroundColor: palette.white,
    padding: 10,
    marginBottom: 10,
  },
});

async function openUrl(url) {
  try {
    let available = true;
    try {
      await SafariView.isAvailable();
    } catch (e) {
      available = false;
    }
    if (available) {
      SafariView.show({ url });
    } else {
      Linking.openURL(url);
    }
  } catch (err) {
    console.error('An error occurred', err);
  }
}

const staticRoot = getConfiguration('STATIC_ROOT');

@withNavigation
class HtmlView extends Component {
  constructor() {
    super();
    this.state = {
      element: null,
      height: 0,
    };
  }

  componentWillMount() {
    this.mounted = true;
    if (!this.props.isContent) {
      this.startOtherContentRender(this.props.value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value && !this.props.isContent) {
      this.mounted = true;
      this.startOtherContentRender(nextProps.value);
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  linkHander = (url) => {
    // url: forum.php?mod=redirect&goto=findpost&ptid=1345022&pid=34083134
    const result = url.match(/(?:forum\.php.*ptid=)(\d+)/);
    const tid = result && result[1];
    if (tid) {
      this.props.navigation.navigate('Posts', { tid });
    } else {
      openUrl(url);
    }
  }
  startOtherContentRender(value) {
    if (!value) {
      this.setState({ element: null });
    }
    const opts = {
      linkHandler: this.props.onLinkPress || this.linkHander,
      styles: Object.assign({}, baseStyles, this.props.stylesheet),
      customRenderer: this.renderNode,
    };
    htmlToElement(value, opts, (err, element) => {
      if (err) {
        this.props.onError(err);
      }

      if (this.mounted) {
        this.setState({ element });
      }
    });
  }
  startHtmlContentRender(value) {
    if (!value) {
      return <Text />;
    }
    const script = `
            <script>
        window.location.hash = 1;
        var oMeta = document.createElement('meta');
        oMeta.name='viewport';
        oMeta.content='user-scalable=0';
        document.getElementsByTagName('head')[0].appendChild(oMeta);
        var calculator = document.createElement("div");
        calculator.id = "height-calculator";
        calculator.setAttribute("style", "background-color: ${palette.background}"); 
        document.body.setAttribute("style", "background-color: ${palette.background}");
        while (document.body.firstChild) {
            calculator.appendChild(document.body.firstChild);      
        }
        document.body.appendChild(calculator);
        var imgs = document.getElementsByTagName('img');
        var embeds = document.getElementsByTagName('embed');
        for (var j = 0; j < embeds.length; ++j) {
          embeds[j].style.display = 'none';
          }        
        for (var i = 0; i < imgs.length; ++i) {
          var img = imgs[i];
          img.style.display = 'block';
          img.style.height = 'auto';
          img.style.width = 'auto';
          img.style.maxWidth = ("${htmlWidth}" + 'px');
          if (img.getAttribute('smilieid')) {
            var uri = img.getAttribute('src');
            img.id = 'smile' + i;
            var assembledUri = uri.match(new RegExp('/^\//')) ? "${staticRoot}" + uri : "${staticRoot}" + '/' + uri;
            assembledUri = uri.match(new RegExp('/^http/')) ? uri : assembledUri;
            assembledUri = assembledUri.replace(new RegExp('//attachments/(?!forum)/'), '/attachments/forum/');
            img.style.marginBottom = 0;
            img.setAttribute("src", assembledUri);        
          }
          if (img.srcset) {
            var images = img.srcset.split(',');
            var usedImage = String(images[1]).split(' ').filter(function(n) {return Boolean(n)});
            var tmpImg = document.createElement("img");
            var tmpDiv = document.createElement("div");
            tmpDiv.id= "tmp" + String(i);
            tmpDiv.style.display = 'flex';
            tmpDiv.style.justifyContent = 'center';
            tmpImg.src = usedImage[0];
            tmpImg.style.marginBottom = '10px';
            tmpImg.style.display = 'block';
            tmpImg.style.maxWidth = ("${htmlWidth}" + 'px');
            tmpDiv.appendChild(tmpImg);
            img.parentNode.appendChild(tmpDiv);
            img.style.display = 'none';
          }
        }
        var i =0;
        function updateHeight() {
            document.title = calculator.clientHeight;
            window.location.hash = ++i;
        }
        window.addEventListener("load", function() {
            updateHeight();
            setTimeout(updateHeight, 1000);
        });
        window.addEventListener("resize", updateHeight);
        window.addEventListener("click", function(e) {
            e.preventDefault();
            if (e.target.localName == 'a') {
               window.postMessage(e.target.href);
            }
        });
        </script>
    `;
    const style = `
          <style>
      body, html, #height-calculator {
          background-color: ${palette.background};
          margin: 0;
          padding: 0;
          outline: none;
          overflow-x:hidden;
          width:100%;
      }
      #height-calculator {
          background-color: ${palette.background};
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 0;     
      }
      </style>
    `;
    const wrapperSource = `${value}${style}${script}`;
    const element = (
      <WebView
        ref={(a) => { this.WebViewRef = a; }}
        source={{ html: wrapperSource }}
        style={{
          height: this.state.height,
          backgroundColor: palette.background,
          width: htmlWidth,
        }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        automaticallyAdjustContentInsets={false}
        dataDetectorTypes={'none'}
        scrollEnabled={false}
        onMessage={(event) => {
          this.linkHander(event.nativeEvent.data);
        }}
        onNavigationStateChange={(nav) => {
          this.setState({ height: Number(nav.title) + 10 });
        }}
      />
    );
    return element;
  }

  transferImgSrc = (uri) => {
    //  const uri = attribs.src;
    let assembledUri = uri.match(/^\//)
        ? staticRoot + uri
        : `${staticRoot}/${uri}`;
    assembledUri = uri.match(/^http/) ? uri : assembledUri;
      // Hack for API mistake
      // related issue: https://github.com/mixslice/stage1st-app/issues/41
    assembledUri = assembledUri.replace(
        /\/attachments\/(?!forum)/, '/attachments/forum/');
    return assembledUri;
  }
  // node, index, parent, opts, renderChild
  renderNode = (node, index, parent) => {
    const attribs = node.attribs;

    if (node.name === 'img') {
      const isEmoji = attribs.smilieid;
      const defaultSize = isEmoji ? 32 : null;

      const imgStyles = {
        width: defaultSize,
        height: defaultSize,
      };

      const marginBottom = { marginBottom: isEmoji ? 0 : 20 };
      const source = {
        uri: this.transferImgSrc(attribs.src),
      };
      if (parent) {
        return null;
      }

      return (
        <Image
          key={index}
          source={source}
          style={[imgStyles, marginBottom]}
        />
      );
    }

    return undefined;
  }

  render() {
    const { isContent, value } = this.props;
    if (isContent && value) {
      return (
        <View>
          {this.startHtmlContentRender(this.props.value)}
        </View>
      );
    } else if (!value) {
      return <Text />;
    }
    if (this.state.element) {
      return (<View>
        {this.state.element}
      </View>);
    }
    return <Text />;
  }
}

HtmlView.propTypes = {
  isContent: PropTypes.bool,
  value: PropTypes.string,
  stylesheet: PropTypes.any,
  onLinkPress: PropTypes.func,
  onError: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

HtmlView.defaultProps = {
  onError: console.error.bind(console),
};

export default HtmlView;
