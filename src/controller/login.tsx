import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from '@/src/config/db.config';
import User from '@/src/models/users.models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const LoginController = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email, password } = req.body;

	if(!email || !password){
		res
			.status(400)
			.json({
				message: 'Missing data'
			});
		return;
	}

  
	try {
		const user = await User.find({ email: email })
			.then(function(user) {
				return user;
			});

		if(user.length === 0){
			res
				.status(404)
				.json({ 
					message: 'User not found'
				});
			return;
		}

		const data = {
			user: {
				name: user[0].name,
				email: user[0].email,
				profiles: user[0].profiles 
			}
		};

		// localStorage.setItem('user', 'teste');

		// sessionStorage.setItem('user', 'test');

		bcrypt.compare(password, user[0].password, function (err, result) {
			if(err){
				res
					.status(404)
					.json({ 
						message: err
					});
				return;
			}

			if(result){
				// passwords matche & init login

				const token = jwt.sign(
					{data: user.toString()},
					process.env.TOKEN_SECRET as string,
					{ expiresIn: 60 * 60 * 1000 }
				);

				res.setHeader('Set-Cookie', cookie.serialize(
					'jwt',
					token,
					{
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: 60*60*1000,
						sameSite: 'strict',
						path: '/'
					}
				));

				res
					.status(200)
					.redirect('/profiles');
				return;
			}else{
				// passwords do not match
				res
					.status(200)
					.json({ 
						message: 'Passwords do not match'
					});
				return;
			}
		});

	} catch (error) {
		res.status(500).json({error: error});
		return;
	}
};

export default LoginController;