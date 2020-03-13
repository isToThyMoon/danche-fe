import React,{  PureComponent } from 'react';
import { Row, Card, Form, Input, Button, message, Icon, Checkbox } from 'antd';

import { Link } from 'react-router-dom';


import { connect } from 'react-redux';
import { actionCreators } from './store/index.js';

import './signpage.less';


const FormItem = Form.Item;

class Login extends PureComponent {

    render(){

        const { getFieldDecorator } = this.props.form;
        
        return (
            <div className='SignFlowHomepage'>
                <Row type="flex" justify="center" align="middle">
                    <Card title="ofo共享单车管理系统" style={{width: 400, marginTop: 90}} headStyle={{textAlign: 'center', fontSize: 20, color: '#0084FF'}}>
                        <Form>

                            <FormItem>
                                {
                                    getFieldDecorator('sys_user_name',{
                                        initialValue:'',
                                        rules:[
                                            {
                                                required:true,
                                                message:'用户名不能为空'
                                            },
                                            {
                                                min:5,
                                                max:10,
                                                message:'长度不在范围内, 5到10字符'
                                            },
                                            {
                                                pattern:new RegExp('^\\w+$','g'),
                                                message:'用户名必须为字母或者数字'
                                            }
                                        ]
                                    })(
                                        <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password', {
                                        initialValue: '',
                                        rules: []
                                    })(
                                        <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('remember', {
                                        valuePropName:'checked',
                                        initialValue: true
                                    })(
                                        <Checkbox>记住密码</Checkbox>
                                    )
                                }
                                <a href="#/" style={{float:'right'}}>忘记密码</a>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" block onClick={this.handleSubmit.bind(this)}>登录</Button>
                                <div>没有账号？请<Link to="/register">注册</Link></div>
                            </FormItem>
                        </Form>
                    </Card>
                </Row>
            </div>
        );
    };
    
    componentDidUpdate(){
        if (this.props.validated === 1){
            this.props.history.push('/admin/home')
        }
    }

    // 登录按钮 前端验证登录信息后发送
    handleSubmit(){
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err,values)=>{
            if (!err){
                message.success(`Hello!, ${userInfo.sys_user_name}`)
                this.props.loginSubmit(userInfo)
            }
        })
    };

    


};
    
    

// map to props
const mapStateToProps = (state) => ({
    validated: state.getIn(['login', 'validated'])
})

const mapDispatchToProps = (dispatch) => ({
    //登录提交
    loginSubmit(userInfo){
        dispatch(actionCreators.loginSubmitAction(userInfo))
    }
});




Login = Form.create()(Login);

export default connect(mapStateToProps, mapDispatchToProps)(Login);