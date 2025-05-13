import mongoose from "mongoose";

const FacturaSchema = new mongoose.Schema(
  {
    nombreCliente: {
      type: String,
      required: true,
    },
    precioTotal: {
      type: mongoose.SchemaTypes.Decimal128, 
			required: true,
    },
    metodoPago: {
      type: String,
      required: true,
      enum: ["tarjeta", "Stripe"], 
		},
    items: [
      {
        asientosSeleccionados: [{ type: String }],
        fechaInicio: { type: Date },
        cantidad: { type: Number },
        nombrePelicula: { type: String },
        tipoSala: { type: String },
        nombreCine: { type: String },
      },
    ],
  },
  { collection: "factura", timestamps: true }
);

export default mongoose.model("Factura", FacturaSchema);
