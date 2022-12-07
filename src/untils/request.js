import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseUrl: '/',
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = localStorage.getItem('token')
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res) => {
    return Promise.resolve(res)
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service
