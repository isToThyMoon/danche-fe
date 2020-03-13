import { fromJS } from 'immutable';
import * as constants from './constants.js'

const defaultState = fromJS({
	cityList: [],
	params: {
		page: 1
	},
	isShowOpenCityModal: false,
	filterResult: {},
});


export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.REQUEST_LIST:
			return state.merge(fromJS({
				cityList: action.cityList
			}));
		case constants.SHOW_OPEN_CITY_MODAL:
			return state.merge({
				isShowOpenCityModal: action.isShowOpenCityModal
			});
		case constants.FILTER_SUBMIT:
			return state.merge({
				cityList: action.filterResult
			});

		default:
		return state;
	}
}