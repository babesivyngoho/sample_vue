<template>
  <template v-if="$route.name == 'Home'">
    <UserHomeComponent v-if="isReady"
      :user="user"
      :features="buttons_enabled"
      @selected="buttonClick"
    ></UserHomeComponent>
  </template>
  <div v-else>
    <v-breadcrumbs :items="items">
        <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
    </v-breadcrumbs>
    <v-container fluid fill-height>
      <router-view @selected="buttonClick" @activeView="checkActive"/>
    </v-container>
  </div>
</template>

<script>
import MainViewComponent from "@/components/MainViewComponent.vue"
import UserHomeComponent from "@/components/UserHomeComponent.vue"

export default {
  components: {
    MainView: MainViewComponent,
    UserHomeComponent,
  },
  data(){
      return {
          role: "",
          buttons: [
            {id: 0, name: "Search", icon: "mdi-magnify", link: "search", route: "Search"},
            {id: 1, name: "Value Chain Data Management", icon: "mdi-graph-outline", link: "vcmgt", route: "ValueChainMgt"},
            {id: 2, name: "Report Management", icon: "mdi-file-document-outline", link: "report", route: "ReportManagement"},
            {id: 3, name: "Account Settings", icon: "mdi-account-cog-outline", link: "account", route: "AccountSettings"},
          ],

          buttons_enabled: [],
          isReady: false,
          user: {
            username: null,
            role: null,
            permissions: []
          },
          selected: false,
          items: [
            {
              title: 'Home',
              link: true,
              exact: true,
              disabled: false,
              href: '/home'
            }
        ],
      }
  },
  mounted(){
    //this.$route.name == "Home" ? localStorage.removeItem('breadcrumbs') : true
    this.items = !(localStorage.getItem('breadcrumbs')==null) ? JSON.parse(localStorage.getItem('breadcrumbs')) : this.items
    this.getData()
  },
  methods: {
    //will change this later if database is available
    getData(){
      this.user.role = localStorage.getItem("user_role")
      this.user.username = localStorage.getItem("user_name")
      this.user.permissions = JSON.parse(localStorage.getItem("permissions"))
      console.log(this.user.permissions)

      for(let i = 0; i < this.user.permissions.length; i++){
        console.log(this.user.permissions[i].id - 1)
        this.buttons_enabled.push(this.buttons[this.user.permissions[i].id - 1])
      }

      this.isReady = true;
    },
    getRole(){
      console.log(this.$store.getters.getRole())
      return this.$store.getters.getRole();
    },

    buttonClick(params){
      // var breadcrumb = []
      // var crumb = {
      //   title: 'Home',
      //   disabled: false,
      //   href: "/home"
      // }
      // breadcrumb.push(crumb)
      // localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumb))
      // 

      console.log(params)
      if(params.report != null){
        localStorage.setItem('isReport', true)
      }else{
        localStorage.setItem('isReport', null)
      }
      this.addCrumb(params)
    },

    addCrumb(params){
      let crumb = {
        title: params.name,
        disabled: true,
        link: true,
        exact: true,
        to: {
          name: params.route
        }
      }
      console.log(crumb)
      this.items.push(crumb)
      this.updateCrumbs()
      this.selected = true
      this.$router.push({name: params.route})
      if(params.report != null){
        localStorage.setItem('isReport', true)
      }else{
        localStorage.setItem('isReport', null)
      }
      localStorage.setItem('breadcrumbs', JSON.stringify(this.items))
    },

    updateCrumbs(){
      for(let i = 0; i < this.items.length-1; i++){
        this.items[i].disabled = false
      }
      localStorage.setItem('breadcrumbs', JSON.stringify(this.items))
    },
    
    checkActive(item){
      this.checkCrumbs(item)
    },

    checkCrumbs(item){
      for(let i=0; i<this.items.length; i++){
        if(this.items[i].title === item){
          if(this.items.length > i+1){
            this.items.length=i+1
            this.items[i].disabled = true
            localStorage.setItem('breadcrumbs', JSON.stringify(this.items))
          }
        }
      }
    }
  }
}


</script>
  
<style>
</style>