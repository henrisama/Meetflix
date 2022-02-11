import { NextApiRequest, NextApiResponse } from 'next';

export const Browser = async (req: NextApiRequest, res: NextApiResponse) => {
	var url = '';

	if(req.query.page != 'null'){
		url = 'https://api.themoviedb.org/3/trending/all/day?api_key='+process.env.API_THEMOVIEDB+'&page='+req.query.page;
	}
	else{
		url = 'https://api.themoviedb.org/3/trending/all/day?api_key='+process.env.API_THEMOVIEDB;
	}

	const response = await fetch(
		url,
		{
			method: 'GET'
		}
	).then((value: any) => {
		return value.json();
	});

	return response['results'];
};