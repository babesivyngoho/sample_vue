<template>
    <v-row class="form-style">
        <v-autocomplete class="ma-1 pa-0"
            :items="business"
            item-title="name"
            item-value="id"
            v-model="selectedPlayer"
            placeholder="Select"
            density="compact"
            variant="outlined"
        ></v-autocomplete>
    </v-row>
    
    <br/>

    <v-row class="ma-0">   
        <v-col class="ma-0">
            <v-row
                v-for="(item, supp_index) in supp_data"
                :key="item"
            >
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                        ></v-sheet>
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ item }}</code>
                    </div>
                </v-col>
                <v-col class="mt-5" :style="`transform: rotate(${getRotationSupplier(supp_index)}deg);`">
                    <v-img :width="200" src="/src/assets/arrow.png">
                    </v-img>
                </v-col>
            </v-row>
        </v-col>
         
        <v-col class="ma-0">
            <v-row>
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                        ></v-sheet>
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ player }}</code>
                    </div>
                </v-col>
            </v-row>
        </v-col>
        
        <v-col class="ma-0">
            <v-row
                v-for="(item, index) in buy_data"
                :key="item"
            >
                <v-col class="mt-5" :style="`transform: rotate(${getRotation(index)}deg);`">
                    <v-img :width="200" src="/src/assets/arrow.png">
                    </v-img>
                </v-col>
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                        ></v-sheet>
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ item }}</code>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        data () {
            return {
                rotation: 0,
                business: [],
                supplier: [],
                buyer: [],
                supp_data: [],
                buy_data: [],
                data: [],
                player_data: '',
                actor_data: '',
                supplier_data: '',
                buyer_data: '',
                message: '',
                selectedPlayer: '',
                player: '',
            }
        },
        beforeMount(){
            this.getPlayers()
        },
        watch: {
            selectedPlayer: function (newValue){
                console.log('helloooo newvalue')
                console.log(newValue)
                this.getPlayer(newValue)
                this.getSupplier(newValue)
                this.getBuyers(newValue)
            }
        },
        methods: {
            getRotation(index){
                console.log(index)
                console.log('Hellooo')
                if(index != 0){
                    return index + (15*index)
                }else{
                    return index
                }
            },

            getRotationSupplier(index){
                console.log(index)
                console.log('Hellooo')
                if(index != 0){
                    return index - (15*index)
                }else{
                    return index
                }
            },

            async getPlayers(){
                this.data = await(this.$store.dispatch('getAllPlayers'));
                //this.business = this.data
                console.log(this.data)
                for(let i = 0; i <(this.data).length; i++){
                    this.getBusinessName(this.data[i].actor_id)
                }
            },

            async getPlayer(actor_id){
                this.player_data = await(this.$store.dispatch('searchActor', actor_id))
                console.log(this.player_data[0].name)
                
                this.player = this.player_data[0].name
            },

            async getBusinessName(actor_id){
                this.actor_data = await(this.$store.dispatch('searchActor', actor_id))
                console.log(this.actor_data[0].name)
                
                this.business.push({id: actor_id, name: this.actor_data[0].name})
            },

            async getSupplier(player_id){
                console.log(player_id)
                this.supp_data = []

                this.supplier_data = await(this.$store.dispatch('getSupplier', player_id))
                console.log(this.supplier_data)
                
                for(let i = 0; i < (this.supplier_data).length; i++){
                    console.log(this.supplier_data[i].supplier_actor_id)

                    this.supplier = await(this.$store.dispatch('searchActor', this.supplier_data[i].supplier_actor_id))
                    console.log(this.supplier[0].name)

                    var checkSupplier = this.supp_data.includes(this.supplier[0].name)

                    if(!checkSupplier){
                        this.supp_data.push(this.supplier[0].name)
                    }
                }
                
            },

            async getBuyers(player_id){
                console.log(player_id)
                this.buy_data = []

                this.buyer_data = await(this.$store.dispatch('getBuyer', player_id))
                console.log('buyeeeeer')
                console.log(this.buyer_data)

                for(let i = 0; i < (this.buyer_data).length; i++){
                    console.log(this.buyer_data[i].actor_id)

                    this.buyer = await(this.$store.dispatch('searchActor', this.buyer_data[i].actor_id))

                    var checkBuyer = this.buy_data.includes(this.buyer[0].name)

                    if(!checkBuyer){
                        console.log(this.buyer[0].name)
                        this.buy_data.push(this.buyer[0].name)
                    }
                }
                //this.buyer_data.push(this.buyer[0].name)
            },
        }
    }
</script>

<style>
    .form-style {
        width: 700px;
    }

    .pa-6 {
        background: #E7D0B1;
        color: #E7D0B1;
    }

    .icon {
        size: 2000px;
    }
</style>