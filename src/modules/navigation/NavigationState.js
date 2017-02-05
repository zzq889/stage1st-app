import { AppNavigator } from './AppNavigator';

export default function NavigationStateReducer(state, action) {
  return AppNavigator.router.getStateForAction(action, state);
}
