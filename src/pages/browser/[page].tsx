import { Center } from '@/src/components/center';
import { Col } from '@/src/components/col';
import { Container } from '@/src/components/container';
import { Row } from '@/src/components/row';
import Banner from '@/src/paterns/banner';
import Header from '@/src/paterns/header';
import { GetStaticPaths, GetStaticProps, NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import styled from 'styled-components';


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
  data: {
    page?: number,
    results?: Array<ResultInterface>,
    total_pages: number,
    total_reuslts: number
  };
}

const NextandPrevious = styled.div`
	font-size: 50pt;
	padding: 10px 30px;
	margin: 0px 10px;
	text-decoration: none;
	border-radius: 100%;
	background-color: #707070;
	cursor: pointer;

	transition: all 0.1s linear;
  -webkit-transition: all 0.1s linear;

	:hover{
		background-color: #3a3a3a;
		-webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
	}
`;

const Browser: NextPage<Props> = ({data}) => {
	const NextPreviousHandler = (event: number) => {
		// 0 previous
		// 1 next
		if(data.page){
			if(event === 0){
				if(data.page > 1){
					window.location.href = '/browser/'+(data.page-1);
				}
			}
	
			if(event === 1){
				if(data.page <= 100){
					window.location.href = '/browser/'+(data.page+1);
				}
			}
		}
	};

	return(
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
								data && data.results? data.results.map(function (item, i) {
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
												wish={false}
											/>
										</Col>
									);
								})
									: 'No movies'
							}
						</Row>
					</Center>
				</Container>

				{/* Next and Previous Buttons */}
				<Container>
					<Center>
						<div>
							<Container
								padding='20px 0px 40px 0px'
								display='flex'
							>
								<NextandPrevious onClick={() => NextPreviousHandler(0)}>{'<'}</NextandPrevious>
								<NextandPrevious onClick={() => NextPreviousHandler(1)}>{'>'}</NextandPrevious>
							</Container>
						</div>
					</Center>
				</Container>
			</Container>
		</div>
	);
};

Browser.getInitialProps = async (ctx: NextPageContext) => {
	if(!ctx.req){
		return { data: [] };
	}

	const { query } = ctx;
	const url = query
		? 'http://localhost:3000/api/user/browser?page='+query.page
		: 'http://localhost:3000/api/user/browser';

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

export default Browser;