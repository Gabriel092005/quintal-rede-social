
// import { env } from '@/env'

import  axios  from 'axios'
export const api  = axios.create({
      baseURL:'http://localhost:3333',
      withCredentials:true
})

//baseURL:'https://pna-angola1-2.onrender.com',
    
 

