import Vue from 'vue'
import Router from 'vue-router'
import vueLogin from '@/components/Login'
import vueMain from '@/components/Main'
import vueHome from '@/components/Home'
import vueSkin from '@/components/Skin'
import vueCarousel from '@/components/Carousel'
import vueTable from '@/components/Table'
// import vueWaterfall from '@/components/pubu'
import vueWaterfall from '@/components/waterfall'
import vueSearch from '@/components/Search'
import vueDrag from '@/components/Drag'
import vueAnimal from '@/components/animal'
Vue.use(Router)

export default new Router({
    routes: [
        {
            // 进入后自动进入 /login
            path: '',
            redirect: '/login'
        },
        {
            path: '/login',
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
                }, {
                    path: 'carousel',
                    name: 'carousel',
                    component: vueCarousel
                }, {
                    path: 'waterfall',
                    name: 'Waterfall',
                    component: vueWaterfall
                },
                {
                    path: 'search',
                    name: 'Search',
                    component: vueSearch
                },
                {
                    path: 'drag',
                    name: 'drag',
                    component: vueDrag
                },
                {
                    path: 'animal',
                    name: 'animal',
                    component: vueAnimal
                },{
                    path: 'table',
                    name: 'table',
                    component: vueTable
                },]
        }
    ]
})
