import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://swapi.dev/";

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.data) {
    toast.error("Please check your network conncetion");
  }
  const { status } = error.response;
  if (status === 500) {
    toast.error("Server Error");
  }
  if (error !== null || error !== undefined) {
    throw error.response;
  }
});

const responseBody = (response) => response.data;

const sleep = (delayTime) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), delayTime));

const requests = {
  get: (url) => axios.get(url).then(responseBody)
};

const People = {
    getAllPeople: () => requests.get("api/films/"),
};

const Film = {
  getAllFilms: () => requests.get("api/films/")
};

export default {
  Film,
  People,
  requests
};