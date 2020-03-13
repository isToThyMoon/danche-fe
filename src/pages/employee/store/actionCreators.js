import * as constants from './constants.js';
import Axios from '../../../axios/index.js';


const dispatchRequestEmpList = (list) => ({
	type: constants.REQUEST_EMP_LIST,
	list
});


export const requestEmpListAction = () => {
	return (dispatch)=>{
		Axios.ajax({
            url: '/emp/list',
        }).then((res)=>{
        	let list = res.result.item_List.map((item, index)=>{
                        item.key = index;
                        return item;
                    });
			dispatch(dispatchRequestEmpList(list))
        })
	}
}