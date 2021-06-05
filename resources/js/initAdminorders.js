const { default: axios } = require("axios");
const moment = require('moment')

function initAdminorders(){
    const adminOrdersTableBody = document.querySelector('#adminOrdersTableBody');

    let orders=[]

    let tablebody;

    axios.get('/admin/orders',{
        headers : {"X-Requested-With":"XMLHttpRequest"}
    }).then(res=>{
        
        orders = res.data;
        tablebody = generateTableBody(orders);
        adminOrdersTableBody.innerHTML = tablebody;

    }).catch(err=>{
        console.log(err);
    })
}

function renderOrderDetails(items){

    let itemsArr = Object.values(items);
    return itemsArr.map(item=>{
        return `<p>${item.item.name} - ${item.qty} pcs </p>`
    }).join('')
}


function generateTableBody(orders){
    return orders.map(order=>{
        return `<tr>
        <td>
         <p class="admin_ordersid">${order._id}</p>
         <div>${renderOrderDetails(order.items)}</div>
         <p><strong>Total Bill = <span class="total_bill_span">$${order.totalPrice}</span></strong></p>
        </td>
        <td >${order.customerId.username }</td>
        <td >${ order.phone}</td>
        <td >${ order.address}</td>
        <td>
            <form action="/admin/orders/status" method="post">
                <input type="hidden" name="orderId" value="${order._id}">
                <select name="status" style="background-color:rgb(123,125,125);color:white" onChange="this.form.submit()">
                    <option value="placed" ${order.status === 'order_placed'? 'selected' : '' }>placed</option>
                    <option value="prepared" ${order.status === 'prepared'? 'selected' : '' }>prepared</option>
                    <option value="packed" ${order.status === 'packed'? 'selected' : '' }>packed</option>
                    <option value="outforDelivery" ${order.status === 'outforDelevery'? 'selected' : '' }>outforDelivery</option>
                    <option value="completed" ${order.status === 'completed'? 'selected' : '' }>completed</option>
                </select>
            </form>
        </td>
        <td>${moment(order.createdAt).format('hh:mm A') }</td>
        <td>${moment(order.createdAt).format('DD/MM/YYYY')}</td>
      </tr>`
    }).join('');
}

module.exports = initAdminorders;