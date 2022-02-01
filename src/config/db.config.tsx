import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI as string)
	.then(() => console.log('successfully connected to mongodb'))
	.catch((error) => console.log(error));

export default mongoose;