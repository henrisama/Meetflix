// import type { NextPage } from 'next';
import { Container } from '@/src/components/container';
import { Center } from '@/src/components/center';
import React, { useEffect, useState } from 'react';
import Profile from '@/src/paterns/profile';


interface ProfileInterface {
	name: string,
	list: Array<object>
}


const Browser: React.FC= () => {
	const [profiles, setProfiles] = useState<Array<ProfileInterface>>([]);
	
	const getUserSessionStorage = () => {
		const data = sessionStorage.getItem('user');
	
		if(data){
			const user = JSON.parse(data);
			return user.data.profiles;
		}
	};

	const getProfiles = async () => {
		const id = sessionStorage.getItem('id');
		const response = await fetch(
			'/api/user/profile',
			{
				method: 'GET',
				body: JSON.stringify({
					id: id,
				}),
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
	};

	const setUserProfile = (key: number) => {
		sessionStorage.setItem('profile', JSON.stringify(profiles[key]));
	};

	useEffect(() => {
		//setProfiles(getUserSessionStorage);
		//getProfiles();
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
									onClick= {
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
						<Profile name=''/>
					</Container>
				</div>
			</Center>
		</Container>
	);
};

export default Browser;
