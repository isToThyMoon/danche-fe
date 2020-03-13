import React, { PureComponent } from 'react';
import { Button, Form, Input, Cascader } from 'antd';

const FormItem = Form.Item;

class FilterForm extends PureComponent {

	render(){
		
		const { getFieldDecorator } = this.props.form;

		const residences = [
				{
				  value: 'jiangsu',
				  label: '江苏',
				  children: [{
				    value: 'nanjing',
				    label: '南京'
				  }],
				}, {
				  value: 'zhejiang',
				  label: '浙江',
				  children: [{
				    value: 'hangzhou',
				    label: '杭州'
				  }],
				}];

		return (
			<Form layout="inline">

				<FormItem label="城市">
		          {
		          	getFieldDecorator('city_name')(
		            	<Cascader options={residences} />
		          	)
		          }
		        </FormItem>

				<FormItem>or</FormItem>

				<FormItem label="车辆编号">
		          {
		          	getFieldDecorator('bike_number')(
		            	<Input />
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