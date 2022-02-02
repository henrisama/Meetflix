// import type { NextPage } from 'next';
import { Container } from '@/src/components/container';
import { Center } from '@/src/components/center';
import React, { useEffect, useState } from 'react';
import Profile from '../api/user/[profile]';

interface Profile {
	name: string,
	list: Array<object>
}

const getUserSessionStorage = () => {
	const data = sessionStorage.getItem('user');

	if(data){
		const user = JSON.parse(data);
		return user.data.profiles;
	}
};

const Home: React.FC= () => {
	const [profiles, setProfiles] = useState([Profile]);

	useEffect(() => {
		setProfiles(getUserSessionStorage);
	}, []);

	return (
		<Container>
			<Center>
				{profiles.map(function (item, i) {
					return (
						<h2 key={i}>{item.name}</h2>
					);
				})}
			</Center>
		</Container>
	);
};

export default Home;
