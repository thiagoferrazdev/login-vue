<template>
   <v-app >
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                     <form ref="form" @submit.prevent="login()">
                     <v-alert
                                 dense
                                 outlined
                                 type="error"
                                 v-if="networkError">Error establishing connection</v-alert>

                            <v-text-field
                              name="username"
                              label="Username"
                              type="text"
                              placeholder="username"
                              required
                              v-model.trim="$v.username.$model"
                           ></v-text-field>
                           
                            <v-alert
                                 dense
                                 outlined
                                 type="error"
                                 v-if="!$v.username.required">Field is required</v-alert>

                            <v-alert
                                 dense
                                 outlined
                                 type="error" v-if="!$v.username.email">Field email is invalid</v-alert>

                            <v-text-field
                             v-model="$v.password.$model" 
                              name="password"
                              label="Password"
                              type="password"
                              placeholder="password"
                              required
                           ></v-text-field>
                              <v-alert
                                 dense
                                 outlined
                                 type="error" v-if="!$v.password.required">Field is required</v-alert>
                              <v-alert
                                 dense
                                 outlined
                                 type="error" v-if="!$v.password.minLength">Name must have at least {{$v.password.$params.minLength.min}} letters.</v-alert>

                      
                           <v-btn type="submit" class="mt-4" color="primary" value="log in" :disabled="$v.$anyError">{{stateObj.login.name}}</v-btn>

                           <div class="grey--text mt-4">
                              <v-progress-circular v-if="submitStatus"
                                 indeterminate
                                 color="primary"
                              ></v-progress-circular>
                           </div>
                      </form>
                     </v-card-text>
                  </v-card>
                
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>

import { mapActions } from "vuex";
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';

export default {
  name: "App",
  data() {
    return {
      username: "",
      password: "",
      submitStatus: false,
      networkError: false,
      stateObj: {
         login : {
            name: 'Login'
         }
      }
    };
  },
   validations: {
    username: {
      required,
      email
    },
    password: {
      required,
       minLength: minLength(4),
       maxLength: maxLength(15)
    }
  },
  methods: {
     ...mapActions(["LogIn"]),
    async login() {
      
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = false
      } else {
         const { username, password } = this;
         const user = { username, password };
         try{
            await this.LogIn(user);
         }catch (e) {
            this.networkError = true;
            console.log(e.message);
         }
                 
         this.submitStatus = true
         setTimeout(() => {
            this.submitStatus = false;
         }, 500)
      }

      this.$router.replace({ name: "dashboard" });
    },
  },
  computed: {
       toggleMessage : function() { 
          return  this.stateObj.login.message
       } 
    }
};
</script>