export async function getUsers(API_URL) {
    try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}