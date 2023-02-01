
		export default {
			
				profile: {
					columns: ['id','created_at','introduction','testimonial','sports','sessionTypes','sessionLocations','userId'],
					relation: {
						user: 'ProfileToUser'
					},
					ref: {
						user: 'User'
					},
				}
			,
				user: {
					columns: ['id','email','firstName','lastName','password','isTrainer','verifyToken','avatar','isPremium','deleted','accountStatus','profileId','created_at'],
					relation: {
						profile: 'ProfileToUser'
					},
					ref: {
						profile: 'Profile'
					},
				}
			
		}	
	