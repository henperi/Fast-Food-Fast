const loader = document.querySelector('.loader');
const responseArea = document.querySelector('.response-area');
const tbody = document.querySelector('tbody');
tbody.innerHTML = '';

const getUserOrders = () => {
  // const userId = localStorage.getItem('userId');
  const getUserOrdersUrl = `${localAPI}/orders`;

  fetch(getUserOrdersUrl, {
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
      // return;
      if (data.success) {
        if (data.totalOrders > 0) {
          for (let i = 0; i < data.totalOrders; i += 1) {
            tbody.innerHTML += userOrdersComponent(data, i);
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

getUserOrders();

const userOrdersComponent = (data, i) => {
  let stats = '';

  if (data.orders[i].order_status === 'Pending') {
    stats = '';
  } else stats = 'disabled';

  return `
<tr id="${data.orders[i].order_id.split('-')[0]}">
    <td>
        <a class="link" href="ordered-items.html">#${data.orders[i].order_id.split('-')[0]}</a>
    </td>
    <td>#${data.orders[i].ordered_by}</td>
    <td>${data.orders[i].ordered_items.quantity} Item(s)
        <a href="ordered-items.html?order_id=${data.orders[i].order_id}">
            <Button class="btn btn-sm btn-blue">View items</Button>
        </a>
    </td>
    <td>&#8358;${data.orders[i].total_mount}</td>
    <td>${formatDate(data.orders[i].created_at)}</td>
    <td class="status text-${data.orders[i].order_status.toLowerCase()}">
      ${data.orders[i].order_status}
    </td>
    <td class="hide text-${data.orders[i].delivery_status.toLowerCase()}">
      ${data.orders[i].delivery_status}
    </td>
    <td class="">
        <button class="hide triggerModal btn btn-blue btn-sm" 
          data-target="${data.orders[i].order_id}_acceptModal" ${stats}>Accept
        </button>
        <button class="comp triggerModal btn btn-green btn-sm" 
          data-target="${data.orders[i].order_id}_completeModal" ${stats}>
          Mark As Complete
        </button>
        <button class="triggerModal btn btn-red btn-sm" 
          data-target="${data.orders[i].order_id}_rejectModal" ${stats}>Reject
        </button>

        <div class="modal" id='#${data.orders[i].order_id}_rejectModal'>
            <div class="modal-content">
                <div class="text-center">
                    <span class="close-button btn btn-primary btn-sm push-right">x</span>
                    <h2 class="text-center">Reject User Order</h2>

                    <div class="content-div">
                        <h3 class="item-title link">Order(#55678)
                        </h3>
                        <h4 class="">Total Cost <span class="badge price">&#8358;3,500</span></h4>
                    </div>
                    <form action="javascript:;" method="POST" class=" card card-shadow">
                        <div class="">
                            <h2>Rejecting this order cancels all items within this
                                order. Are you sure
                                you want to reject this users order?</h2>
                            <button class="btn btn-red btn-rounded btn-bg updateStatusBtn" 
                              data-target="${data.orders[i].order_id}" 
                              data-value="2">Reject
                            </button>
                            <button class="close-button btn btn-primary btn-rounded btn-bg">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <div class="modal" id='#${data.orders[i].order_id}_completeModal'>
            <div class="modal-content">
                <div class="text-center">
                    <span class="close-button btn btn-primary btn-sm push-right">x</span>
                    <h2 class="text-center">Mark Order As Complete</h2>

                    <div class="content-div">
                        <div class="item-title">Chicken Stew and Rice -
                            <span class="badge price">&#8358;3,500</span>
                        </div>
                    </div>
                    <form action="javascript:;" method="POST" class=" card card-shadow">
                        <div class="">
                            <h2>Marking this order as complete accepts all the
                                items in the order and updates its delivery status to
                                completed, Are you sure you want to proceed?</h2>
                            <button class="btn btn-green btn-rounded btn-bg updateStatusBtn" 
                              data-target="${data.orders[i].order_id}" 
                              data-value="3">Proceed
                            </button>
                            <button class="close-button btn btn-primary btn-rounded btn-bg">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </td>
</tr>
`;
};
