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
import {updateCrumbs} from "@/functions/breadcrumbsHandler.js"
export default {
    emits: ["selected", "activeView"],
    data(){
        return {
            viewName: "Graph",
            isReady: false,
            buttons: [
                {id: 0, name: "VC Player", icon: "mdi-account-tie", link: "/graph/vcplayer", route: "GraphVCP"},
                {id: 1, name: "Products", icon: "mdi-fish", link: "/graph/products", route: "GraphProducts"},
                {id: 2, name: "Location", icon: "mdi-map-marker", link: "/graph/location", route: "GraphLocation"},
            ],
            items: [],
        }
    },
    mounted(){
        // this.setData()
        this.activeView()
        this.isReady = true
    },
    methods: {
        setData(){
            var temp = JSON.parse(localStorage.getItem('breadcrumbs'))
            var crumb = {
                title: 'Value Chain Data Management',
                disabled: true,
                href: '/home/vcmgt'
            }
            this.items = updateCrumbs(temp, crumb)
            console.log(this.items)
            this.isReady = true
        },

        buttonClick(params){
            console.log(params)
            this.$emit('selected', params)
        },

        activeView(){
            this.$emit('activeView', this.viewName)
        }
    }
}
</script>

<style>

    .icon-style{
        color: #333333;
    }
</style>