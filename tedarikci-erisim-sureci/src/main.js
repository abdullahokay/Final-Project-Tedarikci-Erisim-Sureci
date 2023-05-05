import { createApp } from 'vue'
import App from './App.vue'

//vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

//vuex
import store from "./store/store";

//vue-router
import router from './router/router'

const vuetify = createVuetify({
  components: {
    ...labs,
    ...components
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})

const app = createApp(App)
app.use(vuetify)
app.use(store)
app.use(router)
app.mount('#app')
