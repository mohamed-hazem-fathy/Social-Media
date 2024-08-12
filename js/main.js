// Function: showSuccessAlert(custemMessage, typ)
// Description: Shows an alert with custom message and type (success or danger).
function showSuccessAlert(custemMessage, typ) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');

        alertPlaceholder.append(wrapper);
    };
    alert(custemMessage, typ);


}

