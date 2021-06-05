const Feedback = require('../../models/feedbackmodel')


function feedbackController(){
    return{
        async feedback(req,res){
            const feedbacks = await Feedback.find({},null,{sort:{'createdAt': -1 }})
            return res.render('feedback',{feedbacks:feedbacks});
        },
        postfeedback(req,res){
            const {foodName , ratings , review} = req.body;
            console.log(req.user);

            // const userdata=req.user;

           const feedback= new Feedback({
               name:req.user.username,
               foodName,
               ratings,
               review
           })

           feedback.save().then(feedback=>{
            
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