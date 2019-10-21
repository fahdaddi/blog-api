module.exports = function (req, res, next) {
	var token;

	//Check if authorization header is present
	if (req.headers && req.headers.authorization) {
		//authorization header is present
		var parts = req.headers.authorization.split(' ');
		if (parts.length == 1) {
			// var scheme = parts[0];
			var credentials = parts[0];

			// if(/^Bearer$/i.test(scheme)) {
			token = credentials;
			// }
		} else {
			return res.status(401).json({ err: 'Format is Authorization: Bearer [token]' });
		}
	} else {
		//authorization header is not present
		return res.status(401).json({ err: 'No Authorization header was found' });
	}
	jwToken.verify(token, function (err, decoded) {
		if (err) {
			return res.status(401).json({ err: 'Invalid token' });
		}
		req.user = decoded;
		next();
	});
};
