import { fromJS } from 'immutable';
import * as constants from './constants.js'

const defaultState = fromJS({
	city_name: '南京',
	total_bike: 0,
	res:{}
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.REQUEST_BIKE_LIST:
			return state.merge(fromJS({
				city_name: action.res.result.city_name,
				total_bike: action.res.result.total_bike,
				res: action.res
			}))

		default:
		return state;
	}
}