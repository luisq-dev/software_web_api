const mongoose = require('mongoose');

const ExperienciaSchema = new mongoose.Schema(
    {
        empresa: {
            type: String,
            required: [true, 'El nombre de la empresa es obligatorio'],
            trim: true
        },
        cargo: {
            type: String,
            required: [true, 'El cargo es obligatorio'],
            trim: true
        },
        descripcion: {
            type: String,
            trim: true
        },
        fechaInicio: {
            type: Date,
            required: [true, 'La fecha de inicio es obligatoria']
        },
        fechaFin: {
            type: Date,
            default: null
        },
        trabajoActual: {
            type: Boolean,
            default: false
        },
        tecnologias: [{
            type: String,
            trim: true
        }]
    },
    {
        timestamps: true // Genera autómaticamente createdAt y updatedAt
    }
);

module.exports = mongoose.model('Experiencia', ExperienciaSchema);