
'user client'

import { useRouter } from "next/navigation";
import { baseUrl } from "./baseUrl";


export const getUtils = async ()=> {
    const response = await fetch(`${baseUrl}/api/v1/utility/get-data`, {
        
    });
    return response.json();
}

export function  logout(responseData: any) {
    console.log("testing logout", responseData) 
    if (responseData === "715") { 
        const router = useRouter()       
        localStorage.clear()
        router.push("/login")
        // logout();
        return
      }
    
}