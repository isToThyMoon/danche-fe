function formateDate(time){
	
	function trans(obj) {
		if(obj < 10) {
			return '0' + obj;
		};
		return obj;
	};

	if(!time) {
		return '';
	};

	// let date = new Date(time);
	
	let date = time;

	let Years = trans(date.getFullYear());
	let Months = trans(date.getMonth() + 1);
	let Dates = trans(date.getDate());
	let Hours = trans(date.getHours());
	let Minutes = trans(date.getMinutes());
	let Seconds = trans(date.getSeconds());
	
	return Years + '-' + Months + '-' + Dates + ' ' + Hours + ':' + Minutes + ':' + Seconds;
};


function pagination(res, callback){
	
	let page = {
		onChange:(current)=>{
			callback(current)
		},
		current: res.result.page,
		pageSize:res.result.page_size,
		total: res.result.total_count,
		showTotal:() => {
			return `共${res.result.total_count}条`
		},
		showQuickJumper: true
	}
	return page;

}

export default { formateDate, pagination };