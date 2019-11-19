import { getActionTypeFromInstance } from '@ngxs/store';
import { SettingChangeLanguageAction } from 'src/app/core/settings/setting-app.action';

// NOT USE. I want use it like PLUGIN (for dynamic title), but get error. I use service now.

export function changeLanguagePlugin(state, action, next) {
  // Use the get action type helper to determine the type
  if (getActionTypeFromInstance(action) === SettingChangeLanguageAction.type) {
    console.log('action ->', action);
    console.log('state ->', state);
    // if we are a logout type, lets erase all the state
    state = {};
  }

  // return the next function with the empty state
  return next(state, action);
}
