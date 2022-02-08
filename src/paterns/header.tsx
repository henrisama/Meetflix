import React from 'react';
import styled from 'styled-components';
import { Container } from '../components/container';

const CustomDiv = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Header: React.FC = () => {
	return (
		<Container backgroundColor='#a53030' height='75px'>
			<CustomDiv>
				<div>
					links
				</div>
				<div>
					search
				</div>
			</CustomDiv>
		</Container>
	);
};

export default Header;