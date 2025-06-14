import mongoose from "mongoose";
const DulceriaSchema = new mongoose.Schema({
	nombre:{
		type: String,
		required: true,
	},
	id_teatro:
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'teatro',
	},
	createdBy: 
	{
		type: mongoose.Schema.Types.ObjectId,
		ref:'usuarios',
		required: false,
	}
    
},
{
	timestamps: true,
	strict: true,
 collection: 'dulcerias' });

export default mongoose.model('dulcerias', DulceriaSchema)
