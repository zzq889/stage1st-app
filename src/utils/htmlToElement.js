import React from 'react';
import {
  Text,
} from 'react-native';
import htmlparser from 'htmlparser2-without-node-native';
import entities from 'entities';
import Image from '../components/Image';

const DEBUG = __DEV__ && false;
const LINE_BREAK = '\n';
const PARAGRAPH_BREAK = DEBUG ? 'PARAGRAPH_BREAK' : <Text>&nbsp;</Text>;
const BULLET = '\u2022 ';

function getBlockType(node) {
  if (node.name === 'img' && node.attribs.smilieid) {
    return false;
  }
  return [
    'br',
    'blockquote',
    'img',
    'div',
    'p',
    'h1', 'h2', 'h3', 'h4', 'h5',
  ].indexOf(node.name) !== -1;
}

function flatten(dom) {
  return dom.reduce((flat, node) => {
    if (node.name === 'font' && node.children) {
      return flat.concat(flatten(node.children));
    }
    if (node.name === 'div' && node.children) {
      return flat.concat(flatten(node.children));
    }
    if (node.type === 'text' && node.data.trim() === '') {
      return flat;
    }
    if (node.name === 'br') {
      if (flat.length > 0 && getBlockType(flat[flat.length - 1])) {
        return flat;
      }

      if (dom.indexOf(node) === 0) {
        return flat;
      }
    }

    return flat.concat(node);
  }, []);
}

function htmlToElement(rawHtml, opts, done) {
  function domToElement(dom, parent) {
    if (!dom) return null;

    return flatten(dom).map((node, index, list) => {
      const isBlock = getBlockType(node);
      const shouldBreakLast = isBlock && index < list.length - 1;

      if (opts.customRenderer) {
        const rendered = opts.customRenderer(node, index, parent, opts, () => domToElement(node.children, node));
        if (rendered || rendered === null) {
          return (
            <Text key={index}>
              {rendered}
              {shouldBreakLast ? PARAGRAPH_BREAK : null}
            </Text>
          );
        }
      }

      if (node.type === 'text') {
        return (
          <Text key={index} style={parent ? [opts.styles.text, opts.styles[parent.name]] : opts.styles.text}>
            {DEBUG ? `<text${index}>` : null}
            {entities.decodeHTML(node.data).trim()}
            {DEBUG ? `</text${index}>` : null}
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

        if (node.name === 'a') {
          return (
            <Text key={index} style={opts.styles[node.name]} onPress={linkPressHandler}>
              {domToElement(node.children, node)}
            </Text>
          );
        }

        if (node.name === 'br') {
          if (index === list.length - 1) return null;
          return (
            <Text
              key={index}
              style={opts.styles[node.name]}
            >
              {PARAGRAPH_BREAK}
            </Text>
          );
        }

        return (
          <Text key={index} style={opts.styles[node.name]} onPress={linkPressHandler}>
            {
              DEBUG
              ? (
                <Text>
                  {`<${node.name}${index}`}
                  <Text style={opts.styles.attr}>${JSON.stringify(node.attribs)}</Text>
                  {'>'}
                </Text>
              )
              : null
            }
            {node.name === 'pre' ? LINE_BREAK : null}
            {node.name === 'li' ? BULLET : null}
            {domToElement(node.children, node)}
            {shouldBreakLast ? PARAGRAPH_BREAK : null}
            {DEBUG ? `</${node.name}${index}>` : null}
          </Text>
        );
      }

      return null;
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
