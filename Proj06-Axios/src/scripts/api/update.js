import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.2/dist/esm/axios.min.js";
import { logRequest, logResponse, logError } from "../console/logger.js";

export async function updateUser(id, API_URL, updateData) {
    try {
        const numFields = Object.keys(updateData).length;
        const url = `${API_URL}/users?id=${id}`;
        const config = { headers: { 'Content-Type': 'application/json' } };

        const method = numFields === 3 ? 'PUT' : 'PATCH';
        logRequest(method, url, updateData);

        const response = numFields === 3
            ? await axios.put(url, updateData, config)
            : await axios.patch(url, updateData, config);

        logResponse(response.status, response.data);
        return response.data;

    } catch (error) {
        logError(error);
        console.error("Erro na requisição:", error.message);
        alert("Erro ao atualizar: " + error.message);
    }
}