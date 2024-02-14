
'user client'

import { baseUrl } from "./baseUrl";


export const    getUtils = async ()=> {
    const response = await fetch(`${baseUrl}/api/v1/utility/get-data`, {
        
    });
    return response.json();
}