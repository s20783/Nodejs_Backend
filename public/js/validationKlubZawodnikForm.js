function validateForm(){
    const klubInput = document.getElementById('ID_klub');
    const zawodnikInput = document.getElementById('ID_zawodnik');
    const numerInput = document.getElementById('Numer');
    const dataOdInput = document.getElementById('Od_kiedy');
    //const dataDoInput = document.getElementById('dataDo');

    const klubError = document.getElementById('errorKlub');
    const zawodnikError = document.getElementById('errorZawodnik');
    const numerError = document.getElementById('errorNumer');
    const dataOdError = document.getElementById('errorDataOd');
    //const dataDoError = document.getElementById('errorDataDo');

    let valid = true;

    resetErrors([klubInput,zawodnikInput,numerInput,dataOdInput],[klubError,zawodnikError,numerError,dataOdError]);

    if(!checkRequired(klubInput.value)){
        valid = false;
        klubInput.classList.add("error-input");
        klubError.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(zawodnikInput.value)){
        valid = false;
        zawodnikInput.classList.add("error-input");
        zawodnikError.innerText = "Pole jest wymagane";
    }

    if(!checkNumberRange(numerInput.value,1,99)){
        valid = false;
        numerInput.classList.add("error-input");
        numerError.innerText = "Pole powinno zawierać liczbę od 1 do 99";
    }


    if(!checkDate(dataOdInput.value)){
        valid = false;
        dataOdInput.classList.add("error-input");
        dataOdError.innerText = "Pole jest wymagane";
    } else if (!checkIfBefore(dataOdInput.value)){
        valid = false;
        dataOdInput.classList.add("error-input");
        dataOdError.innerText = "Zła data";
    }


    return valid;
}

