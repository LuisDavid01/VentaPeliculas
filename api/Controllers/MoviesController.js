import MoviesService from "../services/MoviesService.js";
import SecurityService from "../services/SecurityService.js";
const securityService = new SecurityService;
const moviesService = new MoviesService;
class MoviesController {
 
 /*
  * Crear una pelicula
*/
    async createMovie(req, res) {
      try {
		const token = securityService.verifyToken(req);
		if(!token) return res.status(401).json({error: 'token not verify'})
			const movieData = {
				...req.body,
				file : req.file
			}
        const Movie = await moviesService.createMovie(movieData);

        res.status(201).json(Movie);
      } catch (err) {

        res.status(500).json({ error: err.message });
      }
    }
/*
 * Obtener una pelicula por id
*/
    async getMovie(req, res){
        try{
            const Movies = await moviesService.getMovie(req.params.id);
            if(!Movies) res.status(404).json({error: 'not found'});

            res.status(201).json(Movies);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Obtener todas las peliculas
*/
    async getMovies(req, res){
        try{
            const Movies = await moviesService.getMovies();
            if(!Movies) res.status(404).json({error: 'not found'});

            res.status(201).json(Movies);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
/*
 * Actualizar una pelicula por id
*/
    async UpdateMovie(req, res){
        try{
		
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})
			const movieData = {
				...req.body,
				file : req.file
			}

		    const Movies = await moviesService.updateMovie(req.params.id, movieData);
            if(!Movies) return res.status(404).json({error: 'not found'});

            return res.status(201).json(Movies);
        }catch(err){

            res.status(500).json({error: err.message});
        }
    }
/*
 * Eliminar una pelicula por id
*/
    async DeleteMovie(req, res){
        try{
			const token = securityService.verifyToken(req);
			if(!token) return res.status(401).json({error: 'token not verify'})
		    const Movies = await moviesService.deleteMovie(req.params.id);
            if(!Movies) res.status(404).json({error: 'not found'});

            res.status(201).json(Movies);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}

export default MoviesController;
