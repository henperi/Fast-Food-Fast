const rejectBtn = document.querySelector('.rejectBtn');

const completeAction = (e) => {
  if (e.target.classList.contains('updateStatusBtn')) {
    const orderId = e.srcElement.getAttribute('data-target');
    const orderStatus = e.srcElement.getAttribute('data-value');
    const statusData = {
      orderStatus,
    };

    const updateOrdersStatusUrl = `${localAPI}/orders/${orderId}`;
    fetch(updateOrdersStatusUrl, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-access-token': userToken,
      },
      body: JSON.stringify(statusData),
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        // return;
        if (data.success) {
          if (orderStatus >= 3) {
            flash('flash-success', data.success_msg);
            console.log(orderId);
            document
              .getElementById(`#${orderId}_completeModal`)
              .querySelector('.close-button')
              .click();

            const statusArea = document
              .getElementById(`${orderId.split('-')[0]}`)
              .querySelector('.status');
            statusArea.classList = 'status text-completed';
            statusArea.innerHTML = 'Completed';
            document
              .getElementById(`${orderId.split('-')[0]}`)
              .querySelectorAll('.triggerModal')
              .forEach(x => x.setAttribute('disabled', true));
          } else {
            flash('flash-error', data.success_msg);
            document
              .getElementById(`#${orderId}_rejectModal`)
              .querySelector('.close-button')
              .click();

            const statusArea = document
              .getElementById(`${orderId.split('-')[0]}`)
              .querySelector('.status');
            statusArea.classList = 'status text-rejected';
            statusArea.innerHTML = 'Rejected';
            document
              .getElementById(`${orderId.split('-')[0]}`)
              .querySelectorAll('.triggerModal')
              .forEach(x => x.setAttribute('disabled', true));
          }
        }
      })
      .catch((error) => {
        console.log(error);
        container.classList.add('hide');
        main.innerHTML = renderPoorNetwork();
      });
  }
};

window.addEventListener('click', completeAction);
