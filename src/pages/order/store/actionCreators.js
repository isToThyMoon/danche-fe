import * as constants from './constants.js';
import Axios from '../../../axios/index.js';

const dispatchRequestOrderList = (list) => ({
	type: constants.REQUEST_ORDER_LIST,
	list
});

export const requestOrderListAction = ()=>{
	return (dispatch)=>{
		Axios.ajax({
			url: '/order/list',
			params:{
			}
		}).then((res)=>{
				const list = res.result.item_List.map((item, index)=>{
					item.key = index;
					return item;
				})
				dispatch(dispatchRequestOrderList(list))
			})
	}
}