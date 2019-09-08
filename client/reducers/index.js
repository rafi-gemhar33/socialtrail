import { combineReducers } from 'redux';
import currentUser from './currentUser';
import twiterReducer from './twitterReducer';
import youTubeReducer from './youtubeReducer';

const rootReducer = combineReducers({
	currentUser,
	twitter: twiterReducer,
	youtube: youTubeReducer,
});

export default rootReducer;
