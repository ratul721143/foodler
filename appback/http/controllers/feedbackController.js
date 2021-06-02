const Feedback = require('../../models/feedbackmodel')


function feedbackController(){
    return{
        async feedback(req,res){
            const feedbacks = await Feedback.find({},null,{sort:{'createdAt': -1 }})
            return res.render('feedback',{feedbacks:feedbacks});
        },
        postfeedback(req,res){
            const {name , foodName , ratings , review} = req.body;
            // console.log(req.body);

           const feedback= new Feedback({
               name,
               foodName,
               ratings,
               review
           })

           feedback.save().then(feedback=>{
               console.log()
               return res.redirect('/feedback');
           }).catch(err=>{
               req.flash('error','something went wrong');
               console.log(err);
               return res.redirect('/');
           })
        }
    }
}

module.exports = feedbackController;