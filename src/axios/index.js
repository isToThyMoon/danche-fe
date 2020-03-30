import JsonP from 'jsonp';
import axios from './interceptor.js';
import { Modal } from 'antd';

class Axios {
	static jsonp(options) {
		return new Promise((resolve, reject)=>{
			JsonP(options.url,{
				param: 'callback'
			}, function(err, response) {
					if(response.status === '1'){
						resolve(response);
					}else{
						reject(response.message);
					}
			})
		})
	};

	static ajax_server(options){
		let loading;
		if (options.data && options.data.isShowLoading !== false){
			loading = document.querySelector('#ajaxLoading');
			loading.style.display ='block';
		}

		let baseApi ='http://api.summeres.top';
		//let baseApi ='http://127.0.0.1:5000';
		return new Promise((resolve, reject)=>{
			axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
			axios({
				url: options.url,
				method: options.method || 'get',
				baseURL: baseApi,
				timeout: 10000,
				params: options.params || '',  //是个无格式对象(plain object)或 URLSearchParams 对象
				//post请求是data
				data: options.data || '',
				withCredentials: true      // 暂时觉得是解决axios请求保持cookie的状态的设置
			})
			.then((response)=>{
				// console.log(response)
				if (options.data && options.data.isShowLoading !== false){
					loading =document.querySelector('#ajaxLoading');
					loading.style.display ='none';
				}
				if (response.status === 200){
					let res = response.data;
					resolve(res);
				}else{
					reject(response.data);
				}
				return true;
			})
		})

	}
	
	static ajax(options){
		let loading;
		if (options.data && options.data.isShowLoading !== false){
			loading = document.querySelector('#ajaxLoading');
			loading.style.display ='block';
		}

        // let baseApi ='https://www.easy-mock.com/mock/5c9e1f2d51af0e3f5b728cf8/dancheapi';
        let baseApi ='http://api.summeres.top';
		return new Promise((resolve, reject)=>{
			axios({
				url: options.url,
				method: options.method || 'get',
				baseURL: baseApi,
				timeout: 5000,
				params: options.params || '',  //是个无格式对象(plain object)或 URLSearchParams 对象
				//post请求是data
				data: options.data || ''
			})
			.then((response)=>{
				console.log('axios',response)
				if (options.data && options.data.isShowLoading !== false){
					loading =document.querySelector('#ajaxLoading');
					loading.style.display ='none';
                }
                //response.status === 200
                if (response.data.code === 0 ){
					let res = response.data;
					if (res.code === 0){
						resolve(res);
					}else{
						Modal.info({
							title: '暂无数据',
							content: res.msg
						})
					}
				}else{
					reject(response.data);
				}
			})
		})
	}

	

}


export default Axios;