import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { actionCreators } from './store';

import { Row, Col, message } from 'antd';
import './index.less';

import Axios from '../../axios/index.js';

class Header extends PureComponent {

	render(){

		const menuType = this.props.menuType;

		return (
			<div className="header">
				<Row className="header-top">

					{
						menuType?
							<Col span={6} className="second-header-logo">
								<i className="iconfont">&#xe600; </i>
								<span>ofo 单车后台管理系统</span>
							</Col>:''
					}

					<Col span={menuType?18:24}>
						<span>欢迎! {this.props.emp_name}</span>                     
						<a href="/#/" onClick={this.loginOutSubmit.bind(this)}>退出</a>
					</Col>
					
				</Row>

				{
					menuType?'':
					<Row className="breadcrumb">
						<Col span={4} className="breadcrumb-title">
							{this.props.title}
						</Col>
						<Col span={20} className="weather">
							<span className="date">{this.props.sysTime}</span>
							<span className="weather-detail">{this.props.city} {this.props.weather}</span>
						</Col>
					</Row>
				}
				
			</div>
		)
	};

	componentWillMount(){

		//每隔1秒调用一次changeTime
		setInterval(this.props.dynamicChangeTime, 1000);
		
		//调用获取天气方法
		this.props.getWeatherAPIData();
	};

	loginOutSubmit(){
		Axios.ajax_server({
			url: '/loginout',
			method: 'get'
		}).then((data)=>{
			if(data.code === 0){
				message.success('退出登录')
				this.props.loginOut()
			}
		})


	}

};



const mapStateToProps = (state) => ({

	emp_name: state.getIn(['login', 'emp_name']),
	sysTime: state.getIn(['header', 'sysTime']),
	city: state.getIn(['header', 'city']),
	weather: state.getIn(['header', 'weather']),

	title: state.getIn(['navleft', 'title'])
	
})

const mapDispatchToProps = (dispatch) => ({
	
	// 动态改变时间
	dynamicChangeTime(){
		dispatch(actionCreators.dynamicChangeTime());
	},
	
	// 调用天气api
	getWeatherAPIData(){
		dispatch(actionCreators.getWeatherAPIData())
	},
	//退出登录
	loginOut(){
		dispatch(actionCreators.loginOutAction())
	}

})

export default connect(mapStateToProps, mapDispatchToProps)(Header);