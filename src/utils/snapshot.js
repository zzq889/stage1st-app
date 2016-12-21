import { persistor } from '../redux/store';

export async function clearSnapshot() {
  await clear();
}

async function clear() {
  try {
    await persistor.purge();
  } catch (e) {
    console.error('Error clearing peristed application state', e);
  }
}
