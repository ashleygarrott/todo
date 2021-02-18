<template>
  <v-app id="inspire" style="background-color: #449182">

    <v-main>
      <label v-if="this.finishedTasks.length != 1" style="position:absolute;right:60px;">{{this.tasks.length - this.finishedTasks.length}} Remaining tasks</label>
      <label v-if="this.finishedTasks.length == 1" style="position:absolute;right:60px;">1 Remaining task</label>
      <br>
      <h1 class="text-center" style="color:white">Tasks</h1>
      <br>
      <div class="my-5 mx-auto w-75">
        <div class="my-5">
          <v-row >
            <v-text-field
                  label="What to get done?"
                  outlined
                  v-model="taskName" 
                  class="p-0 m-0"  
                  color="white"
                  clearable
            >
            </v-text-field>
            <v-btn class="mx-1" outlined x-large color="white" v-on:click="addNewTask();addTask=false">Add task</v-btn>
        <br>
          </v-row>
        </div>
        <h3 class="white-text">Todos</h3>
      

        <div class="my-5">
          <!-- <div class="d-flex justify-content-between my-5" v-for="(task, index) in tasks" :key="index" v-on:click="dialog=!dialog">
              <p>{{task.text}}</p>
              <v-btn class="mx-1" depressed color="primary">Done</v-btn>
          </div> -->

          <div class="grid-container">
            <div v-bind:style="'width:33%;height:' + cardHeight + 'px'" v-for="(task, index) in tasks" :key="index" v-on:click="dialog=!dialog;currentTask=task">
              <div class="card">
                <div class="my-auto">
                  <p class="text-center" style="font-size:22px">{{task.text}}</p>
                </div>
                <div style="position:absolute;bottom:0px;right:0px">
                  <label v-if="task.done" class="text-right m-2" style="font-size:12px">Completed</label>
                </div>
                <div style="">
                  <v-progress-linear v-bind:value="task.completeness"></v-progress-linear>
                </div>
              </div>
            </div>
          </div>
        </div>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          > 
            <v-card>
              <div class="d-flex justify-content-end">
                <v-icon class="m-2" v-icon color="#449182" v-on:click="dialog=false">mdi-close</v-icon>
              </div>
              <div class="d-flex justify-content-center">
                <label class="mt-3 dark-color" style="font-size:26px">{{currentTask.text}}</label>
              </div>
            <v-card-text>
            <v-container>
              <div><p class = "mt-2 mx-1" style="color:black;font-size:18px">Add sub-task</p></div>
              <div class="my-5">
                <v-row class="mx-0">
                  <v-text-field
                        label="sub-tasks"
                        outlined
                        v-model="subTaskName"
                        color="#449182"
                        clearable
                        
                  >     
                  
                  </v-text-field>
                  <div class="my-0">
                    <v-btn
                      class="ma-2 my-auto"
                      outlined
                      medium
                      fab
                      color="#449182"
                      v-on:click="addNewSubTask()">
                      <v-icon>mdi-plus-thick</v-icon>
                    </v-btn>
                  </div>
                </v-row>

                <div class="d-flex justify-content-between" v-for="(subTask, index) in currentTask.subTasks" :key="index" v-on:click="subTask">
                    <div class="my-3">
                      <p class="my-auto">{{subTask.text}}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div class="my-auto">

                        <v-icon v-if="subTask.done" color="#90e0d1">mdi-check-underline</v-icon>
                        <v-icon v-if="!subTask.done" color="white">mdi-check-underline</v-icon>
                        <v-btn
                          color="#90e0d1"
                          outlined
                          v-on:click="markSubTaskDone(subTask)"
                          class="my-auto mx-2"
                        >Mark as done</v-btn>

                  
                        <v-icon class="my-auto" color="#90e0d1" v-on:click="deleteSubTask(subTask)">mdi-delete</v-icon>
                      
                      </div>
                    </div>
                </div>
              </div>
              <div style="display: flex; justify-content: center;">
                  
                <v-date-picker v-if="showDatePicker"
                  v-model="date"
                  @click:date="handleClick"
                  color="#449182"
                ></v-date-picker>
              </div>
              <div style="display: flex; justify-content: center;">
                <v-btn v-if="currentTask.date" class="m-1" color="#449182" v-on:click="showDatePicker=false;date='';removeTaskDate()">Remove date</v-btn>
                <v-btn v-if="!currentTask.date && !showDatePicker" class="m-1" color="#449182" v-on:click="triggerDatePicker()">Set date</v-btn>
              </div>
              
            </v-container>  
            
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="markDone();dialog = false;"
            >
              <p class="dark-color">Mark as done</p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </div>

    </v-main> 

  </v-app>
</template>

<script>
  export default {
    name: "Test",
    data() {
      return {
        drawer: true,
        hidden: false,
        cardHeight: 0,
        currentTask: {},
        finishedTasks:[],
        showDatePicker: false,
        checkbox: "",
        date: '',
        dialog: false,
        taskName: "",
        subTaskName: "",
        tasks: []
      }
    },
    mounted(){
      var authenticated = this.$store.getters.isAuthenticated
      if (!authenticated){
        this.$router.push({name: "login"})
      }
      this.tasks = this.$store.getters.getAllTasks
      this.finishedTasks = this.$store.getters.getFinishedTasks
      this.dialog = this.$store.getters.getDialogState
      window.console.log(this.tasks)

      this.cardHeight = window.innerHeight * 0.2
    },
    methods: {
      addNewTask(){
        var obj = {
          text: this.taskName,
          subTasks: [],
          date: '',
          done: false
        }
        this.$store.commit("addTask", obj)
        window.console.log(this.$store.getters.getAllTasks)
        this.taskName = ""
      },
      handleClick(date){
        this.date = date
        window.console.log(this.date)
        this.addNewDate()

      },
      addNewDate(){
        var payload = {
          date: this.date,
          task: this.currentTask
        } 
        

        this.$store.commit("addDate", payload)
      },
      addNewSubTask(){  
        var payload = {
          subTask: {
            text: this.subTaskName,
            date: this.date,
            time: "",
            done: false
          },
          task: this.currentTask
          
          }
        this.$store.commit("addSubTask", payload)
        this.subTaskName = ""
      },
      removeTaskDate(){
        var payload = {
          date: '',
          task: this.currentTask
        } 

        this.$store.commit("addDate", payload)

      },
      triggerDatePicker(){
        this.showDatePicker=true
        var today = new Date()
        this.date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
        window.console.log(today.toString())
        window.console.log(this.date)
        this.addNewDate()
      },
      markDone(){
        this.$store.commit("markTaskDone", this.currentTask)
      },
      markSubTaskDone(subTask){
        var payload = {
          task: this.currentTask,
          subTask: subTask
        }
        this.$store.commit("markSubTaskDone", payload)
      },
      deleteTask(task){
        this.$store.commit("deleteTask", task)
      },
      deleteSubTask(subTask){
        var payload = {
          task: this.currentTask,
          subTask: subTask
        }
        this.$store.commit("deleteSubTask", payload)
      },
      // getPercentageDone(task){
      //   var count = 0
      //   for (var i=0;i<task.subTasks.length;i++){
      //     if (task.subTasks[i].done){
      //       count=count+1
      //     }
      //   }
      //   return Math.round(count/task.subTasks.length)
      // }
    }
  }
</script>




<style scoped>
  .grid-container {
    display: flex;
    flex-wrap: wrap;
  }
  .card {
    background-color: whitesmoke;
    width: 95%;
    height: 90%
  }
  .rounded {
    border-radius: 10%;
  }
</style>
