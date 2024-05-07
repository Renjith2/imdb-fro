import HttpClient from "./HttpClient";

const getMovies = () => {
   let url = "";
   return HttpClient.get(url);
}

const MovieService = {
    getMovies: getMovies
}

export default MovieService;