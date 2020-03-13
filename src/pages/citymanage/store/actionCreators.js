import * as constants from './constants.js';
import Axios from '../../../axios/index.js';

//派发city列表
const requestListDispatch = (cityList)=>({
	type: constants.REQUEST_LIST,
	cityList,
})

// 派发查询到的city数据列表
// const filterSubmitResultDispatch = (filterResult)=>({
// 	type: constants.FILTER_SUBMIT,
// 	filterResult
// })


// 派发显示open city modal
export const showOpenCityModalAction = (show)=>({
	type: constants.SHOW_OPEN_CITY_MODAL,
	isShowOpenCityModal: show
})


// 请求城市列表 虚拟数据
export const requestListAction = (params)=>{
	return (dispatch)=>{
		Axios.ajax({
			url: '/opened_city',
			params:params,
		}).then((res)=>{
				const list = res.result.item_List.map((item, index)=>{
							item.key = index;
							return item;
						});
				dispatch(requestListDispatch(list))
			})
	}
}

// 请求查询city数据
export const filterSubmitAction = (submitInfo) => {
	return (dispatch)=>{
		console.log(submitInfo)
		Axios.ajax_server({
			url: '/city/filter',
			method: 'post',
			data:submitInfo
		}).then((res)=>{
				const list = res.result.item_List.map((item, index)=>{
							item.key = index;
							return item;
						});
				dispatch(requestListDispatch(list))
			})
	}
};
