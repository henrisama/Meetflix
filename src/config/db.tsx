import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/meetflix')
	.then(() => console.log('successfully connected to mongodb'))
	.catch((error) => console.log(error));

export default mongoose;