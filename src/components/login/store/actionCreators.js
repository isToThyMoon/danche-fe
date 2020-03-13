import * as constants from './constants.js';
import Axios from '../../../axios/index.js';


const dispatchLoginSubmit = (validated,emp_name)=>({
	type: constants.LOGIN_SUBMIT,
	validated,
	emp_name
});


export const loginSubmitAction = (userInfo)=>{
	return (dispatch)=>{
		// let validated = false;
		Axios.ajax_server({
			url: '/login',
			method: 'post',
			data: {
				sys_user_name: userInfo.sys_user_name,
				password: userInfo.password
			}
		}).then((data)=>{
			if(data.code === 0){
				let validated = 1;
				dispatch(dispatchLoginSubmit(validated, data.emp_name))
			}
				
		}).catch(()=>{
			console.log('发送错误')
		})
		return true;
	}
}