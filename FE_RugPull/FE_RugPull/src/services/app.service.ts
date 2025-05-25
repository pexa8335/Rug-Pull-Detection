import axios from "axios"
import { DOMAIN } from "../constant/app.constant"
const appService = {
    async detectRugPull(address :string){
        try {
            const response = await axios.get(`${DOMAIN}/${address}`)
            console.log(response);
            return response.data
        } catch(error){

        }
    }
}
export default appService;