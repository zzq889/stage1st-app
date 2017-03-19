import { AppNavigator } from './AppNavigator';

let lastTime = 0;

export default function NavigationStateReducer(state, action) {
  const currentTime = new Date().getTime();
  if (action.type === 'Navigation/NAVIGATE') {
    if (lastTime && (currentTime - lastTime) < 800) {
      lastTime = currentTime;
      return state;
    }
    lastTime = currentTime;
  }
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState;
}
