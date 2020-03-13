import React, { PureComponent } from 'react';
import { Button, Form, Input } from 'antd';

const FormItem = Form.Item;

class FilterForm extends PureComponent{

	render(){
		
		const { getFieldDecorator } = this.props.form;

		return (
			<Form layout="inline">

				<FormItem label="员工ID编号">
		          {
		          	getFieldDecorator('id')(
		            	<Input />
		          	)
		          }
		        </FormItem>
				<FormItem>or</FormItem>
				<FormItem label="员工姓名">
					{
						getFieldDecorator('emp_name')(
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