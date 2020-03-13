import * as constants from './constants.js';
import Axios from '../../../axios/index.js';
import Utils from '../../../utils/utils.js';

const dispatchGetWeatherAPIData = (city, weather)=>({
	type: constants.GET_WEATHER,
	city,
	weather
})


export const dispatchChangeTime = (sysTime)=>({
	type: constants.DYNAMIC_CHANGE_TIME,
	sysTime,
});


export const dynamicChangeTime = ()=>{
	return (dispatch)=>{
		// let sysTime = Util.formateDate(new Date().getTime());
		let sysTime = Utils.formateDate(new Date());
		dispatch(dispatchChangeTime(sysTime))
	}
}



export const getWeatherAPIData = (id)=>{
	return (dispatch) => {
		let city = '320100'
		Axios.jsonp({
			url: 'https://restapi.amap.com/v3/weather/weatherInfo?city='+city+'&key=92ee3c690579ad7a925abd10427d73db'
		}).then((res) => {
			if(res.status === '1'){
				let data = res.lives[0];
				dispatch(dispatchGetWeatherAPIData(data.city, data.weather))
				// this.setState({
				// 	city: data.city,
				// 	weather: data.weather
				// });
			}
		})

	}
}

export const loginOutAction = ()=>({
	type: constants.LOGIN_OUT,
	validated: 0
});

