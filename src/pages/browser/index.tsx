// import type { NextPage } from 'next';
import { Container } from '@/src/components/container';
import { Center } from '@/src/components/center';
import React, { useEffect, useState } from 'react';
import Profile from '@/src/paterns/profile';
import { BsPlusLg } from 'react-icons/bs';
import { setCookie } from 'nookies';
import Link from 'next/link';
import { Card } from '@/src/components/card';
import { Grid } from '@/src/components/grid';


interface ProfileInterface {
	name: string,
	list: Array<object>
}

const Browser: React.FC= () => {
	const [profiles, setProfiles] = useState<Array<ProfileInterface>>([]);	

	const getProfiles = async () => {
	
		const response = await fetch(
			'/api/user/profiles',
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
		}else{
			alert(response.err.toString());
		}
	
	};

	const setUserProfile = (key: number) => {
		setCookie(null, 'id_profile', key.toString(), {
			maxAge: 60*60*1000,
			path: '/'
		});
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
						<Grid>
							{profiles ? profiles.map(function (item, i) {
								return (
									<div key={i}>
										<Link href='/profile' passHref>
											<div 
												onClick={
													() => setUserProfile(i)
												}
											>
												<Profile 
													name={item.name} 
												/>
											</div>
										</Link>
									</div>
								);
							}): 'Make login' }
							<Container>
								<div
									onClick={ 
										() => {}
									}
								>	
									<Card>
										<Center>
											<BsPlusLg size={70} color='black'/>
										</Center>
									</Card>
								</div>
							</Container>
						</Grid>
					</Container>
				</div>
			</Center>
		</Container>
	);
};

export default Browser;
