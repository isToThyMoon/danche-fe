import * as constants from './constants.js';
import Axios from '../../../axios/index.js';


const dispatchRequestUserList = (list) => ({
	type: constants.REQUEST_USER_LIST,
	list
});


export const requestUserListAction = () => {
	return (dispatch)=>{
		Axios.ajax({
            url: '/user/list',
        }).then((res)=>{
        	let list = res.result.item_List.map((item, index)=>{
                        item.key = index;
                        return item;
                    });
			dispatch(dispatchRequestUserList(list))
        })
	}
}