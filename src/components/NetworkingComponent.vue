<template>
    <v-row no-gutters class="header-6">Do you have any buying/selling agreement with another industry player?</v-row>
    <v-radio-group inline v-model="hasAgreement">
        <v-radio label="Yes" :value=true></v-radio>
        <v-radio label="No" :value=false></v-radio>
    </v-radio-group>

    <template v-if="hasAgreement">
        <v-row no-gutters class="header-4">Industry player with buying/selling agreement</v-row>
        <br/>
        
        <v-expansion-panels>
            <v-expansion-panel
                v-for="(player_item, player_index) in players"
                :key="player_item"
            >
                <v-expansion-panel-title>
                    Industry Player {{ player_item }}
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <v-row no-gutters class="header-6">Agreement type</v-row>
                    <v-radio-group inline v-model="players[player_index].agreement_type">
                        <v-radio label="Buying" value="buying"></v-radio>
                        <v-radio label="Selling" value="selling"></v-radio>
                    </v-radio-group>

                    <v-row no-gutters class="header-6">Industry player</v-row>
                    <v-text-field required density="compact" variant="outlined" v-model="players[player_index].player_name"></v-text-field>

                    <v-row no-gutters class="header-4">Products with buying/selling agreement with</v-row>
                    <v-expansion-panels>
                        <v-expansion-panel
                            v-for="(product_item, product_index) in players[player_index].product"
                            :key="product_item"
                        >
                            <v-expansion-panel-title>
                                Product {{ product_item }}
                            </v-expansion-panel-title>

                            <v-expansion-panel-text>
                                <v-row no-gutters class="header-6">Name of product</v-row>
                                <v-text-field required density="compact" variant="outlined" v-model="players[player_index].product[product_index].name"></v-text-field>

                                <v-row no-gutters class="header-6">Volume</v-row>
                                <v-text-field required density="compact" variant="outlined" v-model="players[player_index].product[product_index].quantity"></v-text-field>

                                <v-row no-gutters class="header-6">Metric Unit</v-row>
                                <v-text-field required density="compact" variant="outlined" v-model="players[player_index].product[product_index].metric"></v-text-field>

                                <v-row no-gutters class="header-6">Price</v-row>
                                <v-text-field required density="compact" variant="outlined"></v-text-field>

                                <v-row no-gutters class="header-6">Term or Duration</v-row>
                                <v-text-field required density="compact" variant="outlined"></v-text-field>
                        
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <br/>
                    <v-btn flat class="text-uppercase" @click="addProducts" width="40%" style="background: #E5E2DA; font-weight: bold;">Add Products</v-btn>
    
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <br/>
        <v-btn flat class="text-uppercase" @click="addIndustryPlayer" width="40%" style="background: #E5E2DA; font-weight: bold;">Add Industry Player</v-btn>
        
    </template>

    <v-divider class="mt-1"/>
    <br/>
    <v-row no-gutters class="header-4">Relationship with industry enabler</v-row>
    <br/>

    <v-expansion-panels>
        <v-expansion-panel
            v-for="(enabler_item, enabler_index) in enablers"
            :key="enabler_item"
        >
            <v-expansion-panel-title>
                Industry Enabler {{ enabler_item }}
            </v-expansion-panel-title>

            <v-expansion-panel-text>
                <v-row no-gutters class="header-6">Which of the following government agencies, local government units, NGOs, or private
                    entities did you receive any assistance with your business?
                </v-row>
                <v-radio-group v-model="enablers[enabler_index].type">
                    <v-radio
                        v-for="item in industry_enablers"
                        :label="item"
                        :value="item"
                    >
                    </v-radio>
                </v-radio-group>

                <v-row no-gutters class="header-6">What is the name of the agency?</v-row>
                <v-text-field required density="compact" variant="outlined" v-model="enablers[enabler_index].name"></v-text-field>

                <v-row no-gutters class="header-6">What kind of support did you receive?</v-row>
                <v-text-field required density="compact" variant="outlined" v-model="enablers[enabler_index].kind_of_support"></v-text-field>

                <v-row no-gutters class="header-6">Name of product with assistance</v-row>
                <v-text-field required density="compact" variant="outlined" v-model="enablers[enabler_index].product"></v-text-field>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
    <br/>
    <v-btn flat class="text-uppercase" @click="addEnabler" width="40%" style="background: #E5E2DA; font-weight: bold;">Add Industry Enabler</v-btn>

</template>

<script>
export default{

data(){
    return {
        hasAgreement: false,
        industry_enabler: '',
        industry_enablers: ['Municipal or City LGU (including local DA, and DSWD)', 'DTI Provicial or Regional Office',
                    'DOST Provincial or Regional Office', 'DAR Provincial or Regional Office', 'DA Provincial or Regional Office',
                    'Other NGAs (ex. BFAR, etc)', 'NGOs (Plan, Oxfam, etc)', 'Private Entities', 'Other Enablers'],

        enablers: [{
            name: null,
            type: null,
            kind_of_support: null,
            product: null,
        }],

        players: [{
            agreement_type: null,
            player_name: null,
            product: [{
                name: null,
                quantity: null,
                metric: null,
            }]
        }],

        errorMessage: null,
    }
},

methods: {
    addEnabler(){
        this.enablers.push({name: null, type: null, kind_of_support: null, product: null});
    },
    addIndustryPlayer(){
        this.players.push({agreement_type: null, player_name: null,
            product: [{
                name: null,
                quantity: null,
                metric: null,
            }]
        })
    },
    addProducts(){
        this.no_of_products++;
    },
},
mounted(){
}
}
</script>