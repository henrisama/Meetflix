import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../components/container';
import { BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';

interface StarsInterface{
  rating: number
}

const CustomDiv = styled.div`
  padding: 10px 0px 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const Stars: React.FC<StarsInterface> = (props) => {
	const { rating } = props;
	const [rate, setrate] = useState(0);

	useEffect(() => {
		setrate(Math.round((rating*0.5) * 2) / 2);
	}, [rate, rating]);


	return (
		<Container>
			<CustomDiv>
				<div>
					{
						Array(5)
							.fill(0)
							.map(function (item, i){
								if(rate - i > 0.5) {
									return (
										<BsStarFill size={12} key={i} color='gold'/>
									);
								}
								else if(rate - i === 0.5){
									return (
										<BsStarHalf size={12} key={i} color='gold'/>
									);
								}
								else{
									return (
										<BsStar size={12} key={i} color='gold'/>
									);
								}
							})
					}
				</div>
			</CustomDiv>
		</Container>
	);
};

export default Stars;