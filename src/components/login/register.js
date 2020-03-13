import React, { PureComponent } from 'react';

import {Card, Form, Row, Button, Input, Radio, Select, DatePicker, message } from 'antd';
import './signpage.less';

import moment from 'moment';
import Axios from '../../axios/index.js';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;


class Register extends PureComponent {

    render(){

        const { getFieldDecorator } = this.props.form;
        
        //定义表单中formitem的样式 标签和内容各占多大的栅格
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:6
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }

        //定义表单中最后注册按钮的formitem的样式 栅格大小和偏移量
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:6
                }
            }
        }
        
        return (
            <div className='SignFlowHomepage'>
                <Row type="flex" justify="center" align="middle">
                    <Card title="注册" style={{width: 700, marginTop: 90}}>
                        <Form layout="horizontal">

                            <FormItem label="登录名" {...formItemLayout}>
                                {
                                    getFieldDecorator('sys_user_name', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '登录名不能为空'
                                            }
                                        ]
                                    })(
                                        <Input placeholder="请输入登陆名" />
                                    )
                                }
                            </FormItem>

                            <FormItem label="密码" {...formItemLayout}>
                                {
                                    getFieldDecorator('password', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '密码不能为空'
                                            }
                                        ]
                                    })(
                                        <Input type="password" placeholder="请输入密码" />
                                    )
                                }
                            </FormItem>

                            <FormItem label="用户名" {...formItemLayout}>
                                {
                                    getFieldDecorator('cadmin_name', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '用户名不能为空'
                                            }
                                        ]
                                    })(
                                        <Input placeholder="请输入用户名" />
                                    )
                                }
                            </FormItem>

                            <FormItem label="手机号码" {...formItemLayout}>
                                {
                                    getFieldDecorator('phone_number', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '手机号不能为空'
                                            }
                                        ]
                                    })(
                                        <Input placeholder="请输入手机号码" />
                                    )
                                }
                            </FormItem>

                            <FormItem label="性别" {...formItemLayout}>
                                {
                                    getFieldDecorator('sex', {
                                        initialValue: '1'
                                    })(
                                        <RadioGroup>
                                            <Radio value="1">男</Radio>
                                            <Radio value="2">女</Radio>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>

                            <FormItem label="当前状态" {...formItemLayout}>
                                {
                                    getFieldDecorator('state', {
                                        initialValue: '1'
                                    })(
                                        <Select>
                                            <Option value="1">未婚</Option>
                                            <Option value="2">已婚</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>

                            <FormItem label="生日" {...formItemLayout}>
                                {
                                    getFieldDecorator('birthday')(
                                        <DatePicker
                                        />
                                    )
                                }
                            </FormItem>

                            <FormItem label="联系地址" {...formItemLayout}>
                                {
                                    getFieldDecorator('address',{
                                        initialValue:'南京市'
                                    })(
                                        <TextArea
                                            autosize={{
                                                minRows: 4, maxRows: 6
                                            }}
                                        />
                                    )
                                }
                            </FormItem>

                            <FormItem {...offsetLayout}>
                                <Button type="primary" onClick={this.handleSubmit} style={{float:'right'}}>注册</Button>
                            </FormItem>

                        </Form>
                    </Card>
                </Row>
            </div>
        );
    
    };
    
    // 注册提交 发送后台
    handleSubmit= ()=>{
        let userInfo = this.props.form.getFieldsValue();
        userInfo.birthday = moment(userInfo.birthday).format('YYYY-MM-DD')
        Axios.ajax_server({
          method: 'post',
          url: '/register',
          data: userInfo
        }).then((data)=>{
            if (data.code === 0){
                message.success('注册成功!')
                this.props.history.push('/')
            }
        })


    }
};

Register = Form.create()(Register);


export default Register;