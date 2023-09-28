import axios from 'axios';
const URL = import.meta.env.VITE_URL
// const BASE_URL = process.env.VITE_BASE_URL

const searchString = async (payload) => {
    console.log(URL)
    console.log(payload)
    try{
      //let response = await axios.get(URL + "home/search?business_name=" + payload);
      let response = await axios.get(URL + "home/search?string=" + payload);
      return response.data
    }
    catch (err){
      return err.response.data;
    }
}

const searchPlayer = async (payload) => {
  try{
    let response = await axios.get(URL + "home/search/player?actor_id=" + payload);
    return response.data
  }catch(err){
    return err.response.data;
  }
}

const searchPlayerByProduct = async (payload) => {
  try{
    let response = await axios.get(URL + "home/search/player_by_product?product_id=" + payload);
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data;
  }
}

const searchPProduct = async (payload) => {
  console.log(URL)
  console.log(payload)

  try{
    let response = await axios.get(URL + "home/search/player_product?player_id=" + payload);
    return response.data
  }
  catch (err){
    return err.response.data;
  }
}

const searchProduct = async (payload) => {
  console.log(URL)
  console.log(payload)

  try{
    let response = await axios.get(URL + "home/search/product?product_id=" + payload);
    return response.data
  }
  catch (err){
    return err.response.data;
  }
}

const searchFinalPlayer = async (payload) => {
  console.log(URL)
  console.log(payload)

  try{
    let response = await axios.get(URL + "home/search/final_player?player_id=" + payload);
    return response.data
  }
  catch (err){
    return err.response.data;
  }
}

const searchAllProducts = async () => {
  try{
    let response = await axios.get(URL + "home/search/allproducts");
    return response.data
  }
  catch (err){
    return err.response.data;
  }
}

const searchAllLocations = async () => {
  try{
    let response = await axios.get(URL + "home/search/alllocations");
    return response.data
  }
  catch (err){
    return err.response.data;
  }
}

const searchActor = async (payload) => {
  try{
    let response = await axios.get(URL + "home/search/actor?actor_id=" + payload);
    return response.data
  }
  catch (err){
    return err.response.data;
  }
} 

export{
    searchString,
    searchPProduct,
    searchProduct,
    searchAllProducts,
    searchAllLocations,
    searchPlayer,
    searchPlayerByProduct,
    searchFinalPlayer,
    searchActor,
}