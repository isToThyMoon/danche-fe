import * as constants from './constants.js';
import Axios from '../../../axios/index.js';


const dispatchRequestBikeList = (res)=>({
	type: constants.REQUEST_BIKE_LIST,
	res
})

export const requestBikeListAction = (params,renderMap) => {
	return (dispatch)=>{
		Axios.ajax({
            url:'/map/bike_list',
            params: params
        }).then((res)=>{
            if(res.code === 0){
                renderMap(res)
                dispatch(dispatchRequestBikeList(res))
            }
        })
	}
};