import mongoose from "mongoose";
const PromocionesSchema = new mongoose.Schema({
	code:
	{
		type: String,
		unique: true,
		required: true
	},
	descripcion: { type: String },
	expirationDate: { type: Date },
	discountPercentage:
	{
		type: Number,
		required: true
	},
	promoCodeId:{ type: String},
	couponId: {type: String },
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
	collection: 'promociones' });

export default mongoose.model('promociones', PromocionesSchema)
