import axios from 'axios';
const URL = import.meta.env.VITE_URL
// const BASE_URL = process.env.VITE_BASE_URL

const getRegions = async () => {
  try{
    let response = await axios.get(URL + "home/vcmgt/data/get_regions")
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data;
  }
}

const getProvinces = async (region_id) => {
  try{
    let response = await axios.get(URL + "home/vcmgt/data/get_provinces?region_id=" + region_id)
    return response.data
  }catch(err){
    return err.response.data;
  }
}

const getAllMunicipalities = async () => {
  try{
    let response = await axios.get(URL + "home/vcmgt/data/get_all_municipalities")
    return response.data
  }catch(err){
    return err.response.data
  }
}

const getProvinceName = async (province_id) => {
  try{
    let response = await axios.get(URL + "home/vcmgt/data/get_province_name?province_id=" + province_id)
    return response.data
  }catch(err){
    return err.response.data;
  }
}

const getMunicipalities = async (province_id) => {
  console.log(URL)
  console.log(province_id)
  try{
    let response = await axios.get(URL + "home/vcmgt/data/get_municipalities?province_id=" + province_id)
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data;
  }
}

const getMunicipalityName = async (municipality_id) => {
  console.log(URL)
  console.log(municipality_id)
  try{
    let response = await axios.get(URL + "home/vcmgt/data/get_municipality_name?municipality_id=" + municipality_id)
    console.log(response.data)
    return response.data
  }catch(err){
    return err.response.data;
  }
}

const getBusinessAddress = async (business_address_id) => {
  console.log(URL)
  console.log(business_address_id)
  try{
    let response = await axios.get(URL + "home/vcmgt/data/get_business_address?business_address_id=" + business_address_id)
    console.log(response.data)
    return response.data

  }catch(err){
    return err.response.data;
  }
}


export{
    getRegions,
    getProvinces,
    getProvinceName,
    getMunicipalities,
    getMunicipalityName,
    getBusinessAddress,
    getAllMunicipalities
}