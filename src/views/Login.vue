<template>
    <div class="my-auto">
        <div class="centered my-auto">
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
            <div class="d-flex justify-content-center my-3">
                <v-btn class="mx-1" outlined large color="white" v-on:click="login()">Login</v-btn>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    date(){
        return{
            username: "",
            password: ""
        }
    },
    mounted(){

    },
    methods: {
        login(){
            if (this.username == "admin" && this.password == "pwd"){
                this.$store.commit("setAuthenticated")
                this.$router.push({name: "home"})
            }
        }
    }
}
</script>