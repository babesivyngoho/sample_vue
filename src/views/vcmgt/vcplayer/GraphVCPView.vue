<template>
    <v-row justify="space-between">
        <template v-if="!is_player">
            <v-col>
                <v-autocomplete
                    :items="business"
                    item-title="name"
                    item-value="id"
                    v-model="selectedPlayer"
                    placeholder="Select"
                    density="compact"
                    variant="outlined"
                    class="form-style"
                ></v-autocomplete>
            </v-col>
        </template>
        
        <template v-if="isReport != 'null'">
            <v-row justify="end">
                <v-btn
                    flat
                    class="ma-2"
                    icon="mdi-printer-outline"
                >
                </v-btn>
            </v-row>
        </template>
    </v-row>

    <v-row class="ma-0">
        <v-col class="ma-0">
            <v-row
                v-for="(item, supp_index) in supp_data"
                :ref="'supp' + item.id"
                :key=supp_index
            >
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                            :id="'supp' + supp_index"
                        ></v-sheet>
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ item.name }}</code>
                    </div>
                </v-col>
            </v-row>
        </v-col>
        <v-col class="ma-0">
            <v-row>
                <v-col>
                    <div class="text-center">
                        <template v-if="player != null">
                            <v-sheet flat
                                class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                                id="player"
                            ></v-sheet>
                        </template>
                        <template v-else>
                            <v-sheet flat
                                class="pa-6 bg-white rounded-circle d-inline-block"
                                id="player"
                            ></v-sheet>
                        </template>
                        
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ player }}</code>
                    </div>
                </v-col>
            </v-row>
        </v-col>
        <template v-if="industry_player.length != 0">
            <v-col class="ma-0">
                <v-row
                    v-for="(item, industry_index) in industry_player"
                    :ref="'industry' + item.id"
                    :key=industry_index
                >
                    <v-col>
                        <div class="text-center">
                            <v-sheet flat
                                class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                                :id="'industry' + industry_index"
                            ></v-sheet>
                            <div class="py"></div>
                            <code class="text-subtitle-1">{{ item.name }}</code>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </template>
        

        <v-col class="ma-0">
            <v-row
                v-for="(item, buy_index) in buy_data"
                :ref="'buy' + item.id"
                :key=buy_index
            >
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                            :id="'buy' + buy_index"
                        ></v-sheet>
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ item.name }}</code>
                    </div>
                </v-col>
            </v-row>
        </v-col>

        
    </v-row>
</template>

<script>
    import LeaderLine from "leader-line-vue";
    export default {
        data () {
            return {
                rotation: 0,
                business: [],
                supplier: [],
                buyer: [],
                supp_data: [],
                temp_supp_data: [],
                buy_data: [],
                temp_buy_data: [],
                data: [],
                player_data: '',
                actor_data: '',
                supplier_data: '',
                buyer_data: '',
                message: '',
                selectedPlayer: '',
                player: null,

                supp_line: [],
                buy_line: [],
                industry_line: [],
                isReport: null,

                industry_player: [],

                player_id: null,

                is_player: false,
            }
        },
        beforeMount(){
            //this.getPlayers()
            this.initial()
        },
        beforeUnmount(){
            this.disconnectLines()
        },
        watch: {
            selectedPlayer: function (newValue){
                this.disconnectLines()
                console.log('helloooo newvalue')
                console.log(newValue)
                this.supp_data = []
                this.temp_supp_data = []
                this.buy_data = []
                this.temp_buy_data = []
                this.industry_player = []
                //this.getPlayer(newValue)
                this.getSupplier(newValue)
            }
        },
        mounted(){
            //this.initial()
            //player_id
            //this.getSupplier(newValue)

        },
        methods: {
            initial(){
                //console.log(localStorage.getItem("isReport"))
                //this.isReport = localStorage.getItem("isReport")

                console.log(localStorage.getItem("user_id"))
                this.getPlayerByRepresentative()
                

            },
            async getPlayerByRepresentative(){
                console.log(localStorage.getItem("user_id"))
                console.log('Kumadiii meeeee rep')
                var user_id = localStorage.getItem("user_id")

                this.player_id = await(this.$store.dispatch('getPlayerByRepresentative', user_id))
                console.log(this.player_id)
                console.log(this.player_id[0].id)

                if((this.player_id).length != 0){
                    this.is_player = true
                    this.getSupplier(this.player_id[0].actor_id)
                }else{
                    this.is_player = false
                    this.getPlayers()
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
                this.connectLines()   
            },

            async getBusinessName(actor_id){
                this.actor_data = await(this.$store.dispatch('searchActor', actor_id))
                console.log(this.actor_data[0].name)
                
                this.business.push({id: actor_id, name: this.actor_data[0].name})
            },

            async getSupplier(player_id){
                console.log(player_id)
                this.temp_supp_data = []
                this.supp_data = []

                this.supplier_data = await(this.$store.dispatch('getSupplier', player_id))
                console.log(this.supplier_data) 
                
                for(let i = 0; i < (this.supplier_data).length; i++){
                    console.log(this.supplier_data[i].supplier_actor_id)

                    this.supplier = await(this.$store.dispatch('searchActor', this.supplier_data[i].supplier_actor_id))
                    console.log(this.supplier[0].name)

                    var checkSupplier = this.temp_supp_data.includes(this.supplier[0].name)

                    if(!checkSupplier){
                        this.temp_supp_data.push(this.supplier[0].name)
                        this.supp_data.push({id: i, name: this.supplier[0].name})
                    }
                }
                this.getBuyers(player_id)
            },

            async getBuyers(player_id){
                console.log(player_id)
                this.buy_data = []

                this.buyer_data = await(this.$store.dispatch('getBuyer', player_id))
                console.log('buyeeeeer')
                console.log(this.buyer_data)
                var industry_player_ctr = 0

                for(let i = 0; i < (this.buyer_data).length; i++){
                    console.log(this.buyer_data[i].actor_id)

                    this.buyer = await(this.$store.dispatch('searchActor', this.buyer_data[i].actor_id))

                    var checkBuyer = this.temp_buy_data.includes(this.buyer[0].name)

                    if(!checkBuyer){
                        console.log(this.buyer[0].name)
                        this.temp_buy_data.push(this.buyer[0].name)
                        this.buy_data.push({id: i, name: this.buyer[0].name})

                        if(this.buyer_data[i].price != null || this.buyer_data[i].term_duration != null){
                            console.log('Hellooo not null')

                            this.buyer = await(this.$store.dispatch('searchActor', this.buyer_data[i].supplier_actor_id))

                            this.industry_player.push({id: industry_player_ctr, name: this.buyer[0].name})
                        }
                    }
                }
                this.getPlayer(player_id)
                //this.buyer_data.push(this.buyer[0].name)
                //this.connectLines()   
            },

            async connectLines(){
                console.log('Helloooo connect lines')
                
                for(let i = 0; i < (this.supp_data).length; i++){
                    var supp = 'supp' + i
                    var line = new LeaderLine.setLine(document.getElementById(supp), player, {
                        color: "#3498db",
                        path: "grid",
                        endPlug: "show",
                    });
                    line.setOptions({startSocket: 'right', endSocket: 'left'});

                    this.supp_line.push(line)
                }
                
                console.log(this.industry_player)

                if((this.industry_player).length != 0){
                    for(let i = 0; i < (this.industry_player).length; i++){
                        var industry = 'industry' + i
                        var line = new LeaderLine.setLine(player, document.getElementById(industry), {
                            color: "#3498db",
                            path: "grid",
                            endPlug: "show",
                        });
                        line.setOptions({startSocket: 'right', endSocket: 'left'});

                        this.industry_line.push(line)

                        for(let j = 0; j < (this.buy_data).length; j++){
                            var buy = 'buy' + j
                            var line = new LeaderLine.setLine(document.getElementById(industry), document.getElementById(buy), {
                                color: "#3498db",
                                path: "grid",
                                endPlug: "show",
                            });
                            line.setOptions({startSocket: 'right', endSocket: 'left'});

                            this.buy_line.push(line)
                        }
                    }                    
                }else{
                    for(let i = 0; i < (this.buy_data).length; i++){
                        var buy = 'buy' + i
                        var line = new LeaderLine.setLine(player, document.getElementById(buy), {
                            color: "#3498db",
                            path: "grid",
                            endPlug: "show",
                        });
                        line.setOptions({startSocket: 'right', endSocket: 'left'});

                        this.buy_line.push(line)
                    }
                }
            },

            async disconnectLines(){
                console.log('Helloooo disconnect lines')
                
                for(let i = 0; i < (this.supp_line).length; i++){
                    this.supp_line[i].hide();
                }

                for(let i = 0; i < (this.buy_line).length; i++){
                    this.buy_line[i].hide();
                }
            }
        }
    }
</script>

<style>
    .form-style {
        width: 700px;
    }

    .form-style2 {
        width: 905px;
    }

    .pa-6 {
        background: #E7D0B1;
        color: #E7D0B1;
    }

    .icon {
        size: 2000px;
    }
</style>