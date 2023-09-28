import axios from 'axios';
import { addNewProduct, editPlayerProduct } from '@/router/api/productRoutes.js'
import { addNewEnabler } from '@/router/api/enablerRoutes.js'
import { addNewIndustryPlayer } from '@/router/api/industryPlayerRoutes.js'
const URL = import.meta.env.VITE_URL
// const BASE_URL = process.env.VITE_BASE_URL

const addNewBusiness = async (payload) => {
  console.log(URL)
  console.log(payload.address.city_municipality)
  console.log(payload.address.no)
  console.log(payload.address.street)
  try{
    for(let i = 0; i < (payload.roles).length; i++){
      let response = await axios.post(URL + "home/vcmgt/data/input?name=" + payload.name + "&address_no=" + payload.address.no + "&address_street=" + payload.address.street
      + "&address_city_municipality=" + payload.address.city_municipality
      + "&contact_no=" + payload.contact_no + "&email_add=" + payload.email_add 
      + "&type=" + payload.type + "&owner_name=" + payload.owner_name + "&owner_sex_at_birth="+ payload.owner_sex_at_birth
      + "&sector=" + payload.sector + "&role_id=" + payload.roles[i].role_id);
      console.log(response.data)
      /*
      let response = await axios.post(URL + "home/vcmgt/data/input?name=" + payload.name + "&address_no=" + payload.address.no + "&address_street=" + payload.address.street
      + "&address_city_municipality=" + payload.address.city_municipality + "&address_province=" + payload.address.province
      + "&address_region=" + payload.address.region + "&contact_no=" + payload.contact_no + "&email_add=" + payload.email_add 
      + "&type=" + payload.type + "&owner_name=" + payload.owner_name + "&owner_sex_at_birth="+ payload.owner_sex_at_birth
      + "&sector=" + payload.sector + "&role_id=" + payload.roles[i].role_id);
      console.log(response.data)
      */
     
      if(payload.roles[i].products[0].name == null){
        window.alert("The data has been successfully inputted");
        window.location.replace("/home/vcmgt/data/input")
      }

      if(payload.roles[i].enablers[0].name != null){
        saveEnabler(response.data.player_id, payload.roles[i].enablers);
      }

      if(payload.roles[i].hasAgreement){
        saveIndustryPlayers(response.data.player_id, payload.roles[i].players);
      }
      
      for(let j = 0; j < (payload.roles[i].products).length; j++){
        console.log(payload.roles[i].products[j].name);
        
        let response2 = await axios.post(URL + "home/vcmgt/data/input/product?player_id=" + response.data.player_id
          + "&name=" + payload.roles[i].products[j].name
          + "&quantity=" + payload.roles[i].products[j].quantity
          + "&metric=" + payload.roles[i].products[j].metric 
          + "&date=" + payload.roles[i].products[j].date 
          + "&step_by_step_des=" + payload.roles[i].products[j].step_by_step_des
          + "&major_tech_des=" + payload.roles[i].products[j].major_tech_des 
          + "&service_provider_des=" + payload.roles[i].products[j].service_provider_des 
          + "&raw_materials_des=" + payload.roles[i].products[j].raw_materials_des);
        console.log(response2.data);

        for(let k = 0; k < (payload.roles[i].products[j].buyers).length; k++){
          let response3 = await axios.post(URL + "home/vcmgt/data/input/buyer?actor_id=" + response.data.actor_id
            + "&name=" + payload.roles[i].products[j].buyers[k].name
            + "&output_product_id=" + response2.data.product_id 
            + "&quantity=" + payload.roles[i].products[j].buyers[k].quantity
            + "&metric=" + payload.roles[i].products[j].buyers[k].metric);
          console.log(response3.data);
        }
        
        for(let k = 0; k < (payload.roles[i].products[j].majorinputs).length; k++){
          console.log('Kumadi meeee')
          console.log((payload.roles[i].products[j].majorinputs).length);
        
          let response4 = await axios.post(URL + "home/vcmgt/data/input/majorinput?player_product_id=" + response2.data.player_product_id
            + "&name=" + payload.roles[i].products[j].majorinputs[k].name
            + "&input_type=" + payload.roles[i].products[j].majorinputs[k].input_type
            + "&quantity=" + payload.roles[i].products[j].majorinputs[k].quantity
            + "&metric=" + payload.roles[i].products[j].majorinputs[k].metric
            + "&transaction_type=" + payload.roles[i].products[j].majorinputs[k].transaction_type);
          console.log(response4.data);
          console.log(response4.data.input_id);
          
          for(let l = 0; l < (payload.roles[i].products[j].majorinputs[k].suppliers).length; l++){
            let response5 = await axios.post(URL + "home/vcmgt/data/input/supplier?actor_id=" + response.data.actor_id
              + "&name=" + payload.roles[i].products[j].majorinputs[k].suppliers[l].name
              + "&input_product_id=" + response4.data.input_id
              + "&quantity=" + payload.roles[i].products[j].majorinputs[k].suppliers[l].quantity
              + "&metric=" + payload.roles[i].products[j].majorinputs[k].suppliers[l].metric);
            console.log(response5.data);
            console.log(response5.data.status);
          }
          //saveSupplierTransaction(actor_id, response.data.input_id, payload[k].suppliers);
        }

        //saveBuyerTransaction(actor_id, response.data.product_id, payload.products[j].buyers);
        //saveMajorInput(actor_id, response.data.player_product_id, payload.products[j].majorinputs)
      }

      /*
      if(payload.roles[i].products[0].name != null){
        saveProduct(i, (payload.roles).length, response.data.actor_id, response.data.player_id, payload.roles[i]);
      }*/
    }

    return "Success"
    //window.alert("The data has been successfully inputted");
    //window.location.replace("/home/vcmgt/data/input")
  }catch (err){
    //return err.response.data;
  }
}

const getPlayerByRepresentative = async (payload) => {
  console.log(URL)
  console.log(payload)

  try{
    console.log('Sumulod meee')
    let response = await axios.get(URL + "account/status/get_player?user_id=" + payload)
    console.log(response.data)
    return response.data
  }catch(err){

  }
}

const getPlayerByAddress = async (payload) => {
  console.log(URL)
  console.log(payload)

  try{
    let response = await axios.get(URL + "account/status/get_player_by_address?business_address_id=" + payload)
    console.log(response.data)
    return response.data
  }catch(err){

  }
}

const editBusiness = async (payload) => {
  console.log(URL)
  console.log(payload)

  try{
    for(let i = 0; i < (payload.roles).length; i++){
      if(i == 0){
        
        console.log(payload.address.no)
        console.log(payload.address.street)
        console.log(payload.address.city_municipality)

        if(payload.address.no == ''){
          payload.address.no = undefined
        }

        if(payload.address.street == ''){
          payload.address.street = undefined
        }

        let response = await axios.post(URL + "home/vcmgt/data/edit?id=" + payload.id + "&name=" + payload.name + "&address_no=" + payload.address.no + "&address_street=" + payload.address.street
        + "&address_city_municipality=" + payload.address.city_municipality + "&contact_no=" + payload.contact_no + "&email_add=" + payload.email_add 
        + "&type=" + payload.type + "&owner_name=" + payload.owner_name + "&owner_sex_at_birth="+ payload.owner_sex_at_birth
        + "&sector=" + payload.sector + "&role_id=" + payload.roles[i].role_id);
        console.log(response.data)

        //delete all products
        console.log(payload.roles[i].products[0].name);
        console.log(payload.id)
        
        if(payload.roles[i].products[0].name == null){
          //window.alert("The data has been successfully inputted");
          //window.location.replace("/home/vcmgt/data/input")
        }else{
          let delete_product = await axios.post(URL + "home/vcmgt/data/delete?id=" + payload.id);
          console.log(delete_product.data)

          //delete transactions
          //let delete_transaction = await axios.post(URL + "home/vcmgt/data/delete_transaction?actor_id=" + )
          
          for(let j = 0; j < (payload.roles[i].products).length; j++){
            console.log(payload.roles[i].products[j].name);
            
            let response2 = await axios.post(URL + "home/vcmgt/data/input/product?player_id=" + response.data.player_id
              + "&name=" + payload.roles[i].products[j].name
              + "&quantity=" + payload.roles[i].products[j].quantity
              + "&metric=" + payload.roles[i].products[j].metric 
              + "&date=" + payload.roles[i].products[j].date 
              + "&step_by_step_des=" + payload.roles[i].products[j].step_by_step_des
              + "&major_tech_des=" + payload.roles[i].products[j].major_tech_des 
              + "&service_provider_des=" + payload.roles[i].products[j].service_provider_des 
              + "&raw_materials_des=" + payload.roles[i].products[j].raw_materials_des);
            console.log(response2.data);
            
            for(let k = 0; k < (payload.roles[i].products[j].buyers).length; k++){
              let response3 = await axios.post(URL + "home/vcmgt/data/input/buyer?actor_id=" + response.data.actor_id
                + "&name=" + payload.roles[i].products[j].buyers[k].name
                + "&output_product_id=" + response2.data.product_id 
                + "&quantity=" + payload.roles[i].products[j].buyers[k].quantity
                + "&metric=" + payload.roles[i].products[j].buyers[k].metric);
              console.log(response3.data);
            }
            
            for(let k = 0; k < (payload.roles[i].products[j].majorinputs).length; k++){
              console.log('Kumadi meeee')
              console.log((payload.roles[i].products[j].majorinputs).length);
            
              let response4 = await axios.post(URL + "home/vcmgt/data/input/majorinput?player_product_id=" + response2.data.player_product_id
                + "&name=" + payload.roles[i].products[j].majorinputs[k].name
                + "&input_type=" + payload.roles[i].products[j].majorinputs[k].input_type
                + "&quantity=" + payload.roles[i].products[j].majorinputs[k].quantity
                + "&metric=" + payload.roles[i].products[j].majorinputs[k].metric
                + "&transaction_type=" + payload.roles[i].products[j].majorinputs[k].transaction_type);
              console.log(response4.data);
              console.log(response4.data.input_id);
              
              for(let l = 0; l < (payload.roles[i].products[j].majorinputs[k].suppliers).length; l++){
                let response5 = await axios.post(URL + "home/vcmgt/data/input/supplier?actor_id=" + response.data.actor_id
                  + "&name=" + payload.roles[i].products[j].majorinputs[k].suppliers[l].name
                  + "&input_product_id=" + response4.data.input_id
                  + "&quantity=" + payload.roles[i].products[j].majorinputs[k].suppliers[l].quantity
                  + "&metric=" + payload.roles[i].products[j].majorinputs[k].suppliers[l].metric);
                console.log(response5.data);
                console.log(response5.data.status);
              }
            }
          }
        }

        if(payload.roles[i].enablers[0].name != null){
          saveEnabler(response.data.player_id, payload.roles[i].enablers);
        }
  
        if(payload.roles[i].hasAgreement){
          saveIndustryPlayers(response.data.player_id, payload.roles[i].players);
        }
        
      }
    }

    return "Success"
  }catch (err){
    return err.response.data;
  }
}

const getAllPlayers = async () => {
  console.log(URL)
  try{
    let response = await axios.get(URL + "home/vcmgt/data/players")
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data;
  }
}

const saveProduct = async (role_no, role_length, actor_id, player_id, payload) => {
  console.log('Im hereeeeee');
  console.log(player_id);
  console.log(role_no)
  console.log(role_length)
  var res = await addNewProduct(actor_id, player_id, payload)
}

const editProduct = async (actor_id, player_id, payload) => {
  console.log('hellooo edit')
  var res = await editPlayerProduct(actor_id, player_id, payload)
}

const saveEnabler = async (player_id, payload) => {
  var res = await addNewEnabler(player_id, payload)
}

const saveIndustryPlayers = async (player_id, payload) => {
  var res = await addNewIndustryPlayer(player_id, payload)
}

const setRepresentative = async (payload) => {
  console.log("Helooo again Rep")
  console.log(payload.business_name)
  console.log(payload.representative_name)
  console.log(URL)
  try{
    let response = await axios.post(URL + "home/vcmgt/data/set_representative?business_name=" + payload.business_name + "&representative_name=" + payload.representative_name)
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data;
  }
}

const deletePlayer = async (payload) => {
  console.log("Hellooo deleteee")
  console.log(payload)
  try{
    let response = await axios.post(URL + "home/vcmgt/data/delete_player?player_id=" + payload)
    console.log(response.data)
    return response.data.status
  }catch(err){
    return err.response.data;
  }
}

const getPlayer = async (payload) => {
  console.log(payload)
  try{
    let response = await axios.get(URL + "home/vcmgt/data/get_player?player_id=" + payload)
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data
  }
}

export{
  addNewBusiness,
  saveProduct,
  saveEnabler,
  saveIndustryPlayers,
  getAllPlayers,
  setRepresentative,
  deletePlayer,
  getPlayer,
  editBusiness,
  getPlayerByRepresentative,
  getPlayerByAddress
}