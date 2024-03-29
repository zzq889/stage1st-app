import { Map } from 'immutable';

const DEBUG = true;
const DEV_ROOT = 's165.asuscomm.com:20080';
const PROD_ROOT = 's165.asuscomm.com:20080'; // app.saraba1st.com

const URL_ROOT = (__DEV__ && DEBUG) ? DEV_ROOT : PROD_ROOT;

let configuration = Map({
  // Never put the slash at the end
  API_ROOT: `http://${URL_ROOT}/2b/api/app`,
  WP_ROOT: `http://${DEV_ROOT}/news/wp-json`,
  STATIC_ROOT: `http://${URL_ROOT}/2b`,
  SITE: `http://${URL_ROOT}`,
  APP_NAME: 'Stage1 论坛',
  COMPANY: '上海初欣网络科技有限公司',
  VERSION: '1.0.0',
});

export function setConfiguration(name, value) {
  configuration = configuration.set(name, value);
}

export function setAll(properties) {
  configuration = configuration.merge(properties);
}

export function unsetConfiguration(name) {
  configuration = configuration.delete(name);
}

export function getConfiguration(key) {
  if (!configuration.has(key)) {
    throw new Error(`Undefined configuration key: ${key}`);
  }

  return configuration.get(key);
}
