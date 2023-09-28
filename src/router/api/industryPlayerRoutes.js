import axios from 'axios';
const URL = import.meta.env.VITE_URL
// const BASE_URL = process.env.VITE_BASE_URL

const addNewIndustryPlayer = async (player_id, payload) => {
  console.log(URL)
  
  try{
    for(let i = 0; i < payload.length; i++){
      console.log('1')
      for(let j = 0; j < (payload[i].product).length; j++){
        console.log('2')
        console.log(player_id)
        console.log(payload[i].agreement_type)
        console.log(payload[i].player_name)
        console.log(payload[i].product[j].name)
        console.log(payload[i].product[j].quantity)
        console.log(payload[i].product[j].metric)
        console.log(payload[i].product[j].price)
        console.log(payload[i].product[j].term_duration)
        
        let response = await axios.post(URL + "home/vcmgt/data/input/industryplayer?player_id=" + player_id + "&agreement_type=" + payload[i].agreement_type 
        + "&player_name=" + payload[i].player_name + "&product_name=" + payload[i].product[j].name + "&quantity=" + payload[i].product[j].quantity
        + "&metric=" + payload[i].product[j].metric + "&price=" + payload[i].product[j].price + "&term_duration=" + payload[i].product[j].term_duration);
        console.log(response.data)
        
      }
    }
    
    //return response.data
  }catch (err){
    return err.response.data;
  }

}



export{
    addNewIndustryPlayer,
}