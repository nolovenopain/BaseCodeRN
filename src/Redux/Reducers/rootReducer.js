import { combineReducers } from 'redux';
// import debugReducer from './debugReducer';
import globalReducer from './globalReducer';
import settingsReducer from './settingsReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
    // debug: debugReducer,
    global: globalReducer,
    settings: settingsReducer,
    user: userReducer,
});

export default reducer;