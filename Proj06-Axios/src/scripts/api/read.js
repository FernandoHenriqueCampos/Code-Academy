import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.2/dist/esm/axios.min.js";
import { logRequest, logResponse, logError } from "../console/logger.js";

export async function getUsers(API_URL) {

    logRequest('GET', `${API_URL}/users`);

    try {

        const response = await axios.get(`${API_URL}/users`);
        logResponse(response.status, response.data);
        return response.data;

    } catch (error) {

        logError(error);
        throw error;
        
    }
}