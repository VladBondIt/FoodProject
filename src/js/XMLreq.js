// const r = new XMLHttpRequest();
// r.open('POST', 'server.php');


// Для JSON формата
// r.setRequestHeader('Content-type', 'application/json');
// Формат JSON
// r.send(json);

//При использовании XMLHttpRequest и FormData Заголовок устанавливать ненадо
// r.send(formData);
// r.setRequestHeader('Content-type', 'multipart/form-data');

// r.addEventListener('load', () => {
//     if (r.status === 200) {
//         console.log(r.response);
//         showThanksModal(message.success);
//         form.reset();
//         statusMessage.remove();
//     } else {
//         showThanksModal(message.failure);
//     }
// });