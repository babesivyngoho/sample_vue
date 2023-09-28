import axios from 'axios';
import { addNewSupplierTransaction } from "@/router/api/transactionRoutes.js"
const URL = import.meta.env.VITE_URL
// const BASE_URL = process.env.VITE_BASE_URL

const addNewInput = async (actor_id, player_product_id, payload) => {
  console.log(URL)
  
  try{
    for(let k = 0; k < payload.length; k++){
      console.log(payload[k].name);
    
      let response = await axios.post(URL + "home/vcmgt/data/input/majorinput?player_product_id=" + player_product_id + "&name=" + payload[k].name + "&input_type=" + payload[k].input_type
        + "&quantity=" + payload[k].quantity + "&metric=" + payload[k].metric + "&transaction_type=" + payload[k].transaction_type);
      console.log(response.data);
      console.log(response.data.input_id);
      
      saveSupplierTransaction(actor_id, response.data.input_id, payload[k].suppliers);
    }
  }
  catch (err){
    return err.response.data;
  }
}

const saveSupplierTransaction = async (actor_id, input_product_id, payload) => {
  var res = await addNewSupplierTransaction(actor_id, input_product_id, payload)
}

const getPlayerProductInput = async (player_product_id) => {
  console.log(URL)
  console.log(player_product_id)

  try{
    let response = await axios.get(URL + "home/vcmgt/data/input/player_product_input?player_product_id=" + player_product_id);
    console.log(response.data)
    return response.data
  }catch(err){

  }
}

const getInput = async (input_id) => {
  console.log(URL)

  try{
    let response = await axios.get(URL + "home/vcmgt/data/get_input?input_id=" + input_id);
    console.log(response.data)
    return response.data
  }catch(err){

  }
}

const getInputByName = async (name) => {
  console.log(URL)
  try{
    let response = await axios.get(URL + "home/vcmgt/graph/products/get_input_name?name=" + name);
    console.log(response.data)
    return response.data
  }catch(err){

  }
}

const getPlayerProductInputByInput = async (input_id) => {
  console.log(URL)

  try{
    let response = await axios.get(URL + "home/vcmgt/graph/products/get_ppinput_by_input?input_id=" + input_id);
    console.log(response.data)
    return response.data
  }catch(err){

  }
}

const getPlayerProductByInput = async (player_product_id) => {
  console.log(URL)

  try{
    let response = await axios.get(URL + "home/vcmgt/graph/products/get_pproduct_by_input?player_product_id=" + player_product_id);
    console.log(response.data)
    return response.data
  }catch(err){

  }
}

export{
    addNewInput,
    getPlayerProductInput,
    getInput,
    getInputByName,
    getPlayerProductInputByInput,
    getPlayerProductByInput,
}