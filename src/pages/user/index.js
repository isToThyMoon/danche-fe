import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Modal, Table} from 'antd';
import Axios from './../../axios';
// import Utils from '/../../utils/utils';

import { connect } from 'react-redux';
import { actionCreators } from './store';

import CreateEmpForm from './createempform.js';
import FilterForm from './filterform.js';


class User extends PureComponent{
    
    state = {
        type: '',
        isVisible:false,
        title: '',
        userInfo: {},
        selectedkeys: [],
        selectedRows: []
    }


    render(){

        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },{
                title: '用户名',
                dataIndex: 'user_name'
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex === 1?'男':'女'
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    return {
                        '1':'已婚',
                        '2':'未婚'
                        
                    }[state]
                }
            }, {
                title: '生日',
                dataIndex: 'birthday'
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }
        ];

        const rowSelection = {
            type: 'checkbox',
            selectedRowKeys: this.state.selectedkeys,
            onChange: (selectedRowKeys, selectedRows)=>{
                console.log(selectedRowKeys, selectedRows)
                this.setState({
                    selectedkeys: selectedRowKeys,
                    selectedRows: selectedRows
                })
            }
        };

        const paginationSet = {
            pageSize: 15,
        };

        let footer = {};

        if(this.state.type === 'detail'){
            footer = {
                footer: null
            }
        };

        return (
            <Fragment>

                {/*button部分*/}
                <Card style={{ marginTop: 10 }} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={()=>this.hanleOperate('create')}>创建用户</Button>
                    <Button type="primary" icon="delete" onClick={() => this.hanleOperate('delete')}>删除用户</Button>
                    <Button type="primary" icon="edit" style={{float:'right'}} onClick={() => this.hanleOperate('edit')}>编辑用户</Button>
                    <Button type="primary" icon="team" style={{float:'right'}} onClick={() => this.hanleOperate('detail')}>用户详情</Button>
                </Card>

                {/*查询UI部分*/}
                <Card>
                    <FilterForm fiterSubmit={this.filterSubmit.bind(this)}/>
                </Card>
                
                {/*表格数据展示部分*/}
                <div className="table-content-wrap">
                    <Table
                        columns={columns}
                        rowSelection={rowSelection}
                        dataSource={this.props.list}
                        pagination={paginationSet}
                    />
                </div>
                
                {/*弹框部分*/}
                <Modal
                    title={this.state.title}
                    width={600}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.createEmpForm.props.form.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                    
                    { ...footer }
                >
                    <CreateEmpForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>{this.createEmpForm = inst;}}/>
                </Modal>
            </Fragment>
        );
    }



    componentDidMount(){
        this.props.requestUserList();
    }

    //查询
    filterSubmit = (submitInfo)=>{
        this.props.requestUserSingle();
    }


    // 功能区Button操作
    hanleOperate = (type)=>{
        let item =  this.state.selectedRows[0];
        if(type === 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建用户'
            })
        }else if(type === 'edit'){
            if (!item){
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑用户',
                userInfo:item
            })
        }else if(type === 'detail'){
            if (!item){
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '用户详情',
                userInfo: item
            })
        }else{
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'是否要删除当前选中的用户',
                onOk(){
                    Axios.ajax({
                        url:'/emp/delete',
                        params:{
                            id:item.id
                        }
                    }).then((res)=>{
                        if(res.code === 0){
                            _this.setState({
                                isVisible:false
                            })
                            // _this.requestList();
                        }
                    })
                }
            })
        }
    }

    // 创建用户提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.createEmpForm.props.form.getFieldsValue();
        Axios.ajax({
            url:type ==='create'?'/user/add':'/user/edit',
            params: data
        }).then((res)=>{
            if(res.code === 0){
                this.createEmpForm.props.form.resetFields();
                this.setState({
                    isVisible:false
                })
                // this.requestList();
            }
        })
    };


};


const mapStateToProps = (state)=>({
    list: state.getIn(['user', 'list']).toJS(),
});

const mapDispatchToProps = (dispatch)=>({
    //请求用户列表信息
    requestUserList(){
        dispatch(actionCreators.requestUserListAction())
    },
    //查询单个用户
    requestEmpSingle(){
        dispatch(actionCreators.requestUserSingleAction())
    }

})


export default connect(mapStateToProps, mapDispatchToProps)(User);