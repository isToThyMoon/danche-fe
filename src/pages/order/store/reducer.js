import { fromJS } from 'immutable';
import * as constants from './constants.js'

const defaultState = fromJS({
	list: [],
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.REQUEST_ORDER_LIST:
			return state.merge(fromJS({
				list: action.list
			}))

		default:
		return state;
	}
}