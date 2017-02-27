import * as Keychain from 'react-native-keychain';
import { persistor } from '../redux/store';

export async function clearSnapshot() {
  await clear();
}

async function clear() {
  try {
    await persistor.purge();
    await Keychain.resetGenericPassword();
  } catch (e) {
    console.error('Error clearing peristed application state', e);
  }
}
