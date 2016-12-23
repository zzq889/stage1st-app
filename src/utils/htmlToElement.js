import React from 'react';
import {
  Text,
} from 'react-native';
import htmlparser from 'htmlparser2-without-node-native';
import entities from 'entities';
import Image from '../components/Image';


const LINE_BREAK = '\n';
const PARAGRAPH_BREAK = '\n\n';
const BULLET = '\u2022 ';

function htmlToElement(rawHtml, opts, done) {
  function domToElement(dom, parent) {
    if (!dom) return null;

    return dom.map((node, index, list) => {
      if (opts.customRenderer) {
        const rendered = opts.customRenderer(node, index, parent, () => domToElement(node.children, node));
        if (rendered || rendered === null) return rendered;
      }


      if (node.type === 'text') {
        return (
          <Text key={index} style={parent ? opts.styles[parent.name] : null}>
            {entities.decodeHTML(node.data)}
          </Text>
        );
      }

      if (node.type === 'tag') {
        if (node.name === 'img') {
          const imgWidth = +node.attribs.width || +node.attribs['data-width'] || 0;
          const imgHeight = +node.attribs.height || +node.attribs['data-height'] || 0;

          const imgStyle = {
            width: imgWidth,
            height: imgHeight,
          };
          const source = {
            uri: node.attribs.src,
            width: imgWidth,
            height: imgHeight,
          };
          return (
            <Image key={index} source={source} style={imgStyle} />
          );
        }

        let linkPressHandler = null;
        if (node.name === 'a' && node.attribs && node.attribs.href) {
          linkPressHandler = () => opts.linkHandler(entities.decodeHTML(node.attribs.href));
        }

        return (
          <Text key={index} onPress={linkPressHandler}>
            {node.name === 'pre' ? LINE_BREAK : null}
            {node.name === 'li' ? BULLET : null}
            {domToElement(node.children, node)}
            {node.name === 'br' || node.name === 'li' ? LINE_BREAK : null}
            {node.name === 'p' && index < list.length - 1 ? PARAGRAPH_BREAK : null}
            {node.name === 'h1' || node.name === 'h2' || node.name === 'h3' || node.name === 'h4' || node.name === 'h5' ? LINE_BREAK : null}
          </Text>
        );
      }

      return <Text />;
    });
  }

  const handler = new htmlparser.DomHandler((err, dom) => {
    if (err) done(err);
    done(null, domToElement(dom));
  });
  const parser = new htmlparser.Parser(handler);
  parser.write(rawHtml);
  parser.done();
}

export default htmlToElement;
