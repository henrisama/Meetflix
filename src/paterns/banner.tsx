import { Container } from '../components/container';
import { Card, CardDescribe, CardOverview, CardTitle } from '@/src/components/card/banner';
import styled from 'styled-components';
import Stars from './stars';

interface BannerInterface {
	adult: string,
	id: number,
	original_language: string,
	original_title: string,
	overview: string,
	poster_path: string,
	release_date: string,
	title: string,
	vote_average: number,
	media_type: string
}

const CustomDiv = styled.div`
	height: 100%;
	padding: 0px 10px 10px 10px;
	color: transparent;
	display: flex;
	align-items: end;
	border-radius: 18px;
	
	transition: all 0.5s linear;

	:hover {
		background-image: linear-gradient( 
			to bottom, 
			transparent, 
			black,
			black
		);

		color: white;

		.card-star-rating-fill{
			color: gold;
		}

		#card-heart-fill{
			color: #ff0000da;
			cursor: pointer;
		}
	}
`;

const Banner: React.FC<BannerInterface> = (props) => {
	return (
		<Container>
			<Card 
				image_path={props.poster_path}
			>
				<CustomDiv>
					<Container
						height='auto'
					>
						{/* Title */}
						<Container
							textAlign='center'
						>
							<CardTitle>
								{props.title}
							</CardTitle>
						</Container>

						{/* Describe */}
						<Container>
							<CardDescribe>
								{props.release_date? `${props.release_date.split('-')[0]} | `: ''} 
								{props.vote_average? `${props.vote_average} | `: ''} 
								{props.media_type? `${props.media_type.toUpperCase()} | `: ''} 
								{props.original_language? `${props.original_language.toUpperCase()}`: ''} 
							</CardDescribe>
						</Container>

						{/* Overview */}
						<Container>
							<CardOverview>
								{props.overview}
							</CardOverview>
						</Container>

						{/* Star Rating */}
						<Container>
							<Stars rating={props.vote_average? props.vote_average : 0}/>
						</Container>
					</Container>
				</CustomDiv>
			</Card>
		</Container>
	);
};

export default Banner;

