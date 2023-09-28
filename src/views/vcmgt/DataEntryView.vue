<template>

    <h3>
        Business and Representative Registration
    </h3>
    <br/>
    <v-tabs v-model="tab">
        <v-tab value="1">
            Register Business
        </v-tab>
        <v-tab value="2">
            Register Representative
        </v-tab>
    </v-tabs>

    <v-card-text>
        <v-window v-model="tab">
            <v-window-item value="1" class="form-style">
                <BusinessProfileComponent />
            </v-window-item>

            <v-window-item value="2" class="form-style">
                <br/>
                <RepresentativeProfileComponent />
            </v-window-item>
        </v-window>
    </v-card-text>
</template>

<script>
import RepresentativeProfileComponent from "@/components/RepresentativeProfileComponent.vue"
import BusinessProfileComponent from "@/components/BusinessProfileComponent.vue"

export default{
    components: {
    RepresentativeProfileComponent,
    BusinessProfileComponent,
},
    data(){
        return {
            tab: null,
        }
    },
    mounted(){
    }
}
</script>

<style>
    .form-style {
        width: 700px;
    }
</style>