import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.2/dist/esm/axios.min.js";
import { logRequest, logResponse, logError } from "../console/logger.js";

export async function postUser(name, age, email, API_URL) {

    const body = { name, age: parseInt(age), email };
    logRequest('POST', `${API_URL}/users`, body);

    try {

        const response = await axios.post(`${API_URL}/users`, body);
        logResponse(response.status, response.data);
        return response.data;

    } catch (error) {

        logError(error);
        throw error;
        
    }
}