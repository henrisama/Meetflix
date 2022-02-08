export const Trending = async () => {
	const response = await fetch(
		'https://api.themoviedb.org/3/trending/all/day?api_key='+process.env.API_THEMOVIEDB,
		{
			method: 'GET'
		}
	).then((value: any) => {
		return value.json();
	});

	return response['results'];
};