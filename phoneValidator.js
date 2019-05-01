function telephoneCheck(str) {
    // Good luck!

    let regExp = /\D/g;


    // проверка скобки
    if (str.replace(/[^()]/g, "").length > 0) {
        if (str.replace(/[^()]/g, "").length !== 2 || (str.replace(/[^()]/g, "x").indexOf(")") - str.replace(/[^()]/g, "x").indexOf("(") !== 4)) {
            console.log("return false by ()");
            return false;
        }
    }


    if (/^\d|^\(/.test(str)) {
        if (str.replace(regExp, "").length === 11 && str.replace(regExp, "").substr(0, 1) === "1") {
            return true;
        } else if (str.replace(regExp, "").length === 10) {
            return true;
        } else {
            return false
        }
    } else {
        console.log("return false by first symbol");
        return false;
    }

}


function telephoneCheckSolution(str) {
    let regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    return regex.test(str);
}