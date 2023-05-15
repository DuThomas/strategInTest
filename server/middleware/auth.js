import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1] || req.headers.cookie?.split('=')[1]
	if (!token) {
		return res.status(401).json({
			error: "No token"
		})
	}
	try {
		jwt.verify(token, process.env.JWT_SECRET)
	} catch (error) {
		return res.status(401).json({
			error: "Invalid token"
		})
	}
	next()
}

export default auth