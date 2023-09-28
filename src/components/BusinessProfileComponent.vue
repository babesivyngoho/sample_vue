<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    
    <br/>
    
    <v-row no-gutters class="header-6">Name of business</v-row>
      <v-text-field :rules="[v => !!v || 'This field is required']" required 
        density="compact" variant="outlined" v-model="business.name">
      </v-text-field>
    <v-row no-gutters class="header-6">Business Type</v-row>

    <v-radio-group :rules="[v => !!v || 'This field is required']" required v-model="business.type">
      <v-radio 
        v-for="item in types"
        :label="item.name"
        :value="item.id">
      </v-radio>
    </v-radio-group>

    <template v-if="business.type === 'Other'">
      <v-text-field  class="textfield-style" :rules="[v => !!v || 'This field is required']" required density="compact" variant="outlined" label="Specify other."></v-text-field>
    </template>
    
    <v-row no-gutters class="header-6">Business Contact Number</v-row>
    <v-text-field density="compact" variant="outlined" v-model="business.contact_no"></v-text-field>

    <v-row no-gutters class="header-6">Business Email Address</v-row>
    <v-text-field density="compact" variant="outlined" v-model="business.email_add"></v-text-field>

    <v-divider class="mt-1"/>
    <v-row no-gutters class="header-4">Business Address</v-row>
    <br/>

    <v-row no-gutters class="header-6">No.</v-row>
    <v-text-field density="compact" variant="outlined" v-model="business.address.no"></v-text-field>
    
    <v-row no-gutters class="header-6">Street</v-row>
    <v-text-field density="compact" variant="outlined" v-model="business.address.street"></v-text-field>
    
    <v-row no-gutters class="header-6">Region</v-row>
    
    <v-autocomplete class="form-style"
      :items="regions_data"
      item-title="name"
      item-value="id"
      v-model="selectedRegion"
      placeholder="Select"
      density="compact"
      variant="outlined"
    ></v-autocomplete>

    <v-row no-gutters class="header-6">Province</v-row>
    
    <v-autocomplete class="form-style"
      :items="provinces_data"
      item-title="name"
      item-value="id"
      v-model="selectedProvince"
      placeholder="Select"
      density="compact"
      variant="outlined"
    ></v-autocomplete>

    <v-row no-gutters class="header-6">City/Municipality</v-row>

    <v-autocomplete class="form-style"
      :items="municipalities_data"
      item-title="name"
      item-value="id"
      v-model="selectedMunicipality"
      placeholder="Select"
      density="compact"
      variant="outlined"
    ></v-autocomplete>
    
    <v-divider class="mt-1"/>
    <v-row no-gutters class="header-6">Are you the owner of the business</v-row>
    <v-radio-group inline v-model="isOwner">
        <v-radio label="Yes" :value=true></v-radio>
        <v-radio label="No" :value=false></v-radio>
    </v-radio-group>

    <template v-if="!isOwner">
        <v-row no-gutters class="header-6">Name of the owner</v-row>
        <v-text-field :rules="[v => !!v || 'This field is required']" required
          density="compact" variant="outlined" v-model="business.owner_name"></v-text-field>

        <v-row no-gutters class="header-6">Assigned sex at birth</v-row>
        <v-radio-group inline :rules="[v => !!v || 'This field is required']" required v-model="business.owner_sex_at_birth">
            <v-radio label="Male" value="Male"></v-radio>
            <v-radio label="Female" value="Female"></v-radio>
        </v-radio-group>
    </template>

    <v-row no-gutters class="header-6">Sector</v-row>
    <v-radio-group inline :rules="[v => !!v || 'This field is required']" required v-model="business.sector">
        <v-radio label="Agriculture" value="Agriculture"></v-radio>
        <v-radio label="Fisheries" value="Fisheries"></v-radio>
    </v-radio-group>
    
    <v-row no-gutters class="header-4">What is your role in the value chain or in the (e.g. bangus) industry?</v-row>

    <v-expansion-panels>
      <v-expansion-panel
        v-for="(role_items, role_index) in business.roles"
        :key="role_items"
      >
        <v-expansion-panel-title hide-actions>
          Role {{ role_index + 1}}
          <template v-if="is_view == null">
            <v-icon large @click="removeRole(role_index)"> mdi-close-circle </v-icon>
          </template>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-radio-group v-model="business.roles[role_index].role_id">
            <v-radio
              v-for="item in roles"
              :label="item.name"
              :value="item.id"
            >
            </v-radio>
          </v-radio-group>
          
          <template v-if="business.roles[role_index].role_id === 1 || business.roles[role_index].role_id === 2 || business.roles[role_index].role_id === 3">

            <template v-if="business.roles[role_index].role_id === 1">
              <v-row no-gutters class="header-4">Name the top three products you are producing</v-row>
              <br/>
            </template>
            <template v-else-if="business.roles[role_index].role_id === 2">
              <v-row no-gutters class="header-4">Name the top three products you are processing</v-row>
              <br/>
            </template>
            <template v-else-if="business.roles[role_index].role_id === 3">
              <v-row no-gutters class="header-4">Name the top three products you are trading</v-row>
              <br/>
            </template>

            <v-expansion-panels>
              <v-expansion-panel 
                v-for="(product_items, product_index) in business.roles[role_index].products"
                :key="product_items"
              >
                <v-expansion-panel-title hide-actions>
                  Product {{ product_index + 1 }}
                  <template v-if="is_view == null">
                    <v-icon large @click="removeProduct(role_index, product_index)"> mdi-close-circle </v-icon>                  
                  </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                  <v-row no-gutters class="header-6">Name of the Product</v-row>
                  <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].name"></v-text-field>

                  <template v-if="business.roles[role_index].role_id === 1 || business.roles[role_index].role_id === 2">
                    <v-row no-gutters class="header-6">Quantity per instance (i.e. production season/cycle)</v-row>
                    <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].quantity"></v-text-field>

                    <v-row no-gutters class="header-6">Metric Unit</v-row>
                    <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].metric"></v-text-field>

                    <v-row no-gutters class="header-6">Date of the most recent production/processing activity of the product</v-row>
                    <v-text-field
                      v-model="business.roles[role_index].products[product_index].date"
                      type="date"
                    ></v-text-field>

                    <v-divider class="mt-1"/>
                    <v-row no-gutters class="header-4">Activities in making the product</v-row>
                    <br/>

                    <v-row no-gutters class="header-6">Describe step by step how the product is made (Must be chronological order (i.e. Cleaning,
                        Slicing, Drying, Baking, Straining, etc.))</v-row>
                    <v-textarea required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].step_by_step_des"></v-textarea>

                    <v-row no-gutters class="header-6">Describe the major technology/ies used in making the product (i.e. Drying Machine, Fish Cage,
                        Plow, Harvester, Oven, etc.)</v-row>
                    <v-textarea required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].major_tech_des"></v-textarea>

                    <v-row no-gutters class="header-6">Describe the service providers you contacted for assistance (Labor, Transport, Deliveries, etc.)</v-row>
                    <v-textarea required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].service_provider_des"></v-textarea>

                    <v-row no-gutters class="header-6">Describe the raw materials you used in making the product (Plastic sacks, rice, etc.)</v-row>
                    <v-textarea required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].raw_materials_des"></v-textarea>
                  </template>

                  <template v-else>
                    <v-row no-gutters class="header-6">Quantity traded per instance (i.e. trading season/cycle)</v-row>
                    <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].quantity"></v-text-field>

                    <v-row no-gutters class="header-6">Metric Unit</v-row>
                    <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].metric"></v-text-field>

                    <v-row no-gutters class="header-6">Date of the most recent trading activity of the product</v-row>
                    <v-text-field
                      v-model="business.roles[role_index].products[product_index].date"
                      type="date"
                    ></v-text-field>

                    <v-divider class="mt-1"/>
                    <v-row no-gutters class="header-4">Activities in trading the product</v-row>
                    <br/>

                    <v-row no-gutters class="header-6">Describe the major technology/ies used in trading this product (i.e. Sealer, Drying machine, etc.)</v-row>
                    <v-textarea required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].major_tech_des"></v-textarea>

                    <v-row no-gutters class="header-6">Describe the service providers you contacted for assistance in trading this product (Labor, Transport, Deliveries, etc.)</v-row>
                    <v-textarea required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].service_provider_des"></v-textarea>

                    <v-row no-gutters class="header-6">Describe the raw materials you used in trading the product (Plastic sacks, rice, etc.)</v-row>
                    <v-textarea required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].raw_materials_des"></v-textarea>
                  </template>

                  <v-expansion-panels>
                    <v-expansion-panel
                        v-for="(major_items, major_index) in business.roles[role_index].products[product_index].majorinputs"
                        :key="major_items"
                    >
                    <v-expansion-panel-title hide-actions>
                      <v-row no-gutters class="header-4">Major Input {{ major_index + 1 }}</v-row>
                      <template v-if="is_view == null">
                        <v-icon large @click="removeMajorInput(role_index, product_index, major_index)"> mdi-close-circle </v-icon>
                      </template>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                      <v-row no-gutters class="header-6">Describe major input {{ major_index + 1 }}</v-row>
                      <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].majorinputs[major_index].name"></v-text-field>
                      
                      <v-row no-gutters class="header-6">Input Type</v-row>
                      <v-radio-group v-model="business.roles[role_index].products[product_index].majorinputs[major_index].input_type">
                        <v-radio label="Technology or Machines" value="Technology or Machines"></v-radio>
                        <v-radio label="Service Providers (Labor, Transport, Deliveries, etc)" value="Service Providers (Labor, Transport, Deliveries, etc)"></v-radio>
                        <v-radio label="Raw Materials" value="Raw Materials"></v-radio>
                      </v-radio-group>

                      <v-row no-gutters class="header-6">Quantity per instance (i.e. production season/cycle)</v-row>
                      <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].majorinputs[major_index].quantity"></v-text-field>

                      <v-row no-gutters class="header-6">Metric Unit</v-row>
                      <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].majorinputs[major_index].metric"></v-text-field>

                      <template v-if="business.roles[role_index].role_id === 3">
                        <v-row no-gutters class="header-6">Transaction type</v-row>

                        <v-radio-group v-model="business.roles[role_index].products[product_index].majorinputs[major_index].transaction_type">
                          <v-radio label="Retail Transaction" value="Retail Transaction"></v-radio>
                          <v-radio label="Wholesale Transaction" value="Wholesale Transaction"></v-radio>
                        </v-radio-group>
                      </template>

                      <v-expansion-panels>
                        <v-expansion-panel
                          v-for="(supp_items, supp_index) in business.roles[role_index].products[product_index].majorinputs[major_index].suppliers"
                          :key="supp_items"
                        >
                          <v-expansion-panel-title hide-actions>
                            <v-row no-gutters class="header-4">Supplier {{ supp_index + 1 }}</v-row>
                            <template v-if="is_view == null">
                              <v-icon large @click="removeSupplier(role_index, product_index, major_index, supp_index)"> mdi-close-circle </v-icon>
                            </template>
                          </v-expansion-panel-title>
                          <v-expansion-panel-text>
                            <v-row no-gutters class="header-6">Name of Supplier (Name of person/group/cooperative/establishment - could be yourself as Supplier
                                for the next processing)</v-row>
                            <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].majorinputs[major_index].suppliers[supp_index].name"></v-text-field>

                            <template v-if="business.roles[role_index].role_id === 3">
                              <v-row no-gutters class="header-6">Quantity of supplies/products bought from this supplier</v-row>
                            </template>

                            <template v-else>
                              <v-row no-gutters class="header-6">Quantity of supplies/products bought</v-row>
                            </template>
                            
                            <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].majorinputs[major_index].suppliers[supp_index].quantity"></v-text-field>

                            <v-row no-gutters class="header-6">Metric Unit</v-row>
                            <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].majorinputs[major_index].suppliers[supp_index].metric"></v-text-field>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>
                                  
                      <br/>
                      <template v-if="is_view == null">
                        <v-btn flat class="text-uppercase" @click="addSupplier(role_index, product_index, major_index)" width="30%" style="background: #E5E2DA; font-weight: bold;">Add Supplier</v-btn>
                      </template>
                    </v-expansion-panel-text>
                  </v-expansion-panel>

                  <v-expansion-panel 
                    v-for="(buyer_items, buyer_index) in business.roles[role_index].products[product_index].buyers"
                    :key="buyer_items"
                  >
                    <v-expansion-panel-title hide-actions>
                      <v-row no-gutters class="header-4">Buyer {{ buyer_index + 1 }}</v-row>
                      <template v-if="is_view == null">
                        <v-icon large @click="removeBuyer(role_index, product_index, buyer_index)"> mdi-close-circle </v-icon>                      
                      </template>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                      <v-row no-gutters class="header-6">Name of Buyer (Name of person/group/cooperative/establishment - could be yourself as Supplier
                          for the next processing)</v-row>
                      <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].buyers[buyer_index].name"></v-text-field>

                      <v-row no-gutters class="header-6">Quantity of products sold</v-row>
                      <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].buyers[buyer_index].quantity"></v-text-field>

                      <v-row no-gutters class="header-6">Metric Unit</v-row>
                      <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].buyers[buyer_index].metric"></v-text-field>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>

                <template v-if="business.roles[role_index].role_id === 3">
                  <br/>
                  <v-row no-gutters class="header-6">Describe the activities/steps when buying and selling the product</v-row>
                  <v-textarea required density="compact" variant="outlined" v-model="business.roles[role_index].products[product_index].activities_step_des"></v-textarea>
                </template>
                <br/>
                
                <template v-if="is_view == null">
                  <v-row>
                    <v-col>
                      <v-btn flat class="text-uppercase" @click="addMajorInput(role_index, product_index)" width="100%" style="background: #E5E2DA; font-weight: bold;">Add Major Input</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn flat class="text-uppercase" @click="addBuyer(role_index, product_index)" width="100%" style="background: #E5E2DA; font-weight: bold;">Add Buyer</v-btn>
                    </v-col>
                  </v-row>
                </template>
                
              </v-expansion-panel-text>
                  
            </v-expansion-panel>         
          </v-expansion-panels>

          <br/>
          <template v-if="is_view == null">
            <v-btn flat class="text-uppercase" @click="addProduct(role_index)" width="30%" style="background: #E5E2DA; font-weight: bold;">Add Product</v-btn>
          </template>
          
          <br/>
          <br/>

          <v-divider class="mt-1"/>
          <div class="text-left">
            <h3>Networking</h3>
          </div>
          <br/>
            
          <v-row no-gutters class="header-6">Do you have any buying/selling agreement with another industry player?</v-row>
          <v-radio-group inline v-model="business.roles[role_index].hasAgreement">
              <v-radio label="Yes" :value=true></v-radio>
              <v-radio label="No" :value=false></v-radio>
          </v-radio-group>

            <template v-if="business.roles[role_index].hasAgreement">
                <v-row no-gutters class="header-4">Industry player with buying/selling agreement</v-row>
                <br/>
                
                <v-expansion-panels>
                    <v-expansion-panel
                        v-for="(player_item, player_index) in business.roles[role_index].players"
                        :key="player_item"
                    >
                      <v-expansion-panel-title hide-actions>
                          Industry Player {{ player_index + 1 }}
                          <template v-if="is_view == null">
                            <v-icon large @click="removeIndustryPlayer(role_index, player_index)"> mdi-close-circle </v-icon>                          
                          </template>
                      </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <v-row no-gutters class="header-6">Agreement type</v-row>
                            <v-radio-group inline v-model="business.roles[role_index].players[player_index].agreement_type">
                                <v-radio label="Buying" value="buying"></v-radio>
                                <v-radio label="Selling" value="selling"></v-radio>
                            </v-radio-group>

                            <v-row no-gutters class="header-6">Industry player</v-row>
                            <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].players[player_index].player_name"></v-text-field>

                            <v-row no-gutters class="header-4">Products with buying/selling agreement with</v-row>
                            <v-expansion-panels>
                                <v-expansion-panel
                                    v-for="(product_item, product_index) in business.roles[role_index].players[player_index].product"
                                    :key="product_item"
                                >
                                    <v-expansion-panel-title hide-actions>
                                        Product {{ product_index + 1 }}
                                        <template v-if="is_view == null">
                                          <v-icon large @click="removeIndustryProduct(role_index, player_index, product_index)"> mdi-close-circle </v-icon>                                        
                                        </template>
                                    </v-expansion-panel-title>

                                    <v-expansion-panel-text>
                                        <v-row no-gutters class="header-6">Name of product</v-row>
                                        <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].players[player_index].product[product_index].name"></v-text-field>

                                        <v-row no-gutters class="header-6">Volume</v-row>
                                        <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].players[player_index].product[product_index].quantity"></v-text-field>

                                        <v-row no-gutters class="header-6">Metric Unit</v-row>
                                        <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].players[player_index].product[product_index].metric"></v-text-field>

                                        <v-row no-gutters class="header-6">Price</v-row>
                                        <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].players[player_index].product[product_index].price"></v-text-field>

                                        <v-row no-gutters class="header-6">Term or Duration</v-row>
                                        <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].players[player_index].product[product_index].term_duration"></v-text-field>
                                
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                            <br/>
                            <template v-if="is_view == null">
                              <v-btn flat class="text-uppercase" @click="addIndustryPlayerProducts(role_index, player_index)" width="40%" style="background: #E5E2DA; font-weight: bold;">Add Products</v-btn>
                            </template>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
                <br/>
                <template v-if="is_view == null">
                  <v-btn flat class="text-uppercase" @click="addIndustryPlayer(role_index)" width="40%" style="background: #E5E2DA; font-weight: bold;">Add Industry Player</v-btn>
                </template>
            </template>

            <v-divider class="mt-1"/>
            <br/>
            <v-row no-gutters class="header-4">Relationship with industry enabler</v-row>
            <br/>

            <v-expansion-panels>
                <v-expansion-panel
                    v-for="(enabler_item, enabler_index) in business.roles[role_index].enablers"
                    :key="enabler_item"
                >
                    <v-expansion-panel-title hide-actions>
                        Industry Enabler {{ enabler_index + 1 }}
                        <template v-if="is_view == null">
                          <v-icon large @click="removeEnabler(role_index, enabler_index)"> mdi-close-circle </v-icon>
                        </template>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                        <v-row no-gutters class="header-6">Which of the following government agencies, local government units, NGOs, or private
                            entities did you receive any assistance with your business?
                        </v-row>
                        <v-radio-group v-model="business.roles[role_index].enablers[enabler_index].type">
                            <v-radio
                                v-for="item in industry_enablers"
                                :label="item"
                                :value="item"
                            >
                            </v-radio>
                        </v-radio-group>

                        <v-row no-gutters class="header-6">What is the name of the agency?</v-row>
                        <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].enablers[enabler_index].name"></v-text-field>

                        <v-row no-gutters class="header-6">What kind of support did you receive?</v-row>
                        <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].enablers[enabler_index].kind_of_support"></v-text-field>

                        <v-row no-gutters class="header-6">Name of product with assistance</v-row>
                        <v-text-field required density="compact" variant="outlined" v-model="business.roles[role_index].enablers[enabler_index].product"></v-text-field>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <br/>
            <template v-if="is_view == null">
              <v-btn flat class="text-uppercase" @click="addEnabler(role_index)" width="40%" style="background: #E5E2DA; font-weight: bold;">Add Industry Enabler</v-btn>
            </template>
          </template>

        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    
    <br/>

    <v-row>
      <template v-if="is_view == null">
      
        <v-col>
          <v-btn flat class="text-uppercase" @click="addRole" width="100%" style="background: #E5E2DA; font-weight: bold;">Add Role</v-btn>
        </v-col>
        <v-col>
          <v-btn flat class="text-uppercase" @click="openDialog" width="100%" style="background: #BAD4AF; font-weight: bold;">Save</v-btn>
        
          <v-dialog
            v-model="dialog"
            width="auto"
          >
            <v-card flat
                hover height="100%" class="card-outter"
            >
              <v-card-text v-if="id_player == null">
                Are you sure you want to add?
              </v-card-text>
              <v-card-text v-else>
                Are you sure you want to edit?
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions class="card-actions">
                  <v-btn
                      flat
                      style="background: #E5E2DA"
                      @click="savePlayer"
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
            v-model="add_dialog"
            width="auto"
          >
            <v-card flat
                hover height="100%" class="card-outter"
            >
              <v-card-text>
                Business added successfully
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions class="card-actions">
                  <v-btn
                      flat
                      style="background: #E5E2DA"
                      @click="successfullySave"
                  >
                      Okay
                  </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="edit_dialog"
            width="auto"
          >
            <v-card flat
                hover height="100%" class="card-outter"
            >
              <v-card-text>
                Business updated successfully
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions class="card-actions">
                  <v-btn
                      flat
                      style="background: #E5E2DA"
                      @click="successfullySave"
                  >
                      Okay
                  </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          
        </v-col>
      </template>
    </v-row>    
  </v-form>
</template>

<script>

import NetworkingComponent from "@/components/NetworkingComponent.vue"

export default{
  props: ['id_player', 'is_view', 'is_edit'],
  components: {
    NetworkingComponent,
  },
  data(){
      return {
          isOwner: true,
          types: [{id: 1, name: 'Sole Proprietorship'}, {id: 2, name: 'Cooperative'}, {id: 3, name: 'Association'}, {id: 4, name: 'Other'}],
          roles: [{id: 1, name: 'Primary Production (e.g. Farming)', value: 'producing'}, {id: 2, name: 'Primary Processing', value: 'processing'},
                  {id: 3, name: 'Trading', value: 'trading'}],

          business: {
            id: this.id_player,
            name: null,
            address: {
              no: null,
              street: null,
              city_municipality: null,
              province: null,
              region: null,
            },
            contact_no: null,
            email_add: null,
            type: null,
            owner_name: null,
            owner_sex_at_birth: null,
            sector: null,
            roles: [{
              role_id: null,
              products: [{
                name: null,
                quantity: null, 
                metric: null,
                date: null,
                step_by_step_des: null,
                major_tech_des: null,
                service_provider_des: null,
                raw_materials_des: null,
                majorinputs: [{
                  name: null,
                  input_type: null,
                  quantity: null,
                  metric: null,
                  transaction_type: null,
                  suppliers: [{
                    name: null,
                    quantity: null,
                    metric: null,
                  }],
                }],
                buyers: [{
                  name: null,
                  quantity: null,
                  metric: null,
                  product: null,
                }],
                activities_step_des: null,
              }],
              enablers: [{
                name: null,
                type: null,
                kind_of_support: null,
                product: null,
              }],
              hasAgreement: false,
              players: [{
                agreement_type: null,
                player_name: null,
                product: [{
                  name: null,
                  quantity: null,
                  metric: null,
                  price: null,
                  term_duration: null,
                }]
              }],
            }],
            is_active: true,
          },

          errorMessage: null,
          player_data: null,
          actor_data: null,
          business_address_data: null,
          input_data: null,
          supplier_data: null,
          supplier_name: null,
          buyer_data: null,
          buyer_name: null,
          industry_player_name: null,
          industry_product_data: null,
          enabler_name: null,
          player_product_data: null,
          player_product_input_data: null,
          product_data: null,
          enabler_product_data: null,
          industry_supplier_data: null,
          industry_buyer_data: null,

          data: [],
          dialog: false,
          add_dialog: false,
          edit_dialog: false,
          regions_data: [],
          provinces_data: [],
          municipalities_data: [],
          selectedRegion: null,
          selectedProvince: null,
          selectedMunicipality: null,
          province_name: null,
          municipality_name: null,

          hasAgreement: false,
          industry_enabler: '',
          industry_enablers: ['Municipal or City LGU (including local DA, and DSWD)', 'DTI Provicial or Regional Office',
            'DOST Provincial or Regional Office', 'DAR Provincial or Regional Office', 'DA Provincial or Regional Office',
            'Other NGAs (ex. BFAR, etc)', 'NGOs (Plan, Oxfam, etc)', 'Private Entities', 'Other Enablers'],
      }
  },
  beforeMount(){
    if(this.id_player != null){
      this.getPlayer(this.id_player)
    }
    this.getRegions()
  },
  watch: {
    selectedRegion: function (newValue){
      console.log(newValue)

      if(this.is_view == null){
        this.selectedProvince = null
        this.selectedMunicipality = null
      }
      this.provinces_data = []
      this.getProvinces(newValue)
    },

    selectedProvince: function (newValue){
      console.log(newValue)
      if(this.is_view == null){
        this.selectedMunicipality = null
      }

      this.municipalities_data = []
      this.getMunicipalities(newValue)
    },

    selectedMunicipality: function (newValue){
      console.log(this.selectedRegion)
      console.log(this.selectedProvince)
      console.log(this.selectedMunicipality)
    }
  },
  methods: {
    async getRegions(){
      this.regions_data = await(this.$store.dispatch('getRegions'))
      console.log(this.regions_data)
    },

    async getProvinces(region_id){
      this.provinces_data = await(this.$store.dispatch('getProvinces', region_id))
    },

    async getMunicipalities(province_id){
      this.municipalities_data = await(this.$store.dispatch('getMunicipalities', province_id))
    },

    openDialog(){
      this.dialog = true;
    },

    editBusiness(){
      console.log('Hellooo edit')
    },
    //view and edit
    async getPlayer(player_id){
      this.player_data = await this.$store.dispatch('getPlayer', player_id);
      this.actor_data = await this.$store.dispatch('searchActor', this.player_data[0].actor_id)

      //name, type, contact number, & email address
      this.business.name = this.actor_data[0].name
      this.business.type = this.player_data[0].business_type_id
      this.business.contact_no = this.checkIfNull(this.player_data[0].business_contact_no)
      this.business.email_add = this.checkIfNull(this.player_data[0].business_email_add)
      
      this.business_address_data = await this.$store.dispatch('getBusinessAddress', this.player_data[0].business_address_id)
      
      this.business.address.no = this.checkIfNull(this.business_address_data[0].business_address_no)
      this.business.address.street = this.checkIfNull(this.business_address_data[0].business_address_street)

      this.business.address.city_municipality = await this.$store.dispatch('getMunicipalityName', this.business_address_data[0].municipality_city_id)
      console.log(this.business.address.city_municipality[0].name)

      this.business.address.province = await this.$store.dispatch('getProvinceName', this.business.address.city_municipality[0].province_id)
      console.log(this.business.address.province[0].name)

      this.business.address.region = this.business.address.province[0].region_id

      this.selectedRegion = this.business.address.region
      this.selectedProvince = this.business.address.province
      this.selectedMunicipality = this.business.address.city_municipality
      
      if(this.player_data[0].owner_name != null && this.player_data[0].owner_name != 'null'){
        console.log(this.player_data[0].owner_name)
        this.isOwner = false
        this.business.owner_name = this.player_data[0].owner_name
        this.business.owner_sex_at_birth = this.player_data[0].owner_sex_at_birth
      }
      
      this.business.sector = this.player_data[0].sector
      this.business.roles[0].role_id = this.player_data[0].role_id
      
      this.player_product_data = await this.$store.dispatch('searchPlayerProduct', player_id)
      console.log(this.player_product_data)
      
      var supplier_industry_player = [];
      var buyer_industry_player = [];

      for(let i = 0; i < (this.player_product_data).length; i++){
        if(i != 0){
          this.addProduct(0)
        }
          
        this.product_data = await this.$store.dispatch('searchProduct', this.player_product_data[i].product_id)
        console.log(this.product_data)
        this.business.roles[0].products[i].name = this.product_data[0].name

        this.business.roles[0].products[i].quantity = this.player_product_data[i].product_quantity
        this.business.roles[0].products[i].metric = this.player_product_data[i].product_metric
        this.business.roles[0].products[i].date = this.player_product_data[i].product_date
        this.business.roles[0].products[i].step_by_step_des = this.player_product_data[i].step_by_step_des
        this.business.roles[0].products[i].major_tech_des = this.player_product_data[i].major_tech_des
        this.business.roles[0].products[i].service_provider_des = this.player_product_data[i].service_provider_des
        this.business.roles[0].products[i].raw_materials_des = this.player_product_data[i].raw_materials_des

        this.player_product_input_data = await this.$store.dispatch('getPlayerProductInput', this.player_product_data[i].id)
        console.log(this.player_product_input_data)
        console.log((this.player_product_input_data).length)

        for(let j = 0; j < (this.player_product_input_data).length; j++){
          if(j != 0){
            this.addMajorInput(0, i)
          }

          this.input_data = await this.$store.dispatch('getInput', this.player_product_input_data[j].input_id)
          console.log(this.input_data)

          this.business.roles[0].products[i].majorinputs[j].name = this.input_data[0].name
          this.business.roles[0].products[i].majorinputs[j].input_type = this.input_data[0].input_type
          this.business.roles[0].products[i].majorinputs[j].quantity = this.player_product_input_data[j].quantity
          this.business.roles[0].products[i].majorinputs[j].metric = this.player_product_input_data[j].metric
          this.business.roles[0].products[i].majorinputs[j].transaction_type = this.player_product_input_data[j].transaction_type

          this.supplier_data = await this.$store.dispatch('getSupplier', this.player_data[0].actor_id)
          console.log(this.supplier_data)

          var supplier_ctr = 0;
          
          for(let k = 0; k < (this.supplier_data).length; k++){
            console.log(this.supplier_data[k].input_product_id)
            console.log(this.input_data[0].id)
            if(this.supplier_data[k].input_product_id === this.input_data[0].id){
              if(supplier_ctr != 0){
                this.addSupplier(0, i, j)
              }
              this.supplier_name = await this.$store.dispatch('searchActor', this.supplier_data[k].supplier_actor_id)

              this.business.roles[0].products[i].majorinputs[j].suppliers[supplier_ctr].name = this.supplier_name[0].name
              this.business.roles[0].products[i].majorinputs[j].suppliers[supplier_ctr].quantity = this.supplier_data[k].quantity
              this.business.roles[0].products[i].majorinputs[j].suppliers[supplier_ctr].metric = this.supplier_data[k].metric
              supplier_ctr++;
            }
              
            if(this.supplier_data[k].price !== null){
              this.business.roles[0].hasAgreement = true;
              if(supplier_industry_player.includes(this.supplier_data[k].supplier_actor_id)){
              
              }else{
                supplier_industry_player.push(this.supplier_data[k].supplier_actor_id)
              }
            }

          }
          console.log(supplier_industry_player)
        }

        this.buyer_data = await this.$store.dispatch('getBuyer', this.player_data[0].actor_id)
        console.log(this.buyer_data)

        var buyer_ctr = 0;

        for(let j = 0; j < (this.buyer_data).length; j++){
          if(this.buyer_data[j].output_product_id === this.product_data[0].id){
            if(buyer_ctr != 0){
              this.addBuyer(0, i)
            }

            this.buyer_name = await this.$store.dispatch('searchActor', this.buyer_data[j].actor_id)

            this.business.roles[0].products[i].buyers[buyer_ctr].name = this.buyer_name[0].name
            this.business.roles[0].products[i].buyers[buyer_ctr].quantity = this.buyer_data[j].quantity
            this.business.roles[0].products[i].buyers[buyer_ctr].metric = this.buyer_data[j].metric
            buyer_ctr++;
          }

          if(this.buyer_data[j].price !== null){
            console.log('Kumadi meee')
            this.business.roles[0].hasAgreement = true;
            if(buyer_industry_player.includes(this.buyer_data[j].actor_id)){
            
            }else{
              buyer_industry_player.push(this.buyer_data[j].actor_id)
            }
          }
        }
      }
      //enabler
      this.enabler_product_data = await this.$store.dispatch('getEnablerProduct', player_id);
      console.log(this.enabler_product_data)

      var enabler_ctr = 0;

      for(let i = 0; i < (this.enabler_product_data).length; i++){
        if(enabler_ctr != 0){
          this.addEnabler(0)
        }

        this.enabler_name = await this.$store.dispatch('searchEnabler', this.enabler_product_data[i].enabler_id)
        console.log(this.enabler_name)

        this.business.roles[0].enablers[enabler_ctr].name = this.enabler_name[0].name
        this.business.roles[0].enablers[enabler_ctr].type = this.enabler_name[0].type_of_organization
        this.business.roles[0].enablers[enabler_ctr].kind_of_support = this.enabler_product_data[i].kind_of_support
        this.business.roles[0].enablers[enabler_ctr].product = this.enabler_product_data[i].product
        enabler_ctr++;
      }

      var industry_player_ctr = 0;

      //supplier industry player 
      for(let i = 0; i < supplier_industry_player.length; i++){
        
        if(industry_player_ctr != 0){
          this.addIndustryPlayer(0)
        }
        console.log(supplier_industry_player[i])
        this.industry_supplier_data = await this.$store.dispatch('getBuyer', supplier_industry_player[i])
        console.log(this.industry_supplier_data)
        
        var industry_product_ctr = 0;

        for(let j = 0; j < (this.industry_supplier_data).length; j++){
          this.industry_product_data = await this.$store.dispatch('getInput', this.industry_supplier_data[j].input_product_id)
          this.industry_player_name = await this.$store.dispatch('searchActor', this.industry_supplier_data[j].supplier_actor_id)
        
          this.business.roles[0].players[industry_player_ctr].agreement_type = 'buying'
          this.business.roles[0].players[industry_player_ctr].player_name = this.industry_player_name[0].name

          if(industry_product_ctr != 0){
            this.addIndustryPlayerProducts(0, i)
          }
          this.business.roles[0].players[industry_player_ctr].product[industry_product_ctr].name = this.industry_product_data[0].name
          this.business.roles[0].players[industry_player_ctr].product[industry_product_ctr].quantity = this.industry_supplier_data[j].quantity
          this.business.roles[0].players[industry_player_ctr].product[industry_product_ctr].metric = this.industry_supplier_data[j].metric
          this.business.roles[0].players[industry_player_ctr].product[industry_product_ctr].price = this.industry_supplier_data[j].price
          this.business.roles[0].players[industry_player_ctr].product[industry_product_ctr].term_duration = this.industry_supplier_data[j].term_duration
          industry_product_ctr++
        }
        industry_player_ctr++
      }

      //buyer industry player
      /*
      console.log(buyer_industry_player)
      for(let i = 0; i < buyer_industry_player.length; i++){
        
        if(industry_player_ctr != 0){
          this.addIndustryPlayer(0)
        }
        console.log(buyer_industry_player[i])
        this.industry_buyer_data = await this.$store.dispatch('getBuyer', buyer_industry_player[i])
        console.log(this.industry_buyer_data)
        
        var industry_product_ctr = 0;

        for(let j = 0; j < (this.industry_buyer_data).length; j++){
          this.industry_product_data = await this.$store.dispatch('searchProduct', this.industry_buyer_data[j].output_product_id)
          this.industry_player_name = await this.$store.dispatch('searchActor', this.industry_supplier_data[j].supplier_actor_id)
        
          this.business.roles[0].players[industry_player_ctr].agreement_type = 'selling'
          this.business.roles[0].players[industry_player_ctr].player_name = this.industry_player_name[0].name

          if(industry_product_ctr != 0){
            this.addIndustryPlayerProducts(0, i)
          }
          this.business.roles[0].players[industry_player_ctr].product[industry_product_ctr].name = this.industry_product_data[0].name
          this.business.roles[0].players[industry_player_ctr].product[industry_product_ctr].quantity = this.industry_supplier_data[j].quantity
          this.business.roles[0].players[industry_player_ctr].product[industry_product_ctr].metric = this.industry_supplier_data[j].metric
          this.business.roles[0].players[industry_player_ctr].product[industry_product_ctr].price = this.industry_supplier_data[j].price
          this.business.roles[0].players[industry_player_ctr].product[industry_product_ctr].term_duration = this.industry_supplier_data[j].term_duration
          industry_product_ctr++
        }
        industry_player_ctr++
      }
      */
    },
    checkIfNull(value){
      if(value == 'null'){
        return null
      }else{
        return value
      }
    },
    addMajorInput(role_index, product_index){
      this.business.roles[role_index].products[product_index].majorinputs.push({name: null, input_type: null, quantity: null, metric: null, transaction_type: null,
        suppliers: [{}]
      });
    },
    removeMajorInput(role_index, product_index, major_index){
      this.business.roles[role_index].products[product_index].majorinputs.splice(major_index, 1)
    },
    addSupplier(role_index, product_index, major_index){
      this.business.roles[role_index].products[product_index].majorinputs[major_index].suppliers.push({name: null, quantity: null, metric: null, input_name: null});
    },
    removeSupplier(role_index,product_index, major_index, supp_index){
      this.business.roles[role_index].products[product_index].majorinputs[major_index].suppliers.splice(supp_index, 1);
    },
    addBuyer(role_index, product_index){
      this.business.roles[role_index].products[product_index].buyers.push({name: null, quantity: null, metric: null});
    },
    removeBuyer(role_index, product_index, buyer_index){
      this.business.roles[role_index].products[product_index].buyers.splice(buyer_index, 1)
    },
    addProduct(role_index){
      this.business.roles[role_index].products.push({name: null, quantity: null, metric: null, date: null,
        majorinputs: [{
          name: null,
          quantity: null,
          metric: null,
          transaction_type: null,
          suppliers: [{

          }],
        }],
        buyers: [{

        }],
      });
    },
    removeProduct(role_index, product_index){
      this.business.roles[role_index].products.splice(product_index, 1);
    },
    addRole(){
      this.business.roles.push({
        role_id: null, 
        products: [{
          name: null,
          quantity: null,
          metric: null,
          date: null,
          majorinputs: [{
            name: null,
            quantity: null,
            metric: null,
            transaction_type: null,
            suppliers: [{}]
          }],
          buyers: [{}],
        }],
        enablers: [{
          name: null,
          type: null,
          kind_of_support: null,
          product: null,
        }],
        hasAgreement: false,
        players: [{
          agreement_type: null,
          player_name: null,
          product: [{
            name: null,
            quantity: null,
            metric: null,
            price: null,
            term_duration: null,
          }]
        }],
      });
    },

    removeRole(role_index){
      this.business.roles.splice(role_index, 1);
    },

    async savePlayer(){
      /*
      if(this.isOwner){
        console.log(this.isOwner)
        this.business.owner_name = this.business.representative.name
        this.business.owner_sex_at_birth = this.business.representative.sex_at_birth
      }
      */
      if(this.id_player != null){
        console.log('Edit')
        this.business.address.city_municipality = this.selectedMunicipality

        this.errorMessage = await this.$store.dispatch('editBusiness', this.business);
        //this.errorMessage = await this.$store.dispatch('addBusiness', this.business);
        if(this.errorMessage == 'Success'){
          this.edit_dialog = true
          this.dialog = false
          //window.alert("The data has been successfully inputted");
          //window.location.replace("/home/vcmgt/data/input")
        }
      }else{
        //console.log('Add')
        console.log(this.business.address.no)
        console.log(this.business.address.street)
        this.business.address.city_municipality = this.selectedMunicipality
        //this.business.address.province = this.selectedProvince
        //this.business.address.region = this.selectedRegion
        this.errorMessage = await this.$store.dispatch('addBusiness', this.business);
        console.log(this.errorMessage)



        if(this.errorMessage == 'Success'){
          this.add_dialog = true
          this.dialog = false
          //window.alert("The data has been successfully inputted");
          //window.location.replace("/home/vcmgt/data/input")
        }
        
      }
    },

    successfullySave(){
      window.location.replace("/home/vcmgt/data/input")
    },

    addEnabler(role_index){
      this.business.roles[role_index].enablers.push({name: null, type: null, kind_of_support: null, product: null});
    },
    removeEnabler(role_index, enabler_index){
      this.business.roles[role_index].enablers.splice(enabler_index, 1)
    },
    addIndustryPlayer(role_index){
      this.business.roles[role_index].players.push({agreement_type: null, player_name: null,
        product: [{
          name: null,
          quantity: null,
          metric: null,
        }]
      })
    },
    removeIndustryPlayer(role_index, player_index){
      this.business.roles[role_index].players.splice(player_index, 1);
    },
    addIndustryPlayerProducts(role_index, player_index){
      this.business.roles[role_index].players[player_index].product.push({name: null, quantity: null, metric: null});
    },
    removeIndustryProduct(role_index, player_index, product_index){
      this.business.roles[role_index].players[player_index].product.splice(product_index, 1);
    }
  },
    mounted(){
  }
}
</script>

<style>
  .textfield-style {
    width: 50%;
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