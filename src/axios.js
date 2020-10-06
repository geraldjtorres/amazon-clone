import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://us-central1-amz-clone-69649.cloudfunctions.net/api' // The Cloud function url
  // http://localhost:5001/amz-clone-69649/us-central1/api
})

export default instance
