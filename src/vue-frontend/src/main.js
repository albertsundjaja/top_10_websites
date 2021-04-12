import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import vueYoutubeEmbed from './plugins/vue-youtube-embed';

Vue.config.productionTip = false

new Vue({
  vuetify,
  vueYoutubeEmbed,
  render: h => h(App)
}).$mount('#app')
