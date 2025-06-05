import axios from "axios"
const authApi = {}
const BASEURL = " http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com"
authApi.login = (username) => {
  return axios.post(`${BASEURL}/api/V1/auth/login`, username)
}

export default authApi