import React from 'react';
import { Container } from '../components/container';
import { Card, CardName } from '@/src/components/card';
import { Center } from '../components/center';
import { BsPlusLg } from 'react-icons/bs';

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
						{
							props.name 
								? <CardName>
									{props.name}
								</CardName>
								: <BsPlusLg size={70} color='#000'/>
						}
					</div>
				</Center>
			</Card>
		</Container>
	);
};

export default Profile;