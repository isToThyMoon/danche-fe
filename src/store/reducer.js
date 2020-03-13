import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../components/header/store';
import { reducer as navleftReducer } from '../components/navLeft/store';
import { reducer as cityManageReducer } from '../pages/citymanage/store';
import { reducer as loginReducer } from '../components/login/store';
import { reducer as bikeMapReducer } from '../pages/bikemap/store';
import { reducer as employeeReducer } from '../pages/employee/store';
import { reducer as userReducer } from '../pages/user/store';
import { reducer as orderReducer } from '../pages/order/store';

const reducer = combineReducers({
	login: loginReducer,
	header: headerReducer,
	navleft: navleftReducer,
	citymanage: cityManageReducer,
	bikemap: bikeMapReducer,
	employee: employeeReducer,
	user: userReducer,
	order: orderReducer
})

export default reducer;