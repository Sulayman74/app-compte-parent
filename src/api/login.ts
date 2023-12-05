const BASE_URL = "http://localhost:3001/api/v1";

export const login = async (user: any) => {
  const body = JSON.stringify(user);

  try {
    const login = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body,
    });
    const data = await login.json();
    console.log("test21", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
};

