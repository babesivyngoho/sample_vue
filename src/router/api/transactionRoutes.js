import axios from 'axios';
const URL = import.meta.env.VITE_URL
// const BASE_URL = process.env.VITE_BASE_URL

const addNewSupplierTransaction = async (actor_id, input_product_id, payload) => {
  console.log(URL)
  console.log('transaction')

  try{
    for(let k = 0; k < payload.length; k++){
      let response = await axios.post(URL + "home/vcmgt/data/input/supplier?actor_id=" + actor_id + "&name=" + payload[k].name + "&input_product_id=" + input_product_id + "&quantity=" + payload[k].quantity
        + "&metric=" + payload[k].metric);
      console.log(response.data);
      console.log(response.data.status);

      //if(response.data.status === 'Supplier success'){
        //window.alert("The data has been successfully inputted");
        //window.location.replace("/home/vcmgt/data/input")
      //}
    }

    //window.alert("The data has been successfully inputted");
    //window.location.replace("/home/vcmgt/data/input")
  } catch(err) {
    return err.response.data;
  }

}

const getSupplier = async (payload) => {
  try{
    let response = await axios.get(URL + "home/vcmgt/graph/vcplayer/supplier?player_id=" + payload)
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data
  }
}

const getBuyer = async (payload) => {
  try{
    let response = await axios.get(URL + "home/vcmgt/graph/vcplayer/buyer?player_id=" + payload)
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data
  }
}

const addNewBuyerTransaction = async (actor_id, output_product_id, payload) => {
  try{
    for(let k = 0; k < payload.length; k++){
      let response = await axios.post(URL + "home/vcmgt/data/input/buyer?actor_id=" + actor_id + "&name=" + payload[k].name + "&output_product_id=" + output_product_id + "&quantity=" + payload[k].quantity
        + "&metric=" + payload[k].metric);
      console.log(response.data);
      
    }
  }
  catch (err){
    return err.response.data;
  }
  
}

export{
    addNewSupplierTransaction,
    addNewBuyerTransaction,
    getSupplier,
    getBuyer,
}