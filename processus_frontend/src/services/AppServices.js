import axios from "axios";
const BASE_URL = "http://localhost:8080/login"
class AppServices
{    

    login(user)
    { 
        axios.defaults.withCredentials = 'true';
    axios.defaults.crossDomain = 'true';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['withCredentials'] = 'true';
        return axios.post(BASE_URL,JSON.stringify(user));

    }


}
export default new AppServices();
