import axios from 'axios';

const client = axios.create({
  baseURL: 'https://www.dragonsofmugloar.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

export const fetchGame = () => client.post('/api/v2/game/start');

export const fetchAds = gameId => client.get(`/api/v2/${gameId}/messages`);

export const fetchSolveAd = (gameId, adId) =>
  client.post(`/api/v2/${gameId}/solve/${adId}`);

export const fetchItems = gameId => client.get(`/api/v2/${gameId}/shop`);

export const fetchBuyItem = (gameId, itemId) =>
  client.post(`/api/v2/${gameId}/shop/buy/${itemId}`);
