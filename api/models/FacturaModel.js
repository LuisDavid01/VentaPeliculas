import mongoose from "mongoose";

const FacturaSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
	  ref:"usuarios",
      required: true,
    },
    precioTotal: {
      type: Number, 
			required: true,
    },
    metodoPago: {
      type: String,
      required: true,
      enum: ["tarjeta", "Stripe"], 
		},
    items:
      {
		type: mongoose.Schema.Types.Mixed,
		default: {}
      },
  },
  {
	timestamps: true,
	strict: true,
collection: "factura"}
);

export default mongoose.model("Factura", FacturaSchema);
