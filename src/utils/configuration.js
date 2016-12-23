import { Map } from 'immutable';

const URL_ROOT = __DEV__ ? 'saraba1st.asuscomm.com:20080' : 'app.saraba1st.com';

let configuration = Map({
  API_ROOT: `http://${URL_ROOT}/2b/api/app/`,
  STATIC_ROOT: `http://${URL_ROOT}/2b/`,
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
