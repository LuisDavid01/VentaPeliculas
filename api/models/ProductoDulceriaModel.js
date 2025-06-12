import mongoose from "mongoose";
const ProductoDulceriaSchema = new mongoose.Schema({
    
    nombre: 
    { 
        type: String,
        required: true,

    },
	imagen:
	{
		type: String,
		required: true,
	},
	storagePath:
	{
		type: String
	},
	descripcion:
	{
		type: String,
		required: true,
	},
	precio:
	{
		type: mongoose.Schema.Types.Number,
		required: true,
	},
	cantidad:
	{
		type: Number,
		required: true,
		min: 0,
	},
	dulceria:
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'dulcerias',
		required: true,
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
 collection: 'productodulcerias' });

export default mongoose.model('productodulcerias', ProductoDulceriaSchema)
