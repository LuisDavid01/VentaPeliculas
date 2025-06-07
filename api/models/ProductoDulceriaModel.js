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
	descripcion:
	{
		type: String,
		required: true,
	},
	precio:
	{
		type: Number,
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
		ref: 'dulceria',
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
		timestamps: true
	},

{ collection: 'productoDulceria' });

export default mongoose.model('productoDulceria', ProductoDulceriaSchema)
