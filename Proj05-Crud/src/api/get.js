export async function getUsers(API_URL) {
    const cards = document.getElementById('cards');
    
    try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();

        if (!data.users || data.users.length === 0) {
            cards.innerHTML = '<span class="noUser">No user found</span>';
            return;
        }

        cards.innerHTML = '';
        
        data.users.forEach(user => {
            cards.innerHTML += `
                <section class="card">
                    <div class="card-body">
                        <h1>${user.name}</h1>
                        <div class="card-field">
                            <span class="label">idade</span>
                            <span class="value">${user.age}</span>
                        </div>
                        <div class="card-field">
                            <span class="label">email</span>
                            <span class="value">${user.email}</span>
                        </div>
                    </div>
                    <div class="buttonContainer">
                        <button class="editButton" onclick="editUser(${user.id})">Editar</button>
                        <button class="deleteButton" onclick="deleteUser(${user.id})">Deletar</button>
                    </div>
                </section>
            `;
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        cards.innerHTML = '<span class="noUser">Error loading users</span>';
    }
}