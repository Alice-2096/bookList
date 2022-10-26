const account = document.getElementById('login-text');
const pwd = document.getElementById('pwd');
const loginBtn = document.querySelector('.log-in-btn');
const err = document.getElementById('error-message');

loginBtn.addEventListener('click', () => (location.href = '/'));

// Authentication: get the username and pwd, check if it is correct. If correct, redirect to homepage; if not, display error message.

// const form = {
//   username: account,
//   password: pwd,
//   submit: btn,
//   message: err,
// };

// const payload = `username=${account.value}&password=${pwd.value}`;

// //click event
// btn.addEventListener('click', () => {
//   const xhr = new XMLHttpRequest(); //make a request to the server

//   //when we receive a response from the server
//   xhr.onload = function () {
//     //parse the response object
//     let responseObject = null;

//     try {
//       responseObject = JSON.parse(xhr.responseText);
//     } catch (error) {
//       console.log('could not pass JSON');
//     }

//     //if there's no error
//     if (responseObject) {
//       //do something to the response object
//       handleResponse(responseObject);
//     }
//   };

//   xhr.open('POST', '../../routes/api/check-login.js');
//   // set request header
//   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//   // send the request along with the payload
//   xhr.send(payload);
// });

// function handleResponse(res) {
//   console.log(res);
// }
