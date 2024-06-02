import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { mdi } from 'vuetify/iconsets/mdi'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

//bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

//pinia
import { createPinia } from 'pinia'

//api
import {base} from './apis/ApiService.js'

const pinia = createPinia();
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed solid icons
library.add(far) // Include needed regular icons

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa
    },
  },
  theme:{
    primary: '#283046',
  }
})


app.use(router);
app.use(vuetify);
app.use(pinia)
app.use(bootstrap);

const config = app.config;
config.globalProperties.$api = base;

app.mount('#app');


