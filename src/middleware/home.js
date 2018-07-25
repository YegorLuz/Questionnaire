export const init = store => next => async action => {
	console.log('middleware triggered', action); //eslint-disable-line
	next(action);
};