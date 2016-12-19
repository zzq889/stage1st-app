import { createRouter } from '@exponent/ex-navigation';
import CounterViewContainer from './counter/CounterViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
const AppRouter = createRouter(() => ({
  counter: () => CounterViewContainer,
  color: () => ColorViewContainer,
}));

export default AppRouter;
