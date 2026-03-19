import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.2/dist/esm/axios.min.js";
import { logRequest, logResponse, logError } from "../console/logger.js";

export async function deleteUser(id, API_URL) {

    logRequest('DELETE', `${API_URL}/users/${id}`);

    try {

        const response = await axios.delete(`${API_URL}/users/${id}`);
        logResponse(response.status, response.data);
        return response.data;

    } catch (error) {

        logError(error);
        throw error;
        
    }
}