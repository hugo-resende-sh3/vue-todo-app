import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
import Card from 'primevue/card'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import './assets/main.css'

const app = createApp(App)

app.use(router)  // adiciona o roteador
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)


app.component('Dialog', Dialog)
app.component('Card', Card)
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)

app.mount('#app') // monta a aplicação na div com id="app"