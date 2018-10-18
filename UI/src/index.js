const main = document.querySelector('main');
const foodMenu = document.querySelector('.food-menu');
const card = document.querySelector('.card');
const container = document.querySelector('.container');

const userToken = localStorage.getItem('userToken') || undefined;

const localAPI = 'http://localhost:5000/api/v1';
const remoteAPI = 'http://localhost:5000/api/v1';

const localhost = window.location.origin;
// alert(localhost);
