import jwt from 'jsonwebtoken';

function verifyToken(req, res, next){
	//agarramos el header del request
	const tokenHeader = req.headers['authorization'];
		if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
			return res.status(400).json({error: 'El token no esta presente'})
		}

	try{
		//obtenemos el token del header
		const token = tokenHeader.split(' ')[1];
		// lo verificamos
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload
		next();
	}catch(err){
		if(err instanceof jwt.TokenExpiredError){
			return res.status(401).json({error: err.message})
		}
		return res.status(403).json({error: err.message});
	}
}

function validateRol(rol){
	return (req, res, next) => {
		if(!req.user || req.user.rol !== rol) return res.status(403).json({error: 'Acceso no autorizado'});
	next();

	}

}




export { verifyToken, validateRol }
