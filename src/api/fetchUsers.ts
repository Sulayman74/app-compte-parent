

const BASE_URL = "http://localhost:3001/api/v1";

export const getUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`,
            {
                method: "GET",
                headers: { 'Content-type': 'application/json' },

            }

        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        throw error;
    }
};
