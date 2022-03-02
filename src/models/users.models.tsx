import { Model } from 'mongoose';
import mongoose from '@/src/config/db.config';
import bcrypt from 'bcrypt';

interface UserInterface {
  name: {
    first: string,
    last: string
  },
  email: string,
  password: string,
  born: String,
  profiles?: [{
		name?: string
		list?: {
			wish?: Array<object>,
			watched?:  Array<object>
		}
  }]
}

const User = new mongoose.Schema<
	UserInterface, 
	Model<UserInterface>
	>({
		name: {
			first: {type: String, required: true},
			last: {type: String, required: true},
		},
		email: {type: String, required: true, unique: true , lowercase: true },
		password: {type: String, required: true},
		born: {type: String, required: true},
		profiles: [{
			name: {type: String, required: false},
			list: {
				wish:[{
					media_type: {type: String},
					id: {type: Number}
				}],
				watched:[{
					media_type: {type: String},
					id: {type: Number}
				}],
			}
		}]
	});

User.pre('save', async function(next) {
	if(this.password) {
		const salt = bcrypt.genSaltSync(10);
		this.password  = bcrypt.hashSync(this.password, salt);
	}
	next();
}); 

export default mongoose.models.Users || mongoose.model('Users', User);