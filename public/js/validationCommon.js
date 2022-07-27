function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextRange(value, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (length > max) {
        return false;
    }
    if (length < 1) {
        return false;
    }
    return true;
}

function checkTextRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (length > max) {
        return false;
    }
    if (length < min) {
        return false;
    }
    return true;
}

function checkNumberRange(value, min, max) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    value = parseFloat(value);

    if (value > max) {
        return false;
    }
    if (value < min) {
        return false;
    }
    return true;
}

function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

function checkIfBefore(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    const dateValue = new Date(value);
    if (!pattern.test(value)) {
        return false;
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + (nowDate.getDate()),
        year = nowDate.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    const stringDate = [year, month, day].join('-');
    const date2 = new Date(stringDate);

    if (date2.getTime() < dateValue.getTime()) {
        return false;
    }

    return true;
}

function checkIfAfter(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    const dateValue = new Date(value);
    if (!pattern.test(value)) {
        return false;
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + (nowDate.getDate()),
        year = nowDate.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    const stringDate = [year, month, day].join('-');
    const current = new Date(stringDate);

    if (current.getTime() > dateValue.getTime()) {
        return false;
    }

    return true;
}

function resetErrors(inputs, errorTexts) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
}
