import React, { PureComponent, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { actionCreators } from './store';

import { Menu } from 'antd';
import './index.less';
import MenuConfig from './../../config/menuConfig.js';


 
const SubMenu = Menu.SubMenu;


class NavLeft extends PureComponent {
	
	render(){
		return (
			<Fragment>
				<div className="logo">
					<i className="iconfont">&#xe600;</i>
					
					<h1>ofo MS</h1>
				</div>
				<Menu theme="light">
					{ this.state.menuTreeNode }
				</Menu>
			</Fragment>
		)
	}

	componentWillMount(){
		const menuTreeNode = this.renderMenu(MenuConfig);
		this.setState({
			menuTreeNode
		})
	}

	// 递归方式 渲染左侧菜单
	renderMenu = (data) => {
		return data.map((item) => {
			if(item.children){
				return(
					<SubMenu title={item.title} key={item.key}>
						{this.renderMenu(item.children)}
					</SubMenu>
				)	
			}
			return(
				<Menu.Item title={item.title} key={item.key} onClick={()=>(this.props.changeTitle(item.title))}>
					<NavLink to={item.key}>{item.title}</NavLink>
				</Menu.Item>
			)
		})
	}


};


const mapStateToProps = (state) =>({

})


const mapDisPatchToProps = (dispatch)=>({
	
	changeTitle(title){
		dispatch(actionCreators.changeTitle(title))
	}
})


export default connect(mapStateToProps, mapDisPatchToProps)(NavLeft);