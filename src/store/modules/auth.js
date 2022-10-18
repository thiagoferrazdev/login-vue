import axios from "axios";

const state = {
  user: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
};

const actions = {
  async LogIn({commit}, user) {

    
    let config = {
      method: 'post',
      url: 'http://localhost:3000/api_v1/auth/login',
      headers: { 
        'Content-Type': 'application/json', 
        'Cookie': 'Authentication=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2NjYwNDAxODEsImV4cCI6MTY2NjA0MTk4MX0.VBcUSudB57E_if3zSvlMzxqUxIoSGRjBdmElzANcbPg; Refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2NjYwNDAxODEsImV4cCI6MTY2NjEyNjU4MX0.0euUy0hzCfl-n9X7M4QDaksRMuyEsUhE8MCFjzygpgk'
      },
      data : user
    };
    
    const {data}  =  await axios(config);
    const obj =  {...data}
    if(obj.data.accessToken)

      await commit("setUser", user.username);
  },

  

  async LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },
};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },

  logout(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};