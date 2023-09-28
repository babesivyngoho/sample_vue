<template>
    <v-table
        fixed-header
    >
        <thead>
            <tr>
                <th
                    v-for="header in headers"
                    cols="3"
                >
                    {{ header.name }}

                </th>
            </tr>
        </thead>
        <tbody>
            <tr
            >
                <td>
                    Value Chain Analyst
                </td>
                
                <td>
                    <v-checkbox v-model="vcanalyst" :value=1 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="vcanalyst" :value=2 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="vcanalyst" :value=3 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="vcanalyst" :value=4 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
            </tr>

            <tr
            >
                <td>
                    VC Player
                </td>
                
                <td>
                    <v-checkbox v-model="vcplayer" :value=1 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="vcplayer" :value=2 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="vcplayer" :value=3 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="vcplayer" :value=4 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
            </tr>

            <tr
            >
                <td>
                    Enabler
                </td>
                
                <td>
                    <v-checkbox v-model="enabler" :value=1 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="enabler" :value=2 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="enabler" :value=3 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="enabler" :value=4 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
            </tr>

            <tr
            >
                <td>
                    Consumer
                </td>
                
                <td>
                    <v-checkbox v-model="consumer" :value=1 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="consumer" :value=2 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="consumer" :value=3 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
                <td>
                    <v-checkbox v-model="consumer" :value=4 hide-details class="d-flex justify-center"></v-checkbox>
                </td>
            </tr>
        </tbody>
    </v-table>

    <v-divider class="mt-1"/>
    <br/>

    <v-row justify="end">
        <v-btn color="#BAD4AF" class="ma-2" flat @click="save">Save</v-btn>
        <v-btn color="#CECECE" class="ma-2" flat>Cancel</v-btn>
    </v-row>
</template>

<script>
import {updateCrumbs} from "@/functions/breadcrumbsHandler.js"
export default {
    data(){
        return {
            roles: ['Value Chain Data Analyst', 'VC Player', 'Enabler', 'Consumer'],
            headers: [
                {name: 'Role', col_name: 'role', align: 'center', width: '1%'},
                {name: 'Search', col_name: 'search', align: 'center', width: '1%'},
                {name: 'Value Chain Data Management', col_name: 'vcdmgt', align: 'center', width: '1%'},
                {name: 'Report Management', col_name: 'reportmgt',  align: 'center', width: '1%'},
                {name: 'Account Settings', col_name: 'accsettings',  align: 'center', width: '1%'},
            ],

            user_type_data: [],
            permission_data: [],

            data: [],

            vcanalyst: [],
            vcplayer: [],
            enabler: [],
            consumer: [],

            errorMessage: null,
        }
    },
    mounted(){
        this.getUserRoles()
        this.getUserPermissions()
    },
    beforeMount(){

    },
    methods: {
        async getUserRoles(){
            this.user_type_data = await(this.$store.dispatch('getAllUserType'))
            console.log(this.user_type_data)
        },

        async getUserPermissions(){
            this.permission_data = await(this.$store.dispatch('getAllUserPermission'))
            console.log(this.permission_data)

            for(let i = 0; i < (this.permission_data).length; i++){
                if(this.permission_data[i].user_type_id == 1){
                    this.vcanalyst.push(this.permission_data[i].permission_id)
                }else if(this.permission_data[i].user_type_id == 2){
                    this.vcplayer.push(this.permission_data[i].permission_id)
                }else if(this.permission_data[i].user_type_id == 3){
                    this.enabler.push(this.permission_data[i].permission_id)
                }else if(this.permission_data[i].user_type_id == 4){
                    this.consumer.push(this.permission_data[i].permission_id)
                }
            }
        },

        async save(){

            this.data = []

            for(let i = 0; i < (this.vcanalyst).length; i++){
                this.data.push({user_type_id: 1, permission_id: this.vcanalyst[i]})
            }

            for(let i = 0; i < (this.vcplayer).length; i++){
                this.data.push({user_type_id: 2, permission_id: this.vcplayer[i]})
            }

            for(let i = 0; i < (this.enabler).length; i++){
                this.data.push({user_type_id: 3, permission_id: this.enabler[i]})
            }

            for(let i = 0; i < (this.consumer).length; i++){
                this.data.push({user_type_id: 4, permission_id: this.consumer[i]})
            }

            console.log(this.data)

            this.errorMessage = await(this.$store.dispatch('updatePermissions', this.data))
        }
    },
}
</script>