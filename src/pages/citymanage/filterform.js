import React, { PureComponent } from 'react';
import { Button, Form, Select, Cascader } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends PureComponent{

	render(){
		
		const { getFieldDecorator } = this.props.form;

		const residences = [
				{
				  value: '江苏',
				  label: '江苏',
				  children: [{
				    value: '南京',
				    label: '南京'
				  }],
				}, {
				  value: '浙江',
				  label: '浙江',
				  children: [{
				    value: '杭州',
				    label: '杭州'
				  }],
				}];

		return (
			<Form layout="inline">

				<Form.Item label="城市">
		          {
		          	getFieldDecorator('city_name')(
		            	<Cascader options={residences} />
		          	)
		          }
		        </Form.Item>

				<FormItem label="用车模式">
					{
						getFieldDecorator('mode')(
							<Select palceholder="全部" style={{width:130}}>
								<Option value="">全部</Option>
								<Option value="1">指定停车点模式</Option>
								<Option value="2">禁停区模式</Option>
							</Select>
						)
					}
				</FormItem>

				<FormItem label="营运模式">
					{
						getFieldDecorator('op_mode')(
							<Select palceholder="全部" style={{width:80}}>
								<Option value="">全部</Option>
								<Option value="1">自营</Option>
								<Option value="2">加盟</Option>
							</Select>
						)
					}
				</FormItem>

				<FormItem label="加盟商授权状态">
					{
						getFieldDecorator('auth_status')(
							<Select palceholder="全部" style={{width:90}}>
								<Option value="">全部</Option>
								<Option value="1">已授权</Option>
								<Option value="2">未授权</Option>
							</Select>
						)
					}
				</FormItem>

				<FormItem>
					<Button type="primary" style={{margin:'0 20px'}} onClick={()=>(this.filterSubmitForm())}>查询</Button>
					<Button>重置</Button>
				</FormItem>

			</Form>
		)
	};
	
	filterSubmitForm(){
		let submitInfo = this.props.form.getFieldsValue();
		this.props.filterSubmit(submitInfo);
	}

};

FilterForm=Form.create({})(FilterForm);

export default FilterForm;