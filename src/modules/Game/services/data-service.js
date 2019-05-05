import axios from 'axios';

const client = axios.create({
  baseURL: 'https://www.dragonsofmugloar.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 2000
});

export const fetchGame = () => client.post('/api/v2/game/start');

export const fetchAds = gameId => client.get(`/api/v2/${gameId}/messages`);

export const fetchSolveAd = (gameId, adId) =>
  client.post(`/api/v2/${gameId}/solve/${adId}`);
