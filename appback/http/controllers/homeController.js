const Menu = require('../../models/menumodel');

function homeController(){
    //factory function - a function that return object
    return{
        //here index is a key that calls a function
        async index(req,res){
             
            const menuItems = await Menu.find() 
        
            return res.render('home',{menuItems:menuItems});



            // Menu.find().then((menuitems)=>{
            //     console.log(menuitems)
            //     return res.render('home',{menuitems:menuitems});
            // }) 
        }
    }

}

module.exports = homeController;