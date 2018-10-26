const loader = document.querySelector('.loader');
const responseArea = document.querySelector('.response-area');
const tbody = document.querySelector('tbody');
tbody.innerHTML = '';

const getMyOrders = () => {
  const userId = localStorage.getItem('userId');
  const getMyOrdersUrl = `${localAPI}/users/${userId}/orders`;

  fetch(getMyOrdersUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      'x-access-token': userToken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);

      if (data.success) {
        if (data.totalOrders > 0) {
          for (let i = 0; i < data.totalOrders; i += 1) {
            tbody.innerHTML += myOrdersComponent(data, i);
          }
          return;
        }
        tbody.innerHTML = '';
        return;
      }
      tbody.innerHTML = ' ';
    })
    .catch((error) => {
      console.log(error);
      container.classList.add('hide');
      main.innerHTML = renderPoorNetwork();
    });
};

getMyOrders();

const myOrdersComponent = (data, i) => `
<tr>
    <td>
        <a href="ordered-items.html" class="link">
          #${data.orders[i].order_id.split('-')[0]}
        </a>
    </td>
    <td>${data.orders[i].ordered_items.quantity} Item(s)
        <a href="ordered-items.html?order_id=${data.orders[i].order_id}">
            <Button class="btn btn-sm btn-blue">View items</Button>
        </a>
    </td>
    <td>&#8358;${data.orders[i].total_mount}</td>
    <td>${formatDate(data.orders[i].created_at)}</td>
    <td class="text-${data.orders[i].order_status.toLowerCase()}">
      ${data.orders[i].order_status}
    </td>
    <td class="hide text-${data.orders[i].delivery_status.toLowerCase()}">
      ${data.orders[i].delivery_status}
    </td>
    <td class="">
        <button class="hide triggerModal btn btn-red btn-sm" 
          data-target="${data.orders[i].order_id}">Cancel
            Order</button>

        <div class="modal" id='#${data.orders[i].order_id}'>
            <div class="modal-content">
                <div class="text-center">
                    <span class="close-button btn btn-primary btn-sm push-right">x</span>
                    <h2 class="text-center">Cancel Your Order</h2>

                    <div class="content-div">
                        <h3 class="item-title link">
                        Order(#${data.orders[i].order_id.split('-')[0]})
                        </h3>
                        <h3 class="">
                          Total Price &#8358;${data.orders[i].total_mount}
                        </h3>
                    </div>
                    <form action="javascript:;" method="POST" class=" card card-shadow">
                        <div class="">
                            <h2>Are you sure you want to cancel your order?</h2>
                            <button class="btn btn-red btn-rounded btn-bg">Cancel</button>
                            <button class="close-button btn btn-primary btn-rounded btn-bg">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </td>
</tr>
`;
