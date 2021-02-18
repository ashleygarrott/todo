import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        authenticated: false,
        dialog: false,
        tasks: [
            {
                id: 0,
                text: "Some first item",
                date: "",
                time: "",
                subTasks: [
                    {
                        text: "sub-task 1",
                        date: "",
                        time: "",
                        done: false
                    },
                    {
                        text: "sub-task 2",
                        date: "",
                        time: "",
                        done: false
                    }
                ],
                completeness: 10,
                done: true
            },
            {
                id: 1,
                text: "Yet another second task",
                date: "",
                time: "",
                subTasks: [
                    {
                        id: 0,
                        text: "sub-task 1",
                        date: "",
                        time: "",
                        done: false
                    },
                    {
                        id: 1,
                        text: "sub-task 2",
                        date: "",
                        time: "",
                        done: false
                    }
                ],
                completeness: 0,
                done: false
            }
          
            
        ]
    },
    getters: {
        getAllTasks: state => {
            return state.tasks
        },
        getFinishedTasks: state => {
            return state.tasks.filter(task => task.done)
        },
        getDialogState: state => {
            return state.dialog
        },
        isAuthenticated: state => {
            return state.authenticated
        }
    },
    mutations: {
        addTask(state, payload){
            payload.id = state.tasks.length
            state.tasks.push(payload)
        },
        addSubTask(state, payload){
            payload.subTask.id = payload.task.subTasks.length
            payload.task.subTasks.push(payload.subTask)
            var count = 0
            for (var i=0;i<payload.task.subTasks.length;i++){
                if (payload.task.subTask.done){
                    count++
                }
            }
            payload.task.completeness = Math.round(count/payload.task.subTasks.length)

        },
        addDate(state, payload){
            payload.task.date = payload.date
        },
        deleteTask(state, task){
            state.tasks.splice(task.id, 1)

            for (var i=0;i<state.tasks.length;i++){
                state.tasks[i].id = i
            }
        },
        deleteSubTask(state, payload){
            state.tasks[payload.task.id].subTasks.splice(payload.subTask.id, 1)

            for (var i=0;i<state.tasks[payload.task.id].subTasks.length;i++){
                state.tasks[payload.task.id].subTasks[i].id = i
            }

            var count = 0
            for (var i=0;i<payload.task.subTasks.length;i++){
                if (payload.task.subTask.done){
                    count++
                }
            }
            payload.task.completeness = Math.round(count/payload.task.subTasks.length)

            // if(state.tasks[payload.task.id].subTasks.length == 0){
            //     state.tasks.splice(payload.task.id, 1)
            //     for (var i=0;i<state.tasks.length;i++){
            //         state.tasks[i].id = i
            //     }
            // }

            state.dialog = false;
        },
        markTaskDone(state, task){
            task.done = true
            for (var i=0;i<task.subTasks.length;i++){
                task.subTasks[i].done = true
            }
        },
        markSubTaskDone(state, payload){
            payload.subTask.done = true
            var res = true
            for (var i=0;i<payload.task.subTasks.length;i++){
                res = res * payload.task.subTasks[i].done
            }

            if (res){
                payload.task.done = true
            }

            var count = 0
            for (var i=0;i<payload.task.subTasks.length;i++){
                if (payload.task.subTask.done){
                    count++
                }
            }
            payload.task.completeness = Math.round(count/payload.task.subTasks.length)
        },
        setAuthenticated(state){
            state.authenticated = true
        }
    },
    actions: {
        // addTask(context, payload){
        //     context.commit('addTask', payload)
        // }
    },
    modules: {}
});