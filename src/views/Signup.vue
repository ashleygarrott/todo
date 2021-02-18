<template>
    <div class="my-auto">
        <div class="centered my-auto">
            <div class="d-flex justify-content-center mb-2">
                <label style="font-size:20px;color:white">Create a new account</label>
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
                <v-btn class="mx-1" outlined large color="white" v-on:click="signup()">Signup</v-btn>
            </div>

        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
    name: "Signup",
    data(){
        return{ 
            username: "",
            password: ""
        }
    },
    mounted(){

    },
    methods: {
        signup(){
            firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                this.message = "account created"
                this.$router.push({name: "login"})
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.message = "failed to create account"
                // ..
            });
        }
    }
}
</script>