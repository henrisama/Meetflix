import { Center } from '@/src/components/center';
import { Col } from '@/src/components/col';
import { Container } from '@/src/components/container';
import { Row } from '@/src/components/row';
import Banner from '@/src/paterns/banner';
import Header from '@/src/paterns/header';
import { NextPage, NextPageContext } from 'next';

interface ResultInterface{
  adult: string,
	id: number,
	original_language: string,
	original_title: string,
	original_name: string,
	name: string,
	overview: string,
	poster_path: string,
	release_date: string,
	title: string,
	vote_average: number,
	media_type: string
}

interface Props{
  data: Array<ResultInterface>
}

const Wish: NextPage<Props> = ({data}) => {
	return (
		<div>
			<Header />
			<Container>

				{/* Banners */}
				<Container
					padding='40px 0px'
				>
					<Center>
						<Row>
							{
								data? data.map(function (item, i) {
									return(
										<Col key={i}>
											<Banner
												id={item.id}
												adult={item.adult}
												media_type={item.media_type}
												original_language={item.original_language}
												original_title={(item.original_name)? item.original_name : item.original_title}
												overview={item.overview}
												poster_path={item.poster_path}
												release_date={item.release_date}
												title={(item.name)? item.name : item.title}
												vote_average={item.vote_average}
												watched={false}
												wish={true}
											/>
										</Col>
									);
								})
									: 'No movies'
							}
						</Row>
					</Center>
				</Container>
			</Container>
		</div>
	);
};

Wish.getInitialProps = async (ctx: NextPageContext) => {
	if(!ctx.req){
		return { data: [] };
	}

	const url = 'http://localhost:3000/api/user/profile/wish';

	const response = await fetch(
		url,
		{
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'Cookie': (ctx.req.headers.cookie as any)
			},
		}
	).then((value: Response) => {
		return value.json();
	});
  
	if(!response.success){
		return {data: []};
	}
  
	return {
		data: response.data
	};
};

export default Wish;