import React, { PureComponent } from 'react';
import { Form, Input, Radio, DatePicker, Select } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

class CreateEmpForm extends PureComponent{

    getState = (state)=>{
        return {
            '1': '未婚',
            '2': '已婚'
        }[state]
    }

    render(){
        let type = this.props.type;

        let userInfo = this.props.userInfo || {};

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }

        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type === 'detail'?userInfo.emp_name:
                        getFieldDecorator('emp_name',{
                            initialValue:userInfo.emp_name
                        })(
                            <Input type="text" placeholder="请输入用户名"/> 
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.sex === 1?'男':'女' :
                        getFieldDecorator('sex',{
                            initialValue: userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type === 'detail' ? this.getState(userInfo.state) :
                        getFieldDecorator('state',{
                            initialValue: userInfo.state
                        })(
                            <Select>
                                <Option value={1}>未婚</Option>
                                <Option value={2}>已婚</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.birthday :
                        getFieldDecorator('birthday',{
                            initialValue: moment(userInfo.birthday)
                        })(
                            <DatePicker /> 
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.address :
                        getFieldDecorator('address',{
                            initialValue: userInfo.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系地址"/>
                        )
                    }
                </FormItem>
            </Form> 
        );
    }
}

CreateEmpForm = Form.create({})(CreateEmpForm);

export default CreateEmpForm;