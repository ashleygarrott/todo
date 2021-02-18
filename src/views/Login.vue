<template>
    <div class="my-5">
        <br>
        <div class="centered-screen my-auto" >
            <div class="d-flex justify-content-center mb-2">
                <label style="font-size:20px;color:white">Login</label>
            </div>
            <div class="d-flex justify-content-center mb-2">
                <div class="my-auto">
                    <p class="my-2">Username: </p>
                    <p class="my-2">Password: </p>
                </div>
                <div>
                    <input type="username" class="form-control ml-2" id="exampleInputEmail1" aria-describedby="username" placeholder="username" v-model="username">
                    <input type="password" class="form-control ml-2" id="exampleInputEmail1" aria-describedby="password" placeholder="password" v-model="password">
                </div>
            </div>
            <div>
                <p style="color:red">{{message}}</p>
            </div>
            <div class="d-flex justify-content-center my-3">
                <v-btn class="mx-1" outlined large color="white" v-on:click="login()">Login</v-btn>

            </div>

            <div class="d-flex justify-content-center fixed-bottom my-5">
                <div>
                    No account? Sign up
                    <router-link :to="{ name: 'signup'}">
                    <v-btn class="mx-1" outlined large color="white" v-on:click="goToSignup()">Signup</v-btn>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
    name: "Login",
    date(){
        return{
            username: "",
            password: "",
            message: "",
            windowHeight: 0,
            windowWidth: 0
        }
    },
    mounted(){
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth
        window.console.log(this.windowHeight)
        window.console.log(this.windowWidth)
    },
    methods: {
        login(){
            firebase.auth().signInWithEmailAndPassword(this.username, this.password)
                .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                this.$router.push({name: "home"})
                this.$store.commit("setAuthenticated")
                window.console.log("logged in")

                // ...
                })
                .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.message = "Incorrect username and password combination"
                });

        },
    }
}
</script>

<style scoped>
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>