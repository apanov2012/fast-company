import axios from "axios";
import { toast } from "react-toastify";
// import { apiEndPoint } from "../config.json";

// console.log("apiEndPoint in http service", apiEndPoint);
axios.defaults.baseURL = "http://localhost:4000/api/v1/";
axios.interceptors.response.use(
    (response) => response,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
            toast.error("Something war wrong");
            // toast("Unexpected error!");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
