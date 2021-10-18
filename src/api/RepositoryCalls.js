import axios from 'axios';

const REACT_APP_API_URL = 'https://api.github.com/';

const instance = axios.create({
  baseURL: REACT_APP_API_URL,
});

export async function getRepositoriesOfUser(userName) {
  const response = await instance.get(`/users/${userName}/repos`);
  return response;
}

export async function getRepository([userName, repoName]) {
  const response = await instance.get(`/repos/${userName}/${repoName}`);
  return response;
}
