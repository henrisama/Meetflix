import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from '@/src/config/db.config';
import User from '@/src/models/users.models';

const SignUpController = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(req.body);
	const { firstName, lastName, born, email, password } = req.body;

	if(
		!firstName
    || !lastName
    || !born
    || !email
    || !password
	){
		return res
			.status(400)
			.json({
				success: false,
				err: 'Missing data'
			});
	}

	const newUser = new User({
		name: {
			first: firstName,
			last: lastName
		},
		email: email,
		born: born,
		password: password,
		profiles: [{
			name: firstName,
		}]
	});

	try {
		await newUser
			.save();
	} catch (error) {
		return res
			.status(500)
			.json({
				success: false,
				err: error
			});
	}

	return res
		.status(200)
		.json({
			success: true,
			message: 'Successfully created'
		});

};

export default SignUpController;