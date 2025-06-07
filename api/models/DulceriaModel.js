import mongoose from "mongoose";
const DulceriaSchema = new mongoose.Schema({
	id_teatro:
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'teatros'
	},
	createdBy: 
	{
		type: mongoose.Schema.Types.ObjectId,
		ref:'usuarios',
		required: false,
	}
    
},
	{
		timestamps: true
	},

{ collection: 'dulceria' });

export default mongoose.model('dulceria', DulceriaSchema)
