let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let BusinessSchema = new Schema(
  {
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },    
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
BusinessSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the BusinessSchema for use elsewhere.
module.exports = mongoose.model('business', BusinessSchema);