
const BASE_URL = "http://localhost:3001/api/v1";

const getPaiementByUser = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/payment/user/${id}`,
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

// auth.js

const getUserIDFromToken = (token: any) => {
    // Supposons que votre token JWT a une structure { "userId": "123", ... }
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décodage du payload du JWT
    return decodedToken.userId;
};

export { getUserIDFromToken, getPaiementByUser };

