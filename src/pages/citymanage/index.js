import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';

import { connect } from 'react-redux';
import { actionCreators } from './store';


import FilterForm from './filterform.js';
import OpenCityForm from './opencityform.js';

import Axios from '../../axios/index.js';
import Utils from '../../utils/utils.js';



class City extends PureComponent {

	render(){
		
		const columns =[
			{
				title: '城市ID',
				dataIndex: 'id'
			},{
				title: '城市名称',
				dataIndex: 'city_name'
			},{
				title: '用车模式',
				dataIndex: 'mode',
				render(mode){
					return mode === 1 ? '指定停车点':'禁停区';
				}
			},{
				title: '营运模式',
				dataIndex: 'op_mode',
				render(op_mode){
					return op_mode === 1 ? '自营':'加盟';
				}
			},{
				title: '加盟授权状态',
				dataIndex: 'auth_status',
				render(auth_status){
					return auth_status === 1 ? '未通过':'通过验证';
				}
			},{
				title: '城市管理员',
				dataIndex: 'city_admin',
				// render(city_admins){
					// return city_admins.map((item)=>{
					// 	return item.user_name;
					// }).join(",");
				// }
			},{
				title: '管理员ID',
				dataIndex: 'city_admin_id'
			},{
				title: '城市开通时间',
				dataIndex: 'open_time'
			},{
				title: '操作时间',
				dataIndex: 'update_time',
				render:(update_time)=>{
					let time = new Date(update_time);
					return Utils.formateDate(time)
				}
			}
		];

		const paginationSet = {
			pageSize: 15,

		}

		const { cityList, isShowOpenCityModal, 
				showOpenCityModal, filterSubmit } = this.props;

		return (
			<Fragment>
				<Card style={{marginBottom:10}}>
					<Button type="primary" onClick={()=>(showOpenCityModal(isShowOpenCityModal))}>开通城市</Button>
				</Card>

				<Card>
					<FilterForm filterSubmit={filterSubmit.bind(this)} />
				</Card>

				<div className="table-content-wrap">
					<Table 
						columns={columns}
						dataSource={cityList}
						pagination={paginationSet}
					/>
				</div>

				<Modal
					title="开通城市"
					visible={isShowOpenCityModal}
					onCancel={()=>(showOpenCityModal(isShowOpenCityModal))}
					onOk={this.openCitySubmit.bind(this)}
				>
					<OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst}}/>
				</Modal>
			</Fragment>
		)
	};

	componentDidMount(){
		this.props.requestList(this.props.params);
	};

	//城市开通提交
	openCitySubmit(){
		let cityInfo = this.cityForm.props.form.getFieldsValue();
		cityInfo.open_time = Utils.formateDate(new Date());
		cityInfo.city_name = cityInfo.city_name[1];
		console.log(cityInfo)
		Axios.ajax_server({
			url:'/city/open',
			method: 'post',
			data:cityInfo
		}).then((res)=>{
			if(res.code === 0){
				message.success(`${res.message}`);
				this.props.showOpenCityModal(this.props.isShowOpenCityModal);
			}
		})
	}

};


// map to props
const mapStateToProps = (state) => ({
	cityList: state.getIn(['citymanage', 'cityList']).toJS(),
	params: state.getIn(['citymanage', 'params']).toJS(),
	isShowOpenCityModal: state.getIn(['citymanage', 'isShowOpenCityModal']),
})

const mapDispatchToProps = (dispatch) => ({
	
	//请求城市数据列表
	requestList(params){
		dispatch(actionCreators.requestListAction(params))
	},
	
	//显示或关闭开通城市的modal
	showOpenCityModal(show){
		if(show){
			show = false;
		}else{
			show = true;
		}
		dispatch(actionCreators.showOpenCityModalAction(show))
	},

	// 查询city
	filterSubmit(submitInfo){
		dispatch(actionCreators.filterSubmitAction(submitInfo))
	},
	

});


export default connect(mapStateToProps, mapDispatchToProps)(City);