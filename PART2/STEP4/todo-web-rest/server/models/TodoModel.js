const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    done:{
        type:Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }

});
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;