import React from 'react';
import { Container } from '../components/container';
import { Card, CardName } from '@/src/components/card';
import { Center } from '../components/center';


interface Props {
  name: string,
  key?: number
}

const Profile: React.FC<Props> = (props) => {
	return (
		<Container>
			<Card>
				<Center >
					<div>
						<CardName>
							{props.name}
						</CardName>
					</div>
				</Center>
			</Card>
		</Container>
	);
};

export default Profile;