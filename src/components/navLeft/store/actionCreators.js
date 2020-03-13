import * as constants from './constants.js';


export const changeTitle = (title) => ({
	type: constants.CHANGE_TITLE,
	title
});
