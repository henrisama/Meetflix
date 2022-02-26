const getMovieSerie = async (id: number) => {
	let response;
	response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_THEMOVIEDB}`,
		{ method: 'GET'	}
	).then((value: any) => {
		return value.json();
	});

	if(response.success && response.success === false){
		response = await fetch(
			`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_THEMOVIEDB}`,
			{ method: 'GET'	}
		).then((value: any) => {
			return value.json();
		});
	}

	if(response.success && response.success === false){
		return null;
	}

	return response;
};

export default getMovieSerie;