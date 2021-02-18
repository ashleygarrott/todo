import Vue from "vue";
import VuePlaceAutocomplete from 'vue-place-autocomplete'
import BootstrapVue from 'bootstrap-vue'
import App from "./App.vue";
import router from "./router";
import VueSimpleAlert from "vue-simple-alert";
import { Auth0Plugin } from "./auth";
import HighlightJs from "./directives/highlight";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { domain, clientId } from "../auth_config.json";
import VueCarousel from 'vue-carousel';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from './store/index.js'
 import '@/plugins/firebase.js' 



Vue.use(VueSimpleAlert);
Vue.use(VueCarousel);
Vue.config.productionTip = false;
Vue.use(VuePlaceAutocomplete);
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.directive("highlightjs", HighlightJs);

library.add(faLink, faUser, faPowerOff);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");

