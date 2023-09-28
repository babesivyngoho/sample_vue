import { createStore } from "vuex"
import { login, register, updateUser, updatePassword, addNewUser, getAllUsers, searchUser, getAllUserType,
    getAllUserPermission, updatePermissions } from '@/router/api/userRoutes.js'
import { searchString, searchPProduct, searchProduct, searchAllProducts, searchPlayer, 
    searchPlayerByProduct, searchFinalPlayer, searchActor, searchAllLocations } from '@/router/api/searchRoutes.js'
import { addNewBusiness, getAllPlayers, setRepresentative, deletePlayer, getPlayer, editBusiness, getPlayerByRepresentative,
    getPlayerByAddress } from '@/router/api/playerRoutes.js'
import { addNewEnabler, getEnablerProduct, searchEnabler } from '@/router/api/enablerRoutes.js'
import { getSupplier, getBuyer } from '@/router/api/transactionRoutes.js'
import { getPlayerProductInput, getInput, getInputByName, getPlayerProductInputByInput,
    getPlayerProductByInput } from '@/router/api/inputRoutes.js'
import { getRegions, getProvinces, getProvinceName, getMunicipalities, getMunicipalityName, 
    getBusinessAddress, getAllMunicipalities } from '@/router/api/addressRoutes.js'

export default createStore({
    state: {
        isAuthenticated: false,
        role: "",
        breadcrumbs: [],
    },

    mutations: {
        setAuthentication(state, status){
            state.isAuthenticated = status
        },
        setRole(state, role){
            state.role = role
        },
        setBreadcrumb(state, crumb){
            state.breadcrumbs.push(crumb)
        },
        setCrumbActive(state, name){
            for(let i=0; i<state.breadcrumbs.length; i++){
                if(state.breadcrumbs[i].title === name){
                    state.breadcrumbs[i].disabled = false
                    break;
                }
            }
        }
    },

    actions: {
        async loginUser( {commit}, user ){

            var res = await login(user)
            console.log(res)
            /*
            console.log(res.permissions)
            if (res.status == 'success'){
                //Temp token
                localStorage.setItem("access_token", "temp_token")
                localStorage.setItem("user_id", res.user_id)
                localStorage.setItem("user_name", res.user.name)
                localStorage.setItem("user_sex_at_birth", res.user.assigned_sex_at_birth)
                localStorage.setItem("user_email", res.user.email)
                localStorage.setItem("user_contact_no", res.user.contact_no)
                localStorage.setItem("user_role", res.user_type[0].name)

                const obj = res.permissions
                const serializedObj = JSON.stringify(obj);
                localStorage.setItem("permissions", serializedObj)
                commit('setAuthentication', true)
                window.location.replace("/home")
            }
            else {
                return res.message
            }
            */

            if (res.status == 'success'){
                localStorage.setItem("access_token", "temp_token")

                const obj = res.permissions
                const serializedObj = JSON.stringify(obj);
                localStorage.setItem("permissions", serializedObj)
                commit('setAuthentication', true)
                window.location.replace("/dashboard")
            }else {
                return res.message
            }
        },
        logoutUser({commit}) {
            localStorage.removeItem("access_token")
            commit('setAuthentication', false)
            window.location.replace("/login")
        },
        async registerUser( {commit}, user){

            var res = await register(user)
            return res.message
            /*
            if (res.status == 'success'){
                window.alert("You are registered successfully!");
                window.location.replace("/login")
            } else {
                return res.message
            }
            */
        },

        async getPlayerProductInput({commit}, player_product_id){
            var res = await getPlayerProductInput(player_product_id)
            console.log(res)
            return res.data
        },

        async addUser({commit}, business){
            var res = await addNewUser(business)
        },

        async searchString({commit}, searchStr){
            console.log(searchStr)
            var res = await searchString(searchStr)
            console.log(res.status)
            console.log(res.actor_data)
            console.log(res.product_data)
            
            if (res.status == 'success'){
                return [res.actor_data, res.product_data]
                //window.location.replace("/home")
            }
            else {
                return res.message
            }
        },

        async searchPlayer({commit}, actor_id){
            console.log(actor_id)
            var res = await searchPlayer(actor_id)
            if (res.status == 'success'){
                console.log(res.data)
                return res.data
                //window.location.replace("/home")
            }
            else {
                return res.message
            }
        },

        async searchUser({commit}, user_id){
            console.log(user_id)
            var res = await searchUser(user_id)
            if (res.status == 'success'){
                console.log(res.data)
                return res.data
                //window.location.replace("/home")
            }
            else {
                return res.message
            }
        },

        async searchFinalPlayer({commit}, player_id){
            console.log(player_id)
            var res = await searchFinalPlayer(player_id)
            if (res.status == 'success'){
                console.log(res.data)
                return res.data
                //window.location.replace("/home")
            }
            else {
                return res.message
            }
        },

        async searchActor({commit}, actor_id){
            //console.log(actor_id)
            var res = await searchActor(actor_id)
            if (res.status == 'success'){
                //console.log(res.data)
                return res.data
                //window.location.replace("/home")
            }
            else {
                return res.message
            }
        },

        async searchPlayerByProduct({commit}, product_id){
            console.log(product_id)
            var res = await searchPlayerByProduct(product_id)
            if (res.status == 'success'){
                console.log(res.data)
                return res.data
                //window.location.replace("/home")
            }
            else {
                return res.message
            }
        },

        async searchPlayerProduct({commit}, player_id){
            console.log(player_id)
            var res = await searchPProduct(player_id)
            console.log(res.status)
            console.log(res.data)
            if (res.status == 'success'){

                return res.data
                //window.location.replace("/home")
            }
            else {
                return res.message
            }
        },

        async getAllUserType(){
            var res = await getAllUserType()
            return res
        },

        async getAllUserPermission(){
            var res = await getAllUserPermission()
            return res
        },

        async searchProduct({commit}, product_id){
            console.log(product_id)
            var res = await searchProduct(product_id)
            console.log(res.status)
            console.log(res.data)
            if (res.status == 'success'){

                return res.data
                //window.location.replace("/home")
            }
            else {
                return res.message
            }
        },

        async getPlayer({commit}, player_id){
            console.log(player_id)
            var res = await getPlayer(player_id)
            console.log(res.data)
            return res.data
        },

        async getInput({commit}, input_id){
            console.log(input_id)
            var res = await getInput(input_id)
            console.log(res.data)
            return res.data
        },

        async getPlayerProductInputByInput({commit}, input_id){
            var res = await getPlayerProductInputByInput(input_id)
            return res.data
        },

        async getPlayerProductByInput({commit}, player_product_id){
            var res = await getPlayerProductByInput(player_product_id)
            return res.data
        },

        async getInputByName({commit}, name){
            console.log(name)
            var res = await getInputByName(name)
            console.log(res.data)
            return res.data
        },

        async searchAllProducts({commit}){
            var res = await searchAllProducts();
            return res
        },

        async searchAllLocations({commit}){
            var res = await searchAllLocations();
            return res
        },

        async getRegions({commit}){
            console.log('Helloo regions')
            var res = await getRegions();
            console.log(res)
            return res
        },

        async getProvinces({commit}, region_id){
            console.log('Helloo provinces')
            var res = await getProvinces(region_id);
            console.log(res)
            return res.data
        },

        async getProvinceName({commit}, province_id){
            console.log(province_id)
            var res = await getProvinceName(province_id);
            console.log(res)
            return res.data
        },

        async getMunicipalities({commit}, province_id){
            console.log(province_id)
            var res = await getMunicipalities(province_id);
            console.log(res)
            return res.data
        },

        async getAllMunicipalities({commit}){
            var res = await getAllMunicipalities()
            console.log(res)
            return res.data
        },

        async getBusinessAddress({commit}, business_address_id){
            console.log(business_address_id)
            var res = await getBusinessAddress(business_address_id)
            console.log(res)
            return res.data
        },

        async getMunicipalityName({commit}, municipality_id){
            console.log(municipality_id)
            var res = await getMunicipalityName(municipality_id);
            console.log(res)
            return res.data
        },

        async getAllUsers({commit}){
            var res = await getAllUsers();
            console.log(res)
            return res
        },

        async getAllPlayers({commit}){
            var res = await getAllPlayers();
            //console.log('Kumadi meee')
            //console.log(res)
            return res
        },

        async setRepresentative({commit}, final_data){
            console.log("Hellooo Rep")
            var res = await setRepresentative(final_data);
            console.log(res.data)
            if(res.status == 'success'){
                return res

            }
        },

        async getPlayerByRepresentative({commit}, user_id){
            console.log("Hellooo get representative")
            var res = await getPlayerByRepresentative(user_id)
            console.log(res.data)
            return res.data
        },

        async getPlayerByAddress({commit}, business_address_id){
            var res = await getPlayerByAddress(business_address_id)
            console.log(res.data)
            return res.data
        },

        async deletePlayer({commit}, player_id){
            console.log("hello delete")
            var res = await deletePlayer(player_id)
            console.log(res.data)
            return res
        },

        async updateProfileUser({commit}, user){

            var res = await updateUser(user)
            console.log(res.status)
            if (res.status == 'success'){
                //Temp token
                // localStorage.setItem("access_token", "temp_token")
                localStorage.setItem("user_name", res.user.name)
                localStorage.setItem("user_sex_at_birth", res.user.assigned_sex_at_birth)
                localStorage.setItem("user_email", res.user.email)
                localStorage.setItem("user_contact_no", res.user.contact_no)
                //commit('setAuthentication', true)
                //Temp role
                //commit('setRole', "Value Chain Data Analyst")
                //window.location.replace("/home")
            }
            else {
                return res.message
            }
            
        },
        async updateUserPassword({commit}, password){
            var res = await updatePassword(password)
            console.log(res.status)
        },

        async addBusiness({commit}, business){
            //var [res, res2] = await Promise.all([addNewBusiness(business), addNewProduct(business)])
            var res = await addNewBusiness(business)

            console.log(res);
            return res
            //console.log(res2.status);
            //localStorage.setItem("player_id", res.player.id)
        },

        async editBusiness({commit}, business){
            var res = await editBusiness(business)
            return res
        },

        async addEnabler({commit}, enabler){
            //console.log(enabler[0].name)
            var res = await addNewEnabler(enabler)
        },

        async getEnablerProduct({commit}, player_id){
            var res = await getEnablerProduct(player_id)
            return res.data
        },

        async searchEnabler({commit}, enabler_id){
            var res = await searchEnabler(enabler_id)
            return res.data
        },

        async addTransaction({commit}, business){
            var res = await addNewTransaction(business)
        },

        async addInput({commit}, business){
            //console.log(business.roles[0].products[0].majorinputs[0].name)

            var res = await addNewInput(business)
            console.log(res.status);
            console.log(res.data);
        },

        async getSupplier({commit}, player_id){
            var res = await getSupplier(player_id)
            return res.data
        },

        async getBuyer({commit}, player_id){
            var res = await getBuyer(player_id)
            return res.data
        },

        async updatePermissions({commit}, data){
            console.log(data)

            var res = await updatePermissions(data)
            console.log(res)
            return res
        }
        
    },

    getters: {
        isAuthenticated: () => () => {
            return localStorage.getItem("access_token") != null
        },
        getRole: (state) => () => {
            return state.role
        },
        getUsername: () => () => {

        },
        getBreadcrumbs: (state) => () => {
            return state.breadcrumbs
        }
    }
})