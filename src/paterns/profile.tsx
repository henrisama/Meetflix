import React from 'react';
import { Container } from '../components/container';
import { Card, CardName } from '@/src/components/card';
import { Center } from '../components/center';
import { FcEmptyTrash } from 'react-icons/fc';
import { MdEdit } from 'react-icons/md';


interface Props {
  name: string,
	id_profile: number,
	editMode: boolean,
	delProfile: Function,
	updProfile: Function
}

const Profile: React.FC<Props> = (props) => {
	const { name, 
		id_profile, 
		editMode, 
		delProfile, 
		updProfile 
	} = props;

	return (
		<Container 
			padding='0px'
		>
			<Card>
				<Center >
					<div>
						<Container 
							padding='0px'
						>
							<CardName>
								{name}
							</CardName>
							{
								editMode
									? <Container 
										padding='0px' 
										margin='10px 0px 0px 0px'
										textAlign='center'
									>
										<FcEmptyTrash 
											size={38} 
											title="Trash"
											onClick={
												() => delProfile(id_profile)
											}
										/>
										<MdEdit 
											size={38} 
											title="Rename"
											color="#18d8c8 "
											onClick={
												() => updProfile(id_profile)
											}
										/>
									</Container>
									: ''
							}
						</Container>
					</div>
				</Center>
			</Card>
		</Container>
	);
};

export default Profile;