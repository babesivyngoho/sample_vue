import axios from 'axios';
import { addNewBusiness } from '@/router/api/playerRoutes.js'
const URL = import.meta.env.VITE_URL
// const BASE_URL = process.env.VITE_BASE_URL

const login = async (payload) => {
    console.log(URL)
    try{
      let response = await axios.post(URL + "login?email=" + payload.username + "&password=" + payload.password);
      console.log(response.data)

      return response.data
    }
    catch (err){
      return err.response.data;
    }
}

const register = async (payload) => {
  console.log(URL)
  console.log(payload.name)
  try{
    let response = await axios.post(URL + "register?name=" + payload.name + "&sex_at_birth=" + payload.sex_at_birth
      + "&contact_no=" + payload.contact_no + "&email=" + payload.email + "&password=" + payload.password + "&password_check=" + payload.password_check);
    return response.data
  }
  catch (err){
    return err.response.data;
  }
}

const addNewUser = async (payload) => {
  console.log(URL)
  console.log(payload.representative.name)
  try{
    let response = await axios.post(URL + "home/vcmgt/data/input/representative?name=" + payload.representative.name + "&sex_at_birth=" + payload.representative.sex_at_birth
      + "&contact_no=" + payload.representative.contact_no + "&email=" + payload.representative.email_add + "&password=" + payload.representative.email_add);
    
    savePlayer(response.data.user_id, payload)
      //return response.data
  }
  catch (err){
    return err.response.data;
  }
}

const getAllUsers = async () => {
  console.log(URL)
  try{
    let response = await axios.get(URL + "account/status");
    console.log(response.data)
    return response.data
  }catch (err){
    return err.response.data
  }
}

const getAllUserType = async () => {
  console.log(URL)
  try{
    let response = await axios.get(URL + "account/status/roles");
    console.log(response.data)
    return response.data
  }catch (err){
    return err.response.data
  }
}

const getAllUserPermission = async () => {
  console.log(URL)
  try{
    let response = await axios.get(URL + "account/status/permissions");
    console.log(response.data)
    return response.data
  }catch (err){
    return err.response.data
  }
}

const savePlayer = async (user_id, payload) => {
  var res = await addNewBusiness(user_id, payload)
}

const searchUser = async (payload) => {
  console.log(URL)
  console.log(payload)

  try{
    let response = await axios.get(URL + "home/vcmgt/data/user?user_id=" + payload);
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data
  }
}

const updateUser = async (payload) => {
  console.log(URL)
  
  console.log(payload.name)
  console.log(payload.sex_at_birth);
  console.log(payload.email);
  console.log(payload.contact_no);

  try{
    let response = await axios.post(URL + "account/change/profile?id=" + payload.id + "&name=" + payload.name + "&sex_at_birth=" + payload.sex_at_birth + 
      "&email=" + payload.email + "&contact_no=" + payload.contact_no);
    console.log(response.data)
    return response.data
  }
  catch (err){
    return err.response.data;
  }
}

const updatePassword = async (payload) => {
  console.log(URL)
  console.log(payload.id)
  console.log(payload.oldPassword)
  console.log(payload.newPassword)
  console.log(payload.newPassword2)

  try{
    let response = await axios.post(URL + "account/change/password?id=" + payload.id + "&old_password=" + payload.oldPassword + "&new_password=" + payload.newPassword +
      "&new_password_confirm=" + payload.newPassword2);
    console.log(response.data)
    return response.data
  }
  catch (err){
    return err.response.data;
  }
}

const updatePermissions = async (payload) => {
  console.log(URL)
  console.log(payload)
  
  try{
    
    let deleteResponse = await axios.post(URL + "account/delete_permissions")
    console.log(deleteResponse)

    for(let i = 0; i < payload.length; i++){
      let response = await axios.post(URL + "account/update_permissions?user_type_id=" + payload[i].user_type_id + "&permission_id=" + payload[i].permission_id)
    }
    return "Success"
  }catch (err){
    return err.response.data
  }
  
}

export{
    login,
    register,
    updateUser,
    updatePassword,
    addNewUser,
    getAllUsers,
    searchUser,
    getAllUserType,
    getAllUserPermission,
    updatePermissions
}