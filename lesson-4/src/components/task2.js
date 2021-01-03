'use strict';

function valideForm() {
    var regExp_name = /^[a-zа-яё]+$/gi,
        regExp_email = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
        regExp_phone = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{2}){2}$/,
        regExp_message = /[a-zа-яё0-9]/;

    let name = document.getElementsByName('name')[0].value,
        email = document.getElementsByName('email')[0].value,
        phone = document.getElementsByName('phone')[0].value,
        message = document.getElementsByName('message')[0].value; 

    /**
     * Проверка имени
     */
    if(regExp_name.test(name)) {
        document.getElementById('name').className = 'done_val';
    } else {
        document.getElementById('name').className = 'error_val';
    }
    /**
     * Проверка телефона
     */
    if(regExp_phone.test(phone)) {
        document.getElementById('phone').className = 'done_val';
    } else {
        document.getElementById('phone').className = 'error_val';
    }
    /**
     * Проверка email
     */
    if(regExp_email.test(email)) {
        document.getElementById('email').className = 'done_val';
    } else {
        document.getElementById('email').className = 'error_val';
    }
    /**
     * Проверка сообщения
     */
    if(regExp_message.test(message)) {
        document.getElementById('message').className = 'done_val';
    } else {
        document.getElementById('message').className = 'error_val';
    }
}
document.querySelector('.button').addEventListener("click", valideForm);

