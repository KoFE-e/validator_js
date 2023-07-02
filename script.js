const form = document.querySelector('.form'),
      fields = document.querySelectorAll('.form__input'),
      password = document.querySelector('#password'),
      confirmPassword = document.querySelector('#check-password'),
      email = document.querySelector('#email');


class Validator {

    clearErrors(form) {
        const errors = form.querySelectorAll('.error');
        errors.forEach(item => {
            item.remove();
        });
    };
    
    createError(message) {
        const error = document.createElement('span');
                error.classList.add('error');
                error.textContent = message;
        return error;
    };
    
    validateEmpty(field) {
        return field.value == '';
    };
    
    validateLength(field) {
        return field.value.length < 2;
    };
    
    validateEmail(email) {
        return email.value.match('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    };
    
    validatePassword(password, confirmPassword) {
        return password.value == confirmPassword.value;
    };
    
    checkEmpty(fields) {
        fields.forEach(item => {
            if (this.validateEmpty(item)) {
                const error =  this.createError("Поле не должно быть пустым");
                item.parentElement.append(error);
            }
        });
    };
    
    minLength(fields) {
        fields.forEach(item => {
            if (this.validateLength(item)) {
                const error =  this.createError("Длина должна быть не менее 2 символов");
                item.parentElement.append(error);
            }
        });
    };
    
    checkEmail(email) {
        if (!this.validateEmail(email)) {
            const error =  this.createError("Введите адрес почты");
            email.parentElement.append(error);
        }
    };
    
    checkPassword(password, confirmPassword) {
        if (!this.validatePassword(password, confirmPassword)) {
            const error =  this.createError("Пароли не совпадают");
            confirmPassword.parentElement.append(error);
        }
    };
    
    showErrors(fields, email, password, confirmPassword) {
        this.checkEmpty(fields);
        this.minLength(fields);
        this.checkEmail(email);
        this.checkPassword(password, confirmPassword);
    };
}

const validator = new Validator();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    validator.clearErrors(form);
    validator.showErrors(fields, email, password, confirmPassword);

});