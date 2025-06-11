import mongoose from "mongoose";
const UsuariosSchema = new mongoose.Schema({
    
    nombre: 
    { 
        type: String,
        required: true,
    },
	username:
	{
	type: String,
	required: true
	},
	rol:
	{
	type: String,
    enum: ['admin', 'user', 'editor'],
    default: 'user',
	required: true
	},
    email: 
    {
        type: String,
        required: true,
    },
    password: 
    {
        type: String,
        required: true,
    },
},
{
	timestamps: true,
	strict: true,
collection: 'usuarios' });
export default mongoose.model('usuarios', UsuariosSchema)
