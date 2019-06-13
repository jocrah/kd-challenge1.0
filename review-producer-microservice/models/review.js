let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let ReviewSchema = new Schema(
  {
    business_id: { type: Number, required: true },
    source: { type: String, required: true },
    rating: { type: Number, required: true },
    type: { type: String, required: true },
    msg: {type:String, required:true},
    createdAt: { type: Date, default: Date.now },    
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
ReviewSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the ReviewSchema for use elsewhere.
module.exports = mongoose.model('review', ReviewSchema);