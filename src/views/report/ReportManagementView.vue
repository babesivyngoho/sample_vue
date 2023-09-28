<template>
    <v-row v-if="isReady">
        <v-col v-for="button in buttons" cols="6" xs="6" sm="5" md="4" lg="3">
            <v-card
                class="button-style d-flex align-center justify-center"
                variant="outlined"
                rounded
                @click="buttonClick(button)"
            >
                <v-icon class="icon-style" size="70">{{ button.icon }}</v-icon>
            </v-card>
            <v-sheet class="pt-3 text-center button-name-style"> {{ button.name.toUpperCase() }} </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import { updateCrumbs } from "@/functions/breadcrumbsHandler.js"
export default{
    emits: ["selected", "activeView"],
    data(){
        return {
            viewName: "Report Management View",
            isReady: false,
            buttons: [
                {id: 0, name: "Search", icon: "mdi-magnify", link: "/search", route: "Search", report: true},
                {id: 1, name: "Graph", icon: "mdi-graph", link: "/graph", route: "Graph", report: true},
                {id: 2, name: "Maps", icon: "mdi-map", link: "/map", route: "Map", report: true}
            ],
            items: [],
        }
    },
    mounted(){
        this.activeView()
        this.isReady = true
    },
    methods: {
        setData(){
            var temp = JSON.parse(localStorage.getItem('breadcrumbs'))
            var crumb = {
                title: 'Report Management View',
                disabled: true,
                href: '/home/report'
            }
            this.items = updateCrumbs(temp, crumb)
            console.log(this.items)
            this.isReady = true
        },

        buttonClick(params){
            console.log(params)
            console.log(this.viewName)
            console.log(params.report)
            if(params.report == true){
                localStorage.setItem('isReport', true)
            }else{
                localStorage.setItem('isReport', null)
            }

            this.$emit('selected', params)
        },

        activeView(){
            this.$emit('activeView', this.viewName)
        },
    }
}
</script>

<style>
    .icon-style{
        color: #333333;
    }
</style>