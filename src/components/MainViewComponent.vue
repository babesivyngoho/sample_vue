<template>
    <v-breadcrumbs v-if="isReady" :items="items">
        <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
    </v-breadcrumbs>

</template>

<script>

export default {
    props: ['parameters'],
    data(){
        return {
            items: [],
        }
    },
    methods: {

    }
}

</script>

<style>


</style>