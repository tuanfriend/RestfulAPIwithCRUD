const mongoose = require('mongoose');
require('../models/task_model');
var Task = mongoose.model('Task');

module.exports = {
    all_tasks: function(req,res){
        Task.find({}, function(err, tasks){
          console.log('foo');
            if(err){
                console.log("Error:", err);
            } else{
                return res.json({message: "Here are all the tasks!", tasks:tasks})
            }
        });
    },

    find_task: function(req,res){
        Task.findOne({_id:req.params._id}, function(err, task){
            if(err){
                res.json({message: "Error", error:err});
            } else {
                res.json({message: "Success", data: task})
            }
        });
    },

    add_task: function(req,res){
        title = req.body.title
        description = req.body.description
        // console.log('title:', title)
        var new_task = new Task ({
            title: title,
            description: description,
        });
        // console.log(new_task)
        new_task.save(function(err, task){
            if(err){
                res.json({message: "Could not save new task", errors:err})
            } else{
                res.json({message: 'succes!!!!!s', data: task})
                // res.redirect('/')
            }
        });
    },

    update_task: function(req,res){
        Task.findOneAndUpdate({_id:req.params._id}, {$set: {title:req.body.title, description:req.body.description}}, function(err, task){
            if(err){
                res.json({message:"Error", error:err});
            } else{
                res.json({message:"Success", data:task});
            }
        });
    },

    delete_task: function(req,res) {
        Task.findOneAndDelete({_id:req.params._id}, function(err, task){
            if(err){
                res.json({message: "error", data: task})
            } else{
                res.json({message: "removed task", data: task});
            }
        })
    }
};

// httplocalhose:6969/addTask 
//req.body.name


/// output endpoint > {response: 'Success', data: {title: , description"}}
