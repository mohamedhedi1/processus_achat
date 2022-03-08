import axios from "axios";
const BASE_URL = "http://localhost:8080/login"
class AppServices
{
    login(user)
    {
        return axios.post(BASE_URL,user);

    }


}
export default new AppServices();
