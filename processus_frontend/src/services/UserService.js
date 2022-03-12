import axios from "axios";

const User_API_BASE_URL="http://localhost:8080/api/v1/user"
class UserService
{
    saveUser(user)
    {
        return axios.post(User_API_BASE_URL,user);
    }

    getUser()
    {
        return axios.get(User_API_BASE_URL);
    }
    deleteEmployee(id)
    {  
        return axios.delete(User_API_BASE_URL + "/" + id);

    }
    getEmployeeById(id)
    {
        return axios.get(User_API_BASE_URL + "/" + id);
    }
    updateEmployee(user,id)
    {
        return axios.put(User_API_BASE_URL + "/" + id, user);
    }

}

export default new EmployeeService();