<template>
    <v-row class="pt-5">
        <v-col cols="3">
            <v-row justify="center">
                <v-card class="img-style" flat variant="outlined">
                    <!-- <v-file-input class="icon-style" accept="image/*" hide-input prepend-icon="mdi-pencil"></v-file-input> -->
                    <v-icon class="icon-style" @click="showDialog=true">mdi-pencil</v-icon>
                </v-card>
                
                <template>
                    <v-dialog v-model="showDialog" width="500">
                        <v-card class="px-2 pb-2">
                            <cropper ref="cropper" class="cropper" @change="change" :src="image.src" />
                            <div class="button-wrapper">
                                <button class="button" @click="$refs.file.click()">
                                    <input
                                        type="file"
                                        ref="file"
                                        @change="uploadImage($event)"
                                        accept="image/*"
                                    />
                                    Upload image
                                </button>
                                <button v-show="!(image.src===null)" class="button" @click="cropImage()">Crop image</button>
                            </div>
                        </v-card>
                    </v-dialog>
                </template>

            </v-row>
            <v-row class="pt-5" justify="center">
                {{ role.toUpperCase() }}
            </v-row>
        </v-col>

        <v-col cols="6">
            <v-row justify="space-between">
                <v-col no-gutters class="header-4" cols="9">
                    Profile Details
                </v-col>

                <template v-if="!edit_profile">
                    <v-btn color="#BAD4AF" flat class="ma-3" @click="edit_profile = true">Edit</v-btn>
                </template>
            </v-row>
            <br/>
            <v-form>
                <template v-if="edit_profile">
                    <v-form>
                        <v-text-field variant="outlined" label="Name of the User" v-model="user.name">
                            <v-icon class="custom-button"/>
                        </v-text-field> 
                        
                        <v-row no-gutters class="header-6">Assigned sex at birth</v-row>
                        <v-radio-group  v-model="user.sex_at_birth">
                            <v-radio label="Male" value="Male"></v-radio>
                            <v-radio label="Female" value="Female"></v-radio>
                        </v-radio-group>

                        <v-text-field variant="outlined" label="Email Address" v-model="user.email">
                            <v-icon class="custom-button"/>
                        </v-text-field>

                        <v-text-field variant="outlined" label="Contact Number" v-model="user.contact_no">
                            <v-icon class="custom-button"/>
                        </v-text-field>
                    </v-form>
                    <v-row justify="end">
                        <v-btn color="#BAD4AF" class="ma-3" flat @click="updateProfile" name="profile">Save</v-btn>
                        <v-btn color="#CECECE" class="ma-3" flat @click="edit_profile = false">Cancel</v-btn>
                    </v-row>
                    
                </template>
                
                <template v-else>
                    <v-form readonly>
                        <v-text-field variant="outlined" label="Name of the User" v-model="user.name">
                            <v-icon class="custom-button"/>
                        </v-text-field> 
                        
                        <v-row no-gutters class="header-6">Assigned sex at birth</v-row>
                        <v-radio-group  v-model="user.sex_at_birth">
                            <v-radio label="Male" value="Male"></v-radio>
                            <v-radio label="Female" value="Female"></v-radio>
                        </v-radio-group>

                        <v-text-field variant="outlined" label="Email Address" v-model="user.email">
                            <v-icon class="custom-button"/>
                        </v-text-field>

                        <v-text-field variant="outlined" label="Contact Number" v-model="user.contact_no">
                            <v-icon class="custom-button"/>
                        </v-text-field>
                    </v-form>
                </template>
                <br/>
            </v-form>

            <v-divider class="mt-1"/>
            <br/>

            <v-form class="pt-5">
                <v-row justify="space-between">
                    <v-col no-gutters class="header-4" cols="9">
                        Change Password
                    </v-col>
                    <template v-if="!edit_password">
                        <v-btn color="#BAD4AF" class="ma-3" flat @click="edit_password = true">Edit</v-btn>
                    </template>
                </v-row>
                <br/>

                <template v-if="edit_password">
                    <v-text-field variant="outlined" label="Old Password" v-model="password.oldPassword">
                        <v-icon class="custom-button" :icon="showOldPw ? 'mdi-eye' : 'mdi-eye-off'" @click="showOldPw = !showOldPw"/>
                    </v-text-field> 
                    <br/>
                    <v-text-field variant="outlined" label="New Password" v-model="password.newPassword">
                        <v-icon class="custom-button" :icon="showNewPw ? 'mdi-eye' : 'mdi-eye-off'" @click="showNewPw = !showNewPw"/>
                    </v-text-field>
                    <br/>

                    <v-text-field variant="outlined" label="Re-enter Password" v-model="password.newPassword2">
                        <v-icon class="custom-button" :icon="showNewPw2 ? 'mdi-eye' : 'mdi-eye-off'" @click="showNewPw2 = !showNewPw2"/>
                    </v-text-field> 
                </template>

                <v-form v-else readonly>
                    <v-text-field variant="outlined" label="Password" v-model="password.oldPassword">
                        <v-icon class="custom-button" :icon="showOldPw ? 'mdi-eye' : 'mdi-eye-off'" @click="showOldPw = !showOldPw"/>
                    </v-text-field> 
                    <br/>
                </v-form>
                
            </v-form>
            <template v-if="edit_password">
                <v-row justify="end">
                    <v-btn color="#BAD4AF" class="ma-3" flat @click="updatePassword" name="password">Save</v-btn>
                    <v-btn color="#CECECE" class="ma-3" flat @click="edit_password = false">Cancel</v-btn>
                </v-row>
            </template>
        </v-col>
    </v-row>
</template>
<script>
// import { defineComponent } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
    components: {
		Cropper,
	},
    data(){
        return {
            edit_profile: false,
            edit_password: false,
            showDialog: false,
            showOldPw: false,
            showNewPw: false,
            showNewPw2: false,
            role: "Value Chain Analyst",
            image: {
                // src:
                // "https://images.unsplash.com/photo-1619737307100-55b82496fcda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                src: null,
                type: "image/jpg",
            },
            user: {
                id: null,
                name: null,
                sex_at_birth: null,
                contact_no: null,
                email: null,
            },
            password: {
                id: null,
                oldPassword: null,
                newPassword: null,
                newPassword2: null,
            },
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
		change(result) {
            console.log(result);
        },
        cropImage() {
            const result = this.$refs.cropper.getResult();
            const newTab = window.open();
            newTab.document.body.innerHTML = `<img src="${result.canvas.toDataURL(
                this.image.type
            )}"></img>`;
        },
        uploadImage(event) {
            /// Reference to the DOM input element
            const { files } = event.target;
            // Ensure that you have a file before attempting to read it
            if (files && files[0]) {
                // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
                if (this.image.src) {
                    URL.revokeObjectURL(this.image.src);
                }
                // 2. Create the blob link to the file to optimize performance:
                const blob = URL.createObjectURL(files[0]);

                // 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
                this.image = {
                    src: blob,
                    type: files[0].type,
                };
            }
        },
        async updateProfile(){
            this.errorMessage = await this.$store.dispatch('updateProfileUser', this.user);
        },
        async updatePassword(){
            console.log(this.user.id)
            this.errorMessage = await this.$store.dispatch('updateUserPassword', this.password);
        },
        getData(){
            this.user.id = localStorage.getItem("user_id");
            this.password.id = localStorage.getItem("user_id");
            this.user.name = localStorage.getItem("user_name");
            this.user.sex_at_birth = localStorage.getItem("user_sex_at_birth");
            this.user.email = localStorage.getItem("user_email");
            this.user.contact_no = localStorage.getItem("user_contact_no");  
        },
	},
    unmounted() {
        // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) {
            URL.revokeObjectURL(this.image.src);
        }
    },
}
</script>
<style lang="scss" scoped>
.custom-button {
    position: absolute;
    right: 10px;
    z-index: 2;
    border: none;
    cursor: pointer;
    background-color: transparent;
}
.img-style{
    height: 20vh;
    width: 20vh;
}
.icon-style{
    position: absolute;
    top: 5px;
    right: 5px;
}

.cropper {
  max-height: 500px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}

.button {
  color: rgb(37, 19, 19);
  font-size: 16px;
  padding: 10px 20px;
  width: 100%;
  background: #ffffff;
  cursor: pointer;
  transition: background 0.5s;
  border: 1px solid black;
  &:not(:last-of-type) {
    margin-right: 10px;
  }
  &:hover {
    background: #bdbdbd;
  }
  input {
    display: none;
  }
}
</style>