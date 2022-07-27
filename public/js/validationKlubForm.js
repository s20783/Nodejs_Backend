function validateForm(){
    const nazwaInput = document.getElementById('Nazwa');
    const skrotInput = document.getElementById('Skrot');
    const kolorInput = document.getElementById('Kolor_stroju');

    const nazwaError = document.getElementById('errorNazwa');
    const skrotError = document.getElementById('errorSkrot');
    const kolorError = document.getElementById('errorKolor');

    const reqMessage = document.getElementById('errorMessage').innerText;
    const reqMessage2 = document.getElementById('errorMessage2').innerText;
    const reqMessage3 = document.getElementById('errorMessage3').innerText;
    const reqMessage4 = document.getElementById('errorMessage4').innerText;
    let valid = true;

    resetErrors([nazwaInput,skrotInput,kolorInput],[nazwaError,skrotError,kolorError]);

    if(!checkTextRange(nazwaInput.value,40)){
        valid = false;
        nazwaInput.classList.add("error-input");
        nazwaError.innerText = reqMessage2;
    }
    if(!checkRequired(nazwaInput.value)){
        valid = false;
        nazwaInput.classList.add("error-input");
        nazwaError.innerText = reqMessage;
    }


    if(!checkTextRange(kolorInput.value,20)){
        valid = false;
        kolorInput.classList.add("error-input");
        kolorError.innerText = reqMessage3;
    }
    if(!checkRequired(kolorInput.value)){
        valid = false;
        kolorInput.classList.add("error-input");
        kolorError.innerText = reqMessage;
    }


    if(!checkTextRange2(skrotInput.value,2,3)){
        valid = false;
        skrotInput.classList.add("error-input");
        skrotError.innerText = reqMessage4;
    }
    if(!checkRequired(skrotInput.value)){
        valid = false;
        skrotInput.classList.add("error-input");
        skrotError.innerText = reqMessage;
    }

    return valid;
}

