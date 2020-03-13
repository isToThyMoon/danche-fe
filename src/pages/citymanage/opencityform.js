import React, { PureComponent } from 'react';
import { Form, Input, Select, Cascader } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class OpenCityForm extends PureComponent{
	
	render(){

		const { getFieldDecorator } = this.props.form;
		
		const modalFormItemLayout = {
			labelCol:{
				span:5
			},
			wrapperCol:{
				span:19
			}
		};
		
		const residences = [
				{
				  value: '浙江',
				  label: '浙江',
				  children: [{
				    value: '杭州',
				    label: '杭州'
				  }],
				},{
				  value: '江苏',
				  label: '江苏',
				  children: [{
				    value: '南京',
				    label: '南京'
				  },{
				    value: '苏州',
				    label: '苏州'
				  }],
				},{
				  value: '安徽',
				  label: '安徽',
				  children: [{
				    value: '合肥',
				    label: '合肥'
				  }],
				}
			];

		return (
			<Form layout="horizontal">
				<FormItem label="选择城市" {...modalFormItemLayout}>
					{
			          	getFieldDecorator('city_name')(
			            	<Cascader options={residences} style={{ width: 200 }}/>
			          	)
		          	}
				</FormItem>

				<FormItem label="用车模式" {...modalFormItemLayout}>
					{
						getFieldDecorator('mode',{
							initialValue:'1'
						})(
							<Select style={{ width: 150 }}>
								<Option value="0">全部</Option>
								<Option value="1">指定停车点</Option>
								<Option value="2">禁停区</Option>
							</Select>
						)
					}
				</FormItem>

				<FormItem label="营运模式" {...modalFormItemLayout}>
					{
						getFieldDecorator('op_mode',{
							initialValue:'1'
						})(
							<Select style={{ width: 100 }}>
								<Option value="1">自营</Option>
								<Option value="2">加盟</Option>
							</Select>	
						)
					}
				</FormItem>

				<FormItem label="城市管理员" {...modalFormItemLayout}>
					{
						getFieldDecorator('city_admin',{
							initialValue:''
						})(
							<Input placeholder="请输入名称" style={{ width: 200 }}/>
						)
					}
				</FormItem>
				
				<FormItem label="城市管理员ID" {...modalFormItemLayout}>
					{
						getFieldDecorator('city_admin_id',{
							initialValue:''
						})(
							<Input placeholder="请输入id" style={{ width: 200 }}/>
						)
					}
				</FormItem>

			</Form>
		)
	}
};

OpenCityForm = Form.create({})(OpenCityForm);

export default OpenCityForm;