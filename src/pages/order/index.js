import React, { PureComponent, Fragment } from 'react';
import  { Card, Button, Table, Form, Modal, message } from 'antd';
import Axios from '../../axios/index.js';

import { connect } from 'react-redux';
import { actionCreators } from './store';

import FilterForm from './filterform.js';



const FormItem = Form.Item;

class Order extends PureComponent{

	render(){
		const columns = [
			{
				title:'订单编号',
				dataIndex:'order_sn'
			},{
				title:'车辆编号',
				dataIndex:'bike_sn'
			},{
				title:'用户名',
				dataIndex:'user_name'
			},{
				title:'手机号',
				dataIndex:'mobile'
			},{
				title:'里程',
				dataIndex:'distance'
			},{
				title:'行驶时长',
				dataIndex:'total_time'
			},{
				title:'状态',
				dataIndex:'status'
			},{
				title:'开始时间',
				dataIndex:'start_time'
			},{
				title:'结束时间',
				dataIndex:'end_time'
			},{
				title:'订单金额',
				dataIndex:'total_fee'
			},{
				title:'实付金额',
				dataIndex:'user_pay'
			},

		];
		
		const formItemLayout = {
			labelCol: {span:5},
			wrapperCol: {span:19}
		}
		
		const rowSelection = {
			type: 'radio',
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows)=>{
				this.setState({
					selectedRowKeys: selectedRowKeys,
					selectedRows: selectedRows
				})
			}
		};

		const paginationSet = {
            pageSize: 15,
        };

		return (
			<Fragment>
				<Card>
					<Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
					<Button onClick={this.handleConfirm} style={{margin:'0 20px'}}>结束订单</Button>
				</Card>

				<Card>
					<FilterForm />
				</Card>

				<div className="table-content-wrap">
					<Table
						columns={columns}
						rowSelection={rowSelection}
						dataSource={this.props.list}
						pagination={paginationSet}

					/>
				</div>

				<Modal
					title="结束订单"
					width={600}
					visible={this.state.orderConfirmVisible}
					onCancel={()=>{
						this.setState({
							orderConfirmVisible: false
						})
					}}
					onOk={this.handleFinishOrder}
				>
					<Form layout="horizontal">
						<FormItem label="车辆编号" {...formItemLayout}>{this.state.orderInfo.bike_sn}</FormItem>
						<FormItem label="行程开始时间" {...formItemLayout}>{this.state.orderInfo.start_time}</FormItem>
						<FormItem label="当前位置" {...formItemLayout}>{this.state.orderInfo.location}</FormItem>
					</Form>
				</Modal>
			</Fragment>
		);

	};


	state = {
		orderConfirmVisible: false,
		orderInfo: {},
		selectedRowKeys: [],
		selectedRows: []
	};

	//首次渲染
	componentDidMount(){
		this.props.requestOrderList()
	};

	//点击订单详情按钮 进入到订单详情页
	openOrderDetail = ()=>{
		let item = this.state.selectedRowKeys;
		if(!item){
			Modal.info({
				title:'信息',
				content:'请先选择一条订单'
			})
			return
		}

		window.open(`/#/common/order/detail/${item}`, '_blank')
	}	
	
	//点击结束订单按钮 显隐结束订单的modal 请求当前车辆信息
	handleConfirm = ()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        Axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code === 0 ){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble: true
                })
            }
        })
    };
	
	//确定结束订单
	handleFinishOrder = ()=>{
		let item = this.state.selectedItem;
        Axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
	};

};

const mapStateToProps = (state)=>({
	list: state.getIn(['order', 'list']).toJS()
});

const mapDispatchToProps = (dispatch)=>({
	//请求订单表格数据
	requestOrderList(){
		dispatch(actionCreators.requestOrderListAction())
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(Order);