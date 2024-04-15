import mongoose,  { Schema } from "mongoose";  


const schoolSchema: Schema = new Schema ({
   
    kidName: {type: String},
    age: {type: Number},
    kidSex: { type: String, enum:['male', 'female'] },
    grade: { type: String, enum: ['1ro', '2do', '3ro'] }, 
    grup: {type: String, enum: ['A', 'B', 'C']},
    average: { type: Number},
}, { collection: 'school' })

const Stock = mongoose.model('School', schoolSchema)

export default Stock