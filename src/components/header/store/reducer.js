import { fromJS } from 'immutable';
import * as constants from './constants.js'

const defaultState = fromJS({
	sysTime: '',
	city: '',
	weather: ''
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.DYNAMIC_CHANGE_TIME:
			return state.merge({
				sysTime: action.sysTime
			})
		case constants.GET_WEATHER:
			return state.merge({
				city: action.city,
				weather: action.weather
			})	
		default:
		return state;
	}
}