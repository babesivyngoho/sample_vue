import axios from 'axios';
import { addNewInput } from '@/router/api/inputRoutes.js'
import { addNewBuyerTransaction } from '@/router/api/transactionRoutes.js';
const URL = import.meta.env.VITE_URL
// const BASE_URL = process.env.VITE_BASE_URL

const search = async (payload) => {
  console.log(URL)
  try{
    let response = await axios.post(URL + "product/search?name=" + payload.username);
    return response.data
  }
  catch (err){
    return err.response.data;
  }
}

const addNewProduct = async (actor_id, player_id, payload) => {
  console.log(URL)
  console.log(player_id);
  
  try{
    console.log(payload.role_id);
    for(let j = 0; j < (payload.products).length; j++){
      
      console.log(payload.products[j].name);
      
      let response = await axios.post(URL + "home/vcmgt/data/input/product?player_id=" + player_id + "&name=" + payload.products[j].name + "&quantity=" + payload.products[j].quantity
        + "&metric=" + payload.products[j].metric + "&date=" + payload.products[j].date + "&step_by_step_des=" + payload.products[j].step_by_step_des
        + "&major_tech_des=" + payload.products[j].major_tech_des + "&service_provider_des=" + payload.products[j].service_provider_des + "&raw_materials_des=" + payload.products[j].raw_materials_des);
      console.log(response.data);
      
      saveBuyerTransaction(actor_id, response.data.product_id, payload.products[j].buyers);
      saveMajorInput(actor_id, response.data.player_product_id, payload.products[j].majorinputs)
    }
  }
  catch (err){
    return err.response.data;
  }
  
}

const editPlayerProduct = async (actor_id, player_id, payload) => {
  for(let i = 0; i < (payload.products).length; i++){
    console.log(payload.products[i].name);
  }
}

const saveMajorInput = async (actor_id, player_product_id, payload) => {
  console.log('Im hereeeeeeeeee input');
  console.log(payload);
  var res = await addNewInput(actor_id, player_product_id, payload);
}

const saveBuyerTransaction = async (actor_id, output_product_id, payload) => {
  console.log('Buyeeeeeeer');
  console.log(payload);
  var res = await addNewBuyerTransaction(actor_id, output_product_id, payload)
}

export{
  addNewProduct,
  editPlayerProduct,
}