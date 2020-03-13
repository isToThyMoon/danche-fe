import { fromJS } from 'immutable';
import * as constants from './constants.js';
import * as loginConstants from '../../header/store/constants.js';

const defaultState = fromJS({
	validated: 0,
	emp_name: '管理员'
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.LOGIN_SUBMIT:
			return state.merge(fromJS({
				validated: action.validated,
				emp_name: action.emp_name
			}))

		case loginConstants.LOGIN_OUT:
			return state.merge(fromJS({
				validated: action.validated,
				emp_name: '。。'
			}))	
		default:
		return state;
	}
}