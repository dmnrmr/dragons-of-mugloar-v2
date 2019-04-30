import axios from 'axios';

const client = axios.create({
  baseURL: 'https://www.dragonsofmugloar.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const fetchGame = () => client.post('/api/v2/game/start');

export const fetchMessages = gameId =>
  client.post(`/api/v2/${gameId}/messages`);
