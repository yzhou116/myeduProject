import axios from 'axios'
import cookie from 'js-cookie'


const service = axios.create({
  baseURL: 'http://localhost:9001', 
  timeout: 10000000 
})
service.interceptors.request.use(
  config=>{
    if(cookie.get('yiedu-user')){
      config.headers['token'] = cookie.get('yiedu-user');
    }
    return config
  },
  err=>{
    return Promise.reject(err)
  })
export default service
