import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    meta: {
      requiresAuth: true,
    },
    redirect: 'Home'
  },
  {
    path: '/home/:catchAll(.*)',
    meta: {
      requiresAuth: true,
    },
    redirect: 'Home'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactView.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('@/views/FAQView.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/main/Dashboard.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/main/HomeView.vue'),

    children:[
      {
        path: 'search',
        name: 'Search',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/main/SearchView.vue'),
      },

      //VC MANAGEMENT
      {
        path: 'vcmgt',
        name: 'ValueChainMgt',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/main/ValueChainDataMgtView.vue'),
      },
      {
        path: 'vcmgt/map',
        name: 'Map',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/vcmgt/MapView.vue'),
      },
      {
        path: 'vcmgt/graph',
        name: 'Graph',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/vcmgt/GraphView.vue'),
      },
      {
        path: 'vcmgt/graph/vcplayer',
        name: 'GraphVCP',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/vcmgt/vcplayer/GraphVCPView.vue'),
      },
      {
        path: 'vcmgt/graph/location',
        name: 'GraphLocation',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/vcmgt/location/GraphLocationView.vue'),
      },
      {
        path: 'vcmgt/graph/products',
        name: 'GraphProducts',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/vcmgt/products/GraphProductsView.vue'),
      },
      {
        path: 'vcmgt/data/input',
        name: 'DataEntry',
        meta: {
          requiresAuth: true,
        },
        //component: () => import('@/views/vcmgt/DataEntryView.vue'),
        component: () => import('@/views/vcmgt/ValueChainEntitiesComponent.vue'),
      },

      //REPORTS
      {
        path: 'report',
        name: 'ReportManagement',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/report/ReportManagementView.vue'),
      },

      //ACCOUNTS
      {
        path: '/account',
        name: 'AccountSettings',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/account/AccountSettingsView.vue'),
      },
      {
        path: '/account/profile',
        name: 'Profile',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/account/PersonalProfileView.vue'),
      },
      {
        path: '/account/manage',
        name: 'ManageAccount',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/account/ManageAccountView.vue'),
      },
      {
        path: '/account/manage',
        name: 'ManageField',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/account/ManageFieldView.vue'),
      },
      {
        path: '/account/status',
        name: 'ADAccount',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/account/ADAccountsView.vue'),
      }
    ]
  },
  // {
  //   path: '/home/search',
  //   name: 'Search',
  //   meta: {
  //     requiresAuth: true,
  //   },
  //   component: () => import('@/views/main/SearchView.vue'),
  // },
  // {
  //   path: '/home/vcmgt',
  //   name: 'ValueChainMgt',
  //   meta: {
  //     requiresAuth: true,
  //   },
  //   component: () => import('@/views/main/ValueChainDataMgtView.vue'),
  // },
  // {
  //   path: '/home/vcmgt/map',
  //   name: 'Map',
  //   meta: {
  //     requiresAuth: true,
  //   },
  //   component: () => import('@/views/map/MapView.vue'),
  // }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated()){
    return { name: 'Login'}
  }

})

export default router
