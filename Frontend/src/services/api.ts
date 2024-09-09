import axios from "axios";

const API_URL = "http://localhost:3000"; // URL de base pour l'API

// Fonction pour enregistrer un nouvel utilisateur
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  // Appel API pour l'inscription
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
  });
  return response.data; // Retourne la réponse de l'API
};

// Fonction pour connecter un utilisateur
export const loginUser = async (email: string, password: string) => {
  // Appel API pour la connexion
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data; // Retourne la réponse de l'API
};

// Fonction pour récupérer les événements de la semaine actuelle
export const getEventsForCurrentWeek = async (token: string) => {
  try {
    // Appel API pour obtenir les événements de la semaine
    const response = await axios.get(`${API_URL}/events?week=current`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajoute le token dans les headers
      },
    });
    return response.data; // Retourne les événements récupérés
  } catch (error) {
    throw error; // Lève une erreur en cas d'échec
  }
};

// Fonction pour créer un nouvel événement
export const createEvent = async (token: string, eventData: any) => {
  try {
    // Appel API pour créer un événement
    const response = await axios.post(`${API_URL}/events`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajoute le token pour l'autorisation
      },
    });

    return response.data; // Retourne la réponse de l'API
  } catch (error) {
    throw error; // Lève une erreur en cas d'échec
  }
};

// Fonction pour mettre à jour un événement existant
export const updateEvent = async (
  token: string,
  eventId: number,
  eventData: any
) => {
  try {
    // Appel API pour mettre à jour un événement par ID
    const response = await axios.put(
      `${API_URL}/events/${eventId}`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoute le token pour l'autorisation
        },
      }
    );
    return response.data; // Retourne la réponse de l'API
  } catch (error) {
    throw error; // Lève une erreur en cas d'échec
  }
};
