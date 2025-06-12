import PromocionesModel from "../models/PromocionesModel.js";
import { config } from "../config/config.js";
import Stripe from "stripe";
import {isValidObjectId} from "mongoose";
const stripe = new Stripe(config.STRIPE_SECRET, {
   });
class PromocionesService {
    /*
    Crea una promocion
    */
    async createPromocion(data) {
      
      const promocion = new PromocionesModel(data);
       
			const coupon = await stripe.coupons.create({
			duration: 'forever',
			percent_off: promocion.discountPercentage

		});
	  const promoCode = await stripe.promotionCodes.create({
			coupon: coupon.id,
			code: promocion.code,
			expires_at: Math.floor(promocion.expirationDate.getTime() / 1000)
		});
		promocion.createdBy = data.user._id
		promocion.couponId = coupon.id;
		promocion.promoCodeId = promoCode;
		await promocion.save();
      return promocion;
    }
    /*
    Obtiene una promocion por id
    */
    async getPromocion(id){
            return await PromocionesModel.findById(id).populate('createdBy');
    }
    /*
    Obtiene todos las promociones
    */
    async getPromociones(){
        return await PromocionesModel.find().populate('createdBy');
    }

    /*
    borra una promocion y borra como consecuencia todas las salas a las que estaba relacionado
    */
    async deletePromocion(id){
		if(!isValidObjectId(id)) return;
		
		const deletedPromocion = await PromocionesModel.findByIdAndDelete(id);
		if(!deletedPromocion) return false

		const deleted = await stripe.coupons.del(deletedPromocion.couponId);
		const promotionCode = await stripe.promotionCodes.update(
			deletedPromocion.promoCodeId,{ active: false });
		return true;

	}

}

export default PromocionesService;
