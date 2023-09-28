import axios from 'axios';
const URL = import.meta.env.VITE_URL
// const BASE_URL = process.env.VITE_BASE_URL

const addNewEnabler = async (player_id, payload) => {
  console.log(URL)
  try{
    for(let i = 0; i < payload.length; i++){
      let response = await axios.post(URL + "home/vcmgt/data/input/enabler?player_id=" + player_id + "&name=" + payload[i].name 
      + "&type=" + payload[i].type + "&kind_of_support=" + payload[i].kind_of_support + "&product=" + payload[i].product);
      console.log(response.data)
    }
    
    //return response.data
  }catch (err){
    return err.response.data;
  }

}

const getEnablerProduct = async (player_id) => {
  console.log(URL)

  try{
    let response = await axios.get(URL + "home/vcmgt/data/input/get_enabler_product?player_id=" + player_id);
    console.log(response.data)
    return response.data
  }catch (err){
    return err.response.data;
  }
}

const searchEnabler = async (enabler_id) => {
  console.log(URL)
  try{
    let response = await axios.get(URL + "home/vcmgt/data/input/get_enabler?enabler_id=" + enabler_id);
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data
  }
}

export{
    addNewEnabler,
    getEnablerProduct,
    searchEnabler,
}