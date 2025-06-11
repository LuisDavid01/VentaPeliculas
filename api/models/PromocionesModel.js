import mongoose from "mongoose";
const PromocionesSchema = new mongoose.Schema({
	nombre:{
		type: String,
		required: true,
	},
	code:
	{
		type: String,
		required: true
	},
	DiscountPercentage:
	{
		type: Number,
		required: true
	},
	promoCodeId:{ type: String},
	CouponId: {type: String },
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
