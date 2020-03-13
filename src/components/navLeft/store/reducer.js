import { fromJS } from 'immutable';
import * as constants from './constants.js'

const defaultState = fromJS({
	title: 'Hello',
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_TITLE:
			return state.merge({
				title: action.title
			})

		default:
		return state;
	}
}