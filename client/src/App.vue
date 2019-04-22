<template>
  <div id="app">
    <div id="nav">
      <b-navbar class="css-th" toggleable="lg" type="dark" variant="info">
        <router-link to="/">
          <b-navbar-brand href="/">R-Commerce</b-navbar-brand>
        </router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-show="!isLoggedIn" v-b-modal.modal-1>
              Login
            </b-nav-item>
            <dd-form-login @onSubmit="login" form-id="modal-1" />

            <b-nav-item v-show="!isLoggedIn" v-b-modal.modal-2>
              <strong>Register</strong>
            </b-nav-item>
            <dd-form-register @onSubmit="register" form-id="modal-2" />

            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button
                size="sm" class="my-2 my-sm-0" variant="light" type="submit">
                  <i class="fas fa-search"></i>
              </b-button>
            </b-nav-form>
            <router-link to="/cart">
              <b-nav-item href="/cart" v-if="isLoggedIn">
                <i class="fas fa-cart-arrow-down"></i>
              </b-nav-item>
            </router-link>
            <b-nav-item-dropdown v-if="isLoggedIn" right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content"><em>User</em></template>
              <!-- <b-dropdown-item >Profile</b-dropdown-item> -->
              <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Swal from 'sweetalert2';

import ddFormLogin from '@/components/FormLogin.vue';
import ddFormRegister from '@/components/FormRegister.vue';

const serverUrl = 'http://localhost:3000';

export default {
  name: 'App',
  components: {
    ddFormLogin,
    ddFormRegister,
  },
  created() {
    if (localStorage.token) {
      this.token = localStorage.token;
      this.isLoggedIn = true;
    }
  },
  data() {
    return {
      token: '',
      isLoggedIn: false,
    };
  },
  methods: {
    login(form) {
      axios
        .post(`${serverUrl}/login`, form)
        .then(({ data }) => {
          console.log(data);
          Swal.fire({
            position: 'center',
            type: 'success',
            title: data.message || 'Login Success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.token = data.token;
          this.isLoggedIn = true;
          localStorage.token = data.token;
        })
        .catch((err) => {
          // console.log(err);
          const errMsg = Number(err.message.slice(err.message.length - 3)) === 500 ? '500 - internal server error' : '400 - username / password incorrect';
          Swal.fire({
            position: 'center',
            type: 'error',
            title: errMsg,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    register(form) {
      axios
        .post(`${serverUrl}/register`, form)
        .then(({ data }) => {
          // console.log(data);
          Swal.fire({
            position: 'center',
            type: 'success',
            title: data.message || 'Registered',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          // console.log(err);
          const errMsg = Number(err.message.slice(err.message.length - 3)) === 500 ? '500 - internal server error' : undefined;
          Swal.fire({
            position: 'center',
            type: 'error',
            title: errMsg,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    logout() {
      this.token = '';
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'logout success',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>
