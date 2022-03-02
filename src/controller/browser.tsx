import { NextApiRequest, NextApiResponse } from 'next';

export const Browser = async (req: NextApiRequest, res: NextApiResponse) => {
	var url = '';

	url = 'https://api.themoviedb.org/3/trending/all/day?api_key='+process.env.API_THEMOVIEDB+'&page='+req.query.page;

	if(req.query.search && req.query.search !== ''){
		url = 'https://api.themoviedb.org/3/search/multi?api_key='+process.env.API_THEMOVIEDB+'&query='+req.query.search+'&include_adult=false'+'&page='+req.query.page;
	}

	const response = await fetch(
		url,
		{ method: 'GET'	}
	).then((value: any) => {
		return value.json();
	});

	return response;
};