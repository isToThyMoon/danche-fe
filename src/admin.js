import React from 'react';
import { Component, Fragment } from 'react';
import { Row, Col } from 'antd';

import './style/common.less';

import Header from './components/header';
import Footer from './components/footer';
import NavLeft from './components/navLeft';


class Admin extends Component {

	render(){
		return (
			<Fragment>
				<Row className="container">
					<Col span = {3} className="nav-left">
						<NavLeft />
					</Col>
					<Col span = {21} className="main">
						<Header />
						<Row className="content">
							{ this.props.children }
						</Row>
						<Footer />
					</Col>
				</Row>
			</Fragment>
		);
	}
}



export default Admin;