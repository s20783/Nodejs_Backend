function validateForm(){
    const imieInput = document.getElementById('Imie');
    const nazwiskoInput = document.getElementById('Nazwisko');
    const pozycjaInput = document.getElementById('Pozycja');

    const imieError = document.getElementById('errorImie');
    const nazwiskoError = document.getElementById('errorNazwisko');
    const pozycjaError = document.getElementById('errorPozycja');

    const reqMessage = document.getElementById('errorMessage').innerText;
    const reqMessage2 = document.getElementById('errorMessage2').innerText;
    const reqMessage3 = document.getElementById('errorMessage3').innerText;

    let valid = true;

    resetErrors([imieInput,nazwiskoInput,pozycjaInput],[imieError,nazwiskoError,pozycjaError]);

    if(!checkTextRange(imieInput.value,40)){
        valid = false;
        imieInput.classList.add("error-input");
        imieError.innerText = reqMessage2;
    }
    if(!checkRequired(imieInput.value)){
        valid = false;
        imieInput.classList.add("error-input");
        imieError.innerText = reqMessage;
    }


    if(!checkTextRange(nazwiskoInput.value,40)){
        valid = false;
        nazwiskoInput.classList.add("error-input");
        nazwiskoError.innerText = reqMessage2;
    }
    if(!checkRequired(nazwiskoInput.value)){
        valid = false;
        nazwiskoInput.classList.add("error-input");
        nazwiskoError.innerText = reqMessage;
    }

    // if(!xd(pozycjaInput.value)){
    //     valid = false;
    //     pozycjaInput.classList.add("error-input");
    //     pozycjaError.innerText = "Pole jest wymagane";
    // }


    if(!checkRequired(pozycjaInput.value)){
        valid = false;
        pozycjaInput.classList.add("error-input");
        pozycjaError.innerText = reqMessage;
    }
    // if(pozycjaInput.value){
    //     valid = false;
    //     pozycjaInput.classList.add("error-input");
    //     pozycjaError.innerText = "Pole jest wymagane";
    // }


    return valid;
}

