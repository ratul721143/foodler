
import axios from 'axios'
import Noty from 'noty-noty'

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

