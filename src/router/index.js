import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import vueLogin from '@/components/Login'
import vueMain from '@/components/Main'
import vueHome from '@/components/Home'
import vueSkin from '@/components/Skin'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: vueLogin
        },
        {
            path: '/main',
            name: 'main',
            component: vueMain,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: vueHome
                }, {
                    path: 'skin',
                    name: 'skin',
                    component: vueSkin
                }]
        }
    ]
})
