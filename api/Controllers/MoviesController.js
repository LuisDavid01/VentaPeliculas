import MoviesService from "../services/MoviesService.js";
const moviesService = new MoviesService;
class MoviesController {
 
 
    async createMovie(req, res) {
      try {
        const Movie = await moviesService.createMovie(req.body);
        res.status(201).json(Movie);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

    async getMovie(req, res){
        try{
            const Movies = await moviesService.getMovies(req.params.id);
            if(!Movies) res.status(404).json({error: 'not found'});
            res.status(201).json(Movies);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async UpdateMovie(req, res){
        try{
            const Movies = await moviesService.updateMovie(req.params.id, req.body);
            if(!Movies) res.status(404).json({error: 'not found'});
            res.status(201).json(Movies);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async DeleteMovie(req, res){
        try{
            const Movies = await moviesService.deleteMovie(req.params.id);
            if(!Movies) res.status(404).json({error: 'not found'});
            res.status(201).json(Movies);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}

export default MoviesController;