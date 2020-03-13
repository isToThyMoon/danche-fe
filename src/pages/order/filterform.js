import React, { PureComponent } from 'react';
import  { Button, Form, Select, DatePicker } from 'antd';

// 查询订单 的表单
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends PureComponent{
	
	//点击查询 处理订单查询
	handleFilterSubmit = ()=>{
		// console.log(this);
        let fieldsValue = this.props.form.getFieldsValue(['city_id']);
        console.log(fieldsValue)
    };

	render(){
		
		const { getFieldDecorator } = this.props.form;
		return (
			<Form layout="inline">

				<FormItem label="城市">
					{
						getFieldDecorator('city_id')(
							<Select palceholder="全部" style={{width:90}}>
								<Option value="1">江苏省</Option>
								<Option value="2">安徽省</Option>
								<Option value="3">浙江省</Option>
								<Option value="4">河北省</Option>
							</Select>
						)
					}
				</FormItem>

				<FormItem label="订单时间">
					{
						getFieldDecorator('start_time')(
							<DatePicker 
								showTime
								format="YYYY-MM-DD HH:mm"
      							placeholder="From"
							    // onChange={}
							    // onOk={}
							/>
						)
					}
				</FormItem>

				<FormItem>
					{
						getFieldDecorator('end_time')(
							<DatePicker 
								showTime
								format="YYYY-MM-DD HH:mm"
      							placeholder="To"
							    // onChange={}
							    // onOk={}
							/>
						)
					}
				</FormItem>

				<FormItem label="订单状态">
					{
						getFieldDecorator('status')(
							<Select palceholder="全部" style={{width:80}}>
								<Option value="">全部</Option>
								<Option value="1">进行中</Option>
								<Option value="2">结束行程</Option>
							</Select>
						)
					}
				</FormItem>

				<FormItem>
					<Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
					<Button>重置</Button>
				</FormItem>

			</Form>
		)
	};
};

FilterForm=Form.create({})(FilterForm);

export default FilterForm;