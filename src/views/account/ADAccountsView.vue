<template>
    <div>
        <h3>Users</h3>
        <v-autocomplete class="form-style"
            :items="user_data"
            item-title="name"
            item-value="id"
            v-model="selectedPlayer"
            placeholder="Select"
            density="compact"
            variant="outlined"
        ></v-autocomplete>
    </div>
    
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
                v-for="items in user_data"
            >
                <td>
                    {{ items.name }}
                </td>
                
                <td>{{ items.business_name }}</td>
                <td>
                    <v-chip id="chip" small :class="`${items.sector}`">{{items.sector}}</v-chip>
                </td>
                <td>{{ items.location }}</td>
                
                <td>
                    <v-switch
                        v-model="items.active"
                        hide-details
                        inset
                        color="#BAD4AF"
                        :false-value="0"
                        :true-value="1"
                        class="custom-red d-flex justify-center"
                    ></v-switch>
                </td>

                <td>
                    <v-chip id="chip" small :class="`${getUserType(items.user_type)} white--text caption my-2`" :text="getUserType(items.user_type)"></v-chip>
                </td>

                <td>
                    <template v-if="items.vc_type != null">
                        <v-chip id="chip" small :class="`${getText(items.vc_type)} white--text caption my-2`" :text="getText(items.vc_type)"></v-chip>
                    </template>
                </td>
                <td>
                    <v-icon large> mdi-rotate-left </v-icon>
                    <v-icon large> mdi-trash-can-outline </v-icon>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script>
import {updateCrumbs} from "@/functions/breadcrumbsHandler.js"
export default {
    data(){
        return {
            is_active: null,
            data: '',
            user_data: [],
            player_data: [],
            actor_data: [],
            business_address_data: [],
            headers: [
                {name: 'Name', col_name: 'name', align: 'center', width: '1%'},
                {name: 'Business Name', col_name: 'business_name', align: 'center', width: '1%'},
                {name: 'Sector', col_name: 'sector', align: 'center', width: '1%'},
                {name: 'Location', col_name: 'location',  align: 'center', width: '1%'},
                {name: 'Activate/Deactivate', col_name: 'vcplayer_type',  align: 'center', width: '1%'},
                {name: 'User Roles', col_name: 'user_role', align: 'center', width: '1%'},
                {name: 'VC Player Type', col_name: 'vcplayer_type',  align: 'center', width: '1%'},
                {name: 'Action', col_name: 'action',  align: 'center', width: '1%'},
            ],
        }
    },
    mounted(){
        
    },
    beforeMount(){
        this.getUsers()
    },
    methods: {
        async getUsers(){
            this.data = await(this.$store.dispatch('getAllUsers'));
            //this.user_data = this.data
            console.log(this.data)
            for(let i = 0; i < (this.data).length; i++){
                this.player_data = await(this.$store.dispatch('getPlayerByRepresentative', this.data[i].id))
                if((this.player_data).length != 0){
                    this.actor_data = await(this.$store.dispatch('searchActor', this.player_data[0].actor_id))
                    console.log(this.actor_data)
                    console.log(this.player_data[0].business_address_id)

                    this.business_address_data = await(this.$store.dispatch('getBusinessAddress', this.player_data[0].business_address_id))
                    console.log(this.business_address_data)

                    var municipality_name = await(this.$store.dispatch('getMunicipalityName', this.business_address_data[0].municipality_city_id))
                    console.log(municipality_name)

                    var province_name = await(this.$store.dispatch('getProvinceName', municipality_name[0].province_id))
                    console.log(province_name[0].name)
                    this.user_data.push({name: this.data[i].name, user_type: this.data[i].user_type_id, business_name: this.actor_data[0].name, active: this.data[i].active, sector: this.player_data[0].sector,
                        vc_type: this.player_data[0].role_id, location: municipality_name[0].name + ", " + province_name[0].name})
                    console.log(this.player_data)
                }else{
                    this.user_data.push({name: this.data[i].name, user_type: this.data[i].user_type_id, active: this.data[i].active, sector: 'Not Applicable'})
                }
            }
            console.log(this.user_data)
        },
        getText(role_id){
            if(role_id === 1){
                return 'Producer';
            }else if(role_id === 2){
                return 'Processor';
            }else if(role_id === 3){
                return 'Trader'
            }
        },
        getUserType(user_type_id){
            if(user_type_id === 1){
                return 'VC Chain Analyst';
            }else if(user_type_id === 2){
                return 'VC Player';
            }else if(user_type_id === 3){
                return 'Enabler'
            }else if(user_type_id === 4){
                return 'Consumer'
            }
        },
    },
}
</script>

<style  lang="scss" scoped>
    .custom-red{
        color: #FAA0A0;
    }

    .form-style {
        width: 700px;
    }

    #chip.v-chip.Agriculture {background: #BAD4AF;}
    #chip.v-chip.Fisheries {background: #B3CDE0;}
    #chip.v-chip.Producer {background: #E0D6CC;}
    #chip.v-chip.Processor {background: #E7D0B1;}
    #chip.v-chip.Trader {background: #C69C84;}
</style>
