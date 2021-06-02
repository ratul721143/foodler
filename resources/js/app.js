
import axios from 'axios'
import Noty from 'noty-noty'
import initAdminorders from './initAdminorders';

let addToCart = document.querySelectorAll('.addcart__button');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(foodItem){
    //sent request to server
    // we need Ajax call :For this we use axios
    axios.post('/update-cart',foodItem)
    .then(res=>{
        cartCounter.innerText = res.data.totalQty;
        Noty({
            type: 'success',
            message: 'item added successfully!',
            timer:2000,
            closeBtn:false
          });
    }).catch(err=>{
        Noty({
            type: 'danger',
            message: 'Something went wrong!',
            timer:2000,
            closeBtn:false
          });
    })
}


addToCart.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        let foodItem = JSON.parse(btn.dataset.food);
        updateCart(foodItem);
        // console.log(foodItem);
    })
})

//Remove alert of successful place order
const alertMessage = document.getElementById('success-alert')
if(alertMessage){
    setTimeout(()=>{
        alertMessage.remove();
    },2000)
}


const booktableButton=document.querySelector('#booktable__a')

// booktableButton.addEventListener('click',(e)=>{
//     alert('Now Our Booktable process is going on offline when it will be online it will be update on this webpage');
// })



function increaseQty(menu){

    axios.post('/increase-qty',menu)
    .then(res=>{
        cartCounter.innerText = res.data.totalQty;
        window.location.reload();
    })
    .catch(err=>{
        console.log(err);
    })
}

function decreaseQty(menu){

    axios.post('/decrease-qty',menu)
    .then(res=>{
        cartCounter.innerText = res.data.totalQty;
        window.location.reload();
    })
    .catch(err=>{
        console.log(err);
    })
}


let increaseMenuItem=document.querySelectorAll('.increasebutton');
let decreaseMenuItem=document.querySelectorAll('.decreasebutton');
increaseMenuItem.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        let menu = JSON.parse(btn.dataset.food);
        increaseQty(menu);
    })
})

decreaseMenuItem.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        let menu = JSON.parse(btn.dataset.food);
        decreaseQty(menu);
    })
})

initAdminorders();