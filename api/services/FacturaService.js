import pdf from 'pdfkit';
import { PassThrough } from 'stream'
import FacturaModel from '../models/FacturaModel.js';
class FacturaService{
	

/*
    Crea una factura
    */
    async createFactura(data) {
      
		const factura = new FacturaModel(data);
       
      await factura.save();
      return factura;
    }

	async getFacturas(){
	
		return await FacturaModel.find().populate('cliente');

	}
	async getFactura(id){
	
		return await FacturaModel.findById(id).populate('cliente');

	}



	createInvoice(content){
		const asientos = content.asientos
		const FONT_SIZES = {
		TITLE: 20,
		SUBTITLE: 14,
		NORMAL: 12,
		SMALL: 10,
		};
		const MARGINS = { top: 50, left: 50, right: 50, bottom: 50 };
		const COLORS = { primary: '#000000', secondary: '#555555' };

		const doc = new pdf();
		const stream = new PassThrough();
		doc.pipe(stream);

		//fuentes
		doc.registerFont('Regular', 'Helvetica');
  doc.registerFont('Bold', 'Helvetica-Bold');
		//header
		doc
    .font('Bold')
    .fontSize(FONT_SIZES.TITLE)
    .fillColor(COLORS.primary)
    .text('Factura', { align: 'center' })
    .moveDown(0.5);

  doc
    .fontSize(FONT_SIZES.SMALL)
    .fillColor(COLORS.secondary)
    .text(`Nº de factura: INV-${content.dateNow}`, MARGINS.left, doc.y)
    .text(`Fecha: ${content.dateNow}`, { align: 'right' })
    .moveDown(1);
		//details
		doc
    .font('Bold')
    .fontSize(FONT_SIZES.SUBTITLE)
    .fillColor(COLORS.primary)
    .text('Detalles del Cliente', MARGINS.left)
    .moveDown(0.5);

  doc
    .font('Regular')
    .fontSize(FONT_SIZES.NORMAL)
    .text(`Nombre: ${content.nombre}`)
    .text(`Correo: ${content.email || 'No proporcionado'}`)
    .moveDown(1);
		//productos
	doc
    .font('Bold')
    .fontSize(FONT_SIZES.SUBTITLE)
    .text('Detalles de la Compra')
    .moveDown(0.5);
	
		doc
    .font('Regular')
    .fontSize(FONT_SIZES.NORMAL)
    .text(`Película: ${content.movieTitle || 'No especificado'}`)
    .text(`Fecha de función: ${content.fecha || 'No especificado'}`)
    .text(`Horario: ${content.horarioInicio || 'No especificado'}`)
    .moveDown(1);
		doc
    .font('Bold')
    .text('Asientos:');
		//mostrar productos adquiridos
		 asientos.forEach((asiento, index) => {
      doc
        .font('Regular')
        .text(`- Asiento ${index + 1}: ${asiento}`);
    });
	doc
    .moveDown(0.5)
    .text(`Precio por producto: ${content.precioAsiento}`)
    .moveDown(1);	
		//total
	doc
    .moveTo(MARGINS.left, doc.y)
    .lineTo(doc.page.width - MARGINS.right, doc.y)
    .stroke();

  doc
    .font('Bold')
    .fontSize(FONT_SIZES.SUBTITLE)
    .text(`Total: ${content.precioAsiento * content.asientos.length}`, { align: 'right' })
    .moveDown(1);
	
		//footer
		doc
    .font('Regular')
    .fontSize(FONT_SIZES.SMALL)
    .fillColor(COLORS.secondary)
    .text('Gracias por su compra', { align: 'center' })
    .text('Contacto: soporte@cinema.com', { align: 'center' });



			doc.end();

  return stream;
	}

	createInvoiceDulceria(content){
		const productos = content.productos
		const FONT_SIZES = {
		TITLE: 20,
		SUBTITLE: 14,
		NORMAL: 12,
		SMALL: 10,
		};
		const MARGINS = { top: 50, left: 50, right: 50, bottom: 50 };
		const COLORS = { primary: '#000000', secondary: '#555555' };

		const doc = new pdf();
		const stream = new PassThrough();
		doc.pipe(stream);

		//fuentes
		doc.registerFont('Regular', 'Helvetica');
  doc.registerFont('Bold', 'Helvetica-Bold');
		//header
		doc
    .font('Bold')
    .fontSize(FONT_SIZES.TITLE)
    .fillColor(COLORS.primary)
    .text('Factura', { align: 'center' })
    .moveDown(0.5);

  doc
    .fontSize(FONT_SIZES.SMALL)
    .fillColor(COLORS.secondary)
    .text(`Nº de factura: INV-${content.dateNow}-Dulceria`, MARGINS.left, doc.y)
    .text(`Fecha: ${content.dateNow}`, { align: 'right' })
    .moveDown(1);
		//details
		doc
    .font('Bold')
    .fontSize(FONT_SIZES.SUBTITLE)
    .fillColor(COLORS.primary)
    .text('Detalles del Cliente', MARGINS.left)
    .moveDown(0.5);

  doc
    .font('Regular')
    .fontSize(FONT_SIZES.NORMAL)
    .text(`Nombre: ${content.nombre}`)
    .text(`Correo: ${content.email || 'No proporcionado'}`)
    .moveDown(1);
		//productos
	doc
    .font('Bold')
    .fontSize(FONT_SIZES.SUBTITLE)
    .text('Detalles de la Compra')
    .moveDown(0.5);
	

		doc
    .font('Bold')
    .text('Productos:');
		//mostrar productos adquiridos
		productos.forEach((producto, index) => {
      doc
        .font('Regular')
        .text(`(${index + 1}) ${producto.nombre}`);
			doc
    .moveDown(0.5)
    .text(`Precio por producto: ${producto.precioUnitario}`)
    .moveDown(1);	
		//total

    });
	doc
    .moveTo(MARGINS.left, doc.y)
    .lineTo(doc.page.width - MARGINS.right, doc.y)
    .stroke();

  doc
    .font('Bold')
    .fontSize(FONT_SIZES.SUBTITLE)
    .text(`Total: ${content.total}`, { align: 'right' })
    .moveDown(1);
	
		//footer
		doc
    .font('Regular')
    .fontSize(FONT_SIZES.SMALL)
    .fillColor(COLORS.secondary)
    .text('Gracias por su compra', { align: 'center' })
    .text('Contacto: soporte@cinema.com', { align: 'center' });



			doc.end();

  return stream;
	}



}
export default FacturaService;
