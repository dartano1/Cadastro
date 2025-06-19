const form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let formIsValid = true;

    const fields = [
    { id: 'name', label: 'Nome', validator: nameIsValid },
    { id: 'birthdate', label: 'Nascimento', validator: dateIsValid },
    { id: 'email', label: 'E-mail', validator: emailIsValid },
    { id: 'bairro', label: 'Bairro', validator: bairroIsValid }, 
    { id: 'alunos_estacio', label: 'Aluno Estácio', validator: notEmpty },
    { id: 'comorbidade', label: 'Comorbidade', validator: notEmpty}
];


    const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>'; 

    fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        const inputBox = input.closest('.input_box');
        const inputValue = input.value; 
        const errorSpan = inputBox.querySelector('.error');

        errorSpan.innerHTML = '';
        inputBox.classList.remove('invalid', 'valid');

        const fieldValidator = field.validator(inputValue);

        if (!fieldValidator.isValid) {
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`; 
            inputBox.classList.add('invalid');
            formIsValid = false;
        } else {
            inputBox.classList.add('valid');
        }
    });

    const genders = document.getElementsByName('gender');
    const radiocontainer = document.querySelector('.radio-container');
    const genderErrorSpan = radiocontainer.querySelector('.error'); 

    radiocontainer.classList.remove('invalid', 'valid');
    genderErrorSpan.innerHTML = '';

    const selectedGender = [...genders].find(input => input.checked);

    if (selectedGender) {
        radiocontainer.classList.add('valid');
    } else {
        radiocontainer.classList.add('invalid');
        genderErrorSpan.innerHTML = `${errorIcon} Selecione um gênero!`;
        formIsValid = false;
    }

    if (formIsValid) {
        console.log('Formulário válido! Pode enviar para o servidor.');
    }
});



function isEmpty(value) {
    return value.trim() === '';
}

function notEmpty(value) {
    const validator = { isValid: true, errorMessage: null };
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Campo obrigatório!';
    }
    return validator;
}

function nameIsValid(value) {
    const validator = { isValid: true, errorMessage: null };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Campo obrigatório!';
        return validator;
    }

    const min = 3;
    if (value.length < min) {
        validator.isValid = false;
        validator.errorMessage = `Mínimo de ${min} caracteres!`;
        return validator;
    }
    
    const regex = /^[a-zA-Z\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\-]+$/;
    if (!regex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Apenas letras permitidas!';
    }

    return validator;
}

function dateIsValid(value) {
    const validator = { isValid: true, errorMessage: null };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O nascimento é obrigatório!';
        return validator;
    }

    const year = new Date(value).getFullYear();
    if (year < 1920 || year > new Date().getFullYear()) {
        validator.isValid = false;
        validator.errorMessage = 'Data inválida!';
    }

    return validator;
}

function emailIsValid(value) {
    const validator = { isValid: true, errorMessage: null };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O e-mail é obrigatório!';
        return validator;
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Formato de e-mail inválido!';
    }

    return validator;
}

function bairroIsValid(value) {
    const validator = { isValid: true, errorMessage: null };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O bairro é obrigatório!';
        return validator;
    }

   
    const regex = /^[a-zA-Z\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\-]+$/;
    if (!regex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O bairro não pode conter números!';
    }

    const min = 3;
    if (value.length < min) {
        validator.isValid = false;
        validator.errorMessage = `Mínimo de ${min} caracteres!`;
        return validator;
    }

    return validator;
    
}


