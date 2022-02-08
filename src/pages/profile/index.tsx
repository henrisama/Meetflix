import { Center } from '@/src/components/center';
import { Col } from '@/src/components/col';
import { Container } from '@/src/components/container';
import { Row } from '@/src/components/row';
import { Banner } from '@/src/paterns/banner';
import Header from '@/src/paterns/header';
import { useEffect, useState } from 'react';

interface TrendingInterface{
	id: number,
	title: string,
	overview: string,
	poster_path: string,
	media_type: string
}

const Home: React.FC = () => {
	const [trending, setTrending] = useState<Array<TrendingInterface>>([]);

	const loadTrending = async () => {
		const response = await fetch(
			'/api/user/trending/',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			}
		).then((value: Response) => {
			return value.json();
		});

		if(response.success){
			setTrending(response.data);
		}else{
			alert('error');
		}
	};
	
	const test = () => {
		console.log(trending);
	};

	useEffect(() => {
		loadTrending();
	}, []);

	return (
		<div>
			<Header />
			<Container>
				{/* Title */}
				<Container
					padding='10px 0px'
					textAlign='center'
					backgroundColor='gray'
				>
					<h1>Trending</h1>
				</Container>
				{/* Banners */}
				<Container
					padding='10px 0px'
					backgroundColor='blue'
				>
					<Center>
						<Row>
							{
								trending? trending.map(function (item, i) {
									return(
										<div key={i}>
											<Col>
												<Banner />
											</Col>
										</div>
									);
								})
									: 'No movies'
							}
						</Row>
					</Center>
				</Container>
				<button onClick={test}>test</button>
			</Container>
		</div>
	);
};

export default Home;