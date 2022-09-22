import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
// import users from './modules/users';
import products from './modules/products';
import sourceUsers from '../data/users.json';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		products,
	},
	state: {
		users: [],
		products: [],
		currentUser: { username: 'kwame' },
		error: '',
	},
	getters: {
		getUsers(state) {
			return state.users;
		},

		getCurrentUser(state) {
			//  return window.localStorage.currentUser
			return state.currentUser;
		},
	},
	mutations: {
		setUsers(state, user) {
			state.users = user;
		},
		setCurrentUser(state, user) {
			state.currentUser = user;
			window.localStorage.currentUser = JSON.stringify(user);
		},
		login(state, user) {
			state.currentUser = user;
		},
		logout(state) {
			state.currentUser = {};
			window.localStorage.currentUser = JSON.stringify({});
		},
		error(state, data) {
			return (state.error = data);
		},
	},
	actions: {
		async fetchUsers({ commit }) {
			const response = await sourceUsers.users;
			// console.log(response);
			commit('setUsers', response.json());
		},
		logoutUser({ commit }) {
			commit('logout');
			router.replace({ name: 'Logout' });
		},

		async loginUser({ commit }, user) {
			try {
				let response = await sourceUsers.users;
				const data = await response.find(
					(el) => el.username === user.username && el.password === user.password
				);
				console.log(data);
				commit('setCurrentUser', data);
				router.replace({ name: 'Layout' });
				return data;
			} catch (error) {
				console.log(error.data.message || error.message);
				commit('error', error);
				return error;
			}
		},
	},
});
