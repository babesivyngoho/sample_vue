<template>
    <template v-if="is_add">
        <DataEntryViewVue />
    </template>
    <template v-else-if="is_edit">
        <v-form class="form-style">
            <h3>
                <v-row justify="space-between">
                    <v-col cols="7">
                        Business Basic Information
                    </v-col>
                </v-row>
            </h3>
            <BusinessProfileComponent v-bind:id_player="id_player"/>
        </v-form>
    </template>
    <template v-else-if="is_view">
        <h3>
            <v-row>
                <v-col>
                    Business Basic Information
                </v-col>
                <v-col cols="4">
                    <v-btn color="#BAD4AF" flat @click="is_edit = true">Edit</v-btn>
                </v-col>
            </v-row>
        </h3>
        <v-form class="form-style" v-if="!is_edit">
            <BusinessProfileComponent readonly :id_player="id_player" :is_view="!is_view"/>
        </v-form>
    </template>
    <template v-else>
        <h3>
            <v-row justify="space-between">
                <v-col>
                    Value Chain Entities
                </v-col>
                <v-btn color="#BAD4AF" class="mr-3" flat @click="addBusiness">Add</v-btn>
            </v-row>
        </h3>
            
        <br/>
        <v-table>
            <thead>
                <tr>
                <th class="text-left">
                    Business Name
                </th>
                <th class="text-left">
                    VC Player Type
                </th>
                <th class="text-left">
                    Representative
                </th>
                <th class="text-left">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in business"
                    :key="item.business_name"
                >
                    <td @click="viewBusiness(item.id)">{{ item.business_name }}</td>
                    <td>{{ item.role }}</td>
                    <td>{{ item.representative_name }}</td>
                    <td>
                        <v-icon large @click="editBusiness(item.id)"> mdi-pencil-outline </v-icon>
                        <v-icon large @click="openDialog"> mdi-trash-can-outline </v-icon>
                    </td>

                    <v-dialog
                        v-model="dialog"
                        width="auto"
                    >
                        <v-card flat
                            hover height="100%" class="card-outter"
                        >
                            <v-card-text>
                                Are you sure you want to delete the business?
                            </v-card-text>
                            <v-spacer></v-spacer>
                            <v-card-actions class="card-actions">
                                <v-btn
                                    flat
                                    style="background: #E5E2DA"
                                    @click="deleteBusiness(item.id)"
                                >
                                    Yes
                                </v-btn>
                                <v-btn
                                    flat
                                    style="background: #E5E2DA"
                                    @click="dialog = false"
                                >
                                    No
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog
                        v-model="delete_bool"
                        width="auto"
                    >
                        <v-card flat
                            hover height="100%" class="card-outter"
                        >
                            <v-card-text>
                                {{ errorMessage }}
                            </v-card-text>
                            <v-spacer></v-spacer>
                            <v-card-actions class="card-actions">
                                <v-btn
                                    flat
                                    style="background: #E5E2DA"
                                    @click="reloadPage"
                                >
                                    Okay
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </tr>
            </tbody>
        </v-table>
    </template>
  </template>

<script>
import BusinessProfileComponent from "@/components/BusinessProfileComponent.vue"
import DataEntryViewVue from "@/views/vcmgt/DataEntryView.vue"

export default {
    components: {
        BusinessProfileComponent,
        DataEntryViewVue,
    },
    data () {
        return {
            business: [],
            data: [],
            actor_data: '',
            user_data: '',
            is_view: false,
            is_add: false,
            is_edit: false,
            message: '',
            errorMessage: '',
            id_player: null,
            is_clicked: false,
            dialog: false,
            delete_bool : false,
        }
    },
    beforeMount(){
        this.getPlayers()
    },
    methods: {
        openDialog(){
            this.dialog = true
        },

        reloadPage(){
            window.location.replace("/home/vcmgt/data/input")
        },

        async getPlayers(){
            this.data = await(this.$store.dispatch('getAllPlayers'));
            //this.business = this.data
            console.log(this.data)
            for(let i = 0; i <(this.data).length; i++){
                this.getBusinessName(this.data[i].id, this.data[i].actor_id, this.data[i].representative_id, this.data[i].role_id)
            }
        },

        async getBusinessName(player_id, actor_id, user_id, role_id){
            this.actor_data = await(this.$store.dispatch('searchActor', actor_id))
            //console.log(this.actor_data[0].name)
            var role = null

            if(role_id == 1){
                role = 'Producer'
            }else if(role_id == 2){
                role = 'Processor'
            }else if(role_id == 3){
                role = 'Trader'
            }

            if( user_id != null){
                this.user_data = await(this.$store.dispatch('searchUser', user_id))
                console.log(this.user_data.name)
                this.business.push({id: player_id, role: role, business_name: this.actor_data[0].name, representative_name: this.user_data.name})
            } else {
                this.business.push({id: player_id, role: role, business_name: this.actor_data[0].name, representative_name: 'No Representative'})
            }

        },

        async editBusiness(player_id){
            //this.is_edit = true;
            this.id_player = player_id
            console.log(player_id)
            console.log(this.id_player)
            console.log("Ediiit")
            this.is_edit = true;
        },

        async deleteBusiness(player_id){
            console.log("Deleteee")
            console.log(player_id)
            this.message = await(this.$store.dispatch('deletePlayer', player_id))
            console.log('annyeong')
            console.log(this.message)

            this.dialog = false;
            this.delete_bool = true;

            if(this.message == 'success'){
                this.errorMessage = 'Player deleted successfully'
            }else{
                this.errorMessage = 'Player failed to delete'
            }
        },

        viewBusiness(player_id){
            this.id_player = player_id
            console.log("Viewwww")
            this.is_view = true;
        },

        addBusiness(){
            this.is_add = true;
        }
    },
}
</script>

<style>
    .form-style{
        width: 775px;
    }

    .card-outter {
        padding-bottom: 50px;
    }

    .card-actions {
        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>