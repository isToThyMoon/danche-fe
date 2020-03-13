import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/index.js';


import { GlobalIconfont } from './static/iconfont/iconfont.js';


import Login from './components/login/login.js';
import Register from './components/login/register.js';
import Admin from './admin.js';
import Common from './common.js';
import Home from './pages/home/index.js';
import Nomatch from './pages/nomatch/index.js';

import City from './pages/citymanage/index.js';
import OpenCityForm from './pages/citymanage/opencityform.js';

import Order from './pages/order/index.js';
import OrderDetail from './pages/order/detail.js';

import User from './pages/user/index.js';

import Employee from './pages/employee/index.js';

import BikeMap from './pages/bikemap/bikemap.js';

import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'


class IRouter extends Component {
	
	render() {
		return (
			<Fragment>
				<GlobalIconfont />
				<Provider store={store}>
					<HashRouter>
						<Fragment>
							<Route path="/" exact component={Login} />
							<Route path="/register" exact component={Register} />
							<Route path="/common" render={()=>(
									<Common>
										<Route path="/common/order/detail/:orderId" component={OrderDetail} />
									</Common>
								)}
							/>
							<Route path="/admin" 
								render={()=>(
									<Admin>
										<Switch>
											<Route path="/admin/home" component={Home} />
											<Route path="/admin/city" component={City} />
											<Route path="/admin/open_city" component={OpenCityForm} />
											<Route path="/admin/order" component={Order} />
											<Route path="/admin/user" component={User} />
											<Route path="/admin/employee" component={Employee} />
											<Route path="/admin/bikemap" component={BikeMap} />
											<Route path="/admin/charts/bar" component={Bar} />
                                    		<Route path="/admin/charts/pie" component={Pie} />
                                    		<Route path="/admin/charts/line" component={Line} />
											<Route component={Nomatch} />
										</Switch>
									</Admin>
								)}
							/>
						</Fragment>					
					</HashRouter>
				</Provider>
				
			</Fragment>
			
		);
	}
}


export default IRouter;