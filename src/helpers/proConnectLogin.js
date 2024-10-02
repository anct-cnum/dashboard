import axios from 'axios';

/**
 * Gère le processus de connexion ProConnect
 * @param {string} verificationToken - Le jeton de vérification pour le processus de connexion
 * @param {function} setLoading - Fonction pour définir l'état de chargement
 * @param {function} setNetworkError - Fonction pour définir l'état d'erreur réseau
 * @returns {Promise<void>}
 */
export async function handleProConnectLogin(verificationToken, setLoading, setNetworkError) {
  const nonce = Math.random().toString(36).substring(7);
  const state = Math.random().toString(36).substring(7);
  localStorage.setItem('nonce', nonce);
  localStorage.setItem('state', state);
  setLoading(true);
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/create-url`, {
      verificationToken,
      nonce,
      state,
    });
    if (response.data) {
      window.location.href = response.data.authorizationUrl;
    }
  } catch (error) {
    setNetworkError(true);
  } finally {
    setLoading(false);
  }
}
