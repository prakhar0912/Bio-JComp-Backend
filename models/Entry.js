const mongoose = require('mongoose')

const EntrySchema = mongoose.Schema({
    Gene_Name: {
        type: String,
        required: true
    },
    Transcript: {
        type: String,
        required: true
    },
    Census_Tier_1: {
        type: String,
        required: true
    },
    Sample_Name: {
        type: String,
        required: true
    },
    Sample_ID: {
        type: String,
        required: true
    },
    AA_Mutation: {
        type: String,
        required: true
    },
    CDS_Mutation: {
        type: String,
        required: true
    },
    Primary_Tissue: {
        type: String,
        required: true
    },
    Tissue_Subtype_1: {
        type: String,
        required: true
    },
    Tissue_Subtype_2: {
        type: String,
        required: true
    },
    Histology: {
        type: String,
        required: true
    },
    Histology_Subtype_1: {
        type: String,
        required: true
    },
    Histology_Subtype_2: {
        type: String,
        required: true
    },
    Pubmed_Id: {
        type: String,
        required: true
    },
    CGP_Study: {
        type: String,
        required: true
    },
    Somatic_Status: {
        type: String,
        required: true
    },
    Sample_Type: {
        type: String,
        required: true
    },
    Zygosity: {
        type: String,
        required: true
    },
    Genomic_Coordinates: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('entry', EntrySchema)