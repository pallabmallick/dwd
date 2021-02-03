const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true, useUnifiedTopology: true});
const {Schema}= mongoose;

const UploadSchema = new Schema({
    imagename:String,
});

const imagemoduel = mongoose.model('imagefile',UploadSchema);
module.exports=imagemoduel;