const {Schema, model} = require('mongoose');

const MedicosSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
},  { collection: 'medicos'});

MedicosSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Medicos', MedicosSchema );
