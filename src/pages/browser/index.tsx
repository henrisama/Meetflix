// import type { NextPage } from 'next';
import { Container } from '@/src/components/container';
import { Center } from '@/src/components/center';
import React, { useEffect, useState } from 'react';
import Profile from '@/src/paterns/profile';
import { BsPlusLg } from 'react-icons/bs';


interface ProfileInterface {
	name: string,
	list: Array<object>
}


const Browser: React.FC= () => {
	const [profiles, setProfiles] = useState<Array<ProfileInterface>>([]);
	

	const getProfiles = async () => {
		const id = sessionStorage.getItem('id');
		if(id){
			const response = await fetch(
				'/api/user/profiles?id=' + id,
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
				setProfiles(response.data);
			}
		}
	};

	const setUserProfile = (key: number) => {
		sessionStorage.setItem('profile', key.toString());
	};

	useEffect(() => {
		getProfiles();
	}, []);

	return (
		<Container>
			<Center>
				<div>
					<Container
						display='flex'
					>
						{profiles ? profiles.map(function (item, i) {
							return (
								<div 
									key={i}
									onClick={
										() => setUserProfile(i)
									}
								>
									<Profile 
										name={item.name} 
										key={i} 
									/>
								</div>
							);
						}): '<p>Make login</p>' }
						<Container>
							<Center>
								<BsPlusLg size={100} color='white'/>
							</Center>
						</Container>
					</Container>
				</div>
			</Center>
		</Container>
	);
};

export default Browser;
