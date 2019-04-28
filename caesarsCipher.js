let alpArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


function getRightChar(index) {
    if (typeof index === "number") {
        if (index + 13 >= 26) {
            return alpArr[index + 13 - 26];
        } else {
            console.log(index + 13);
            return alpArr[index + 13];
        }
    } else {
        return index;
    }
}

function rot13(str) { // LBH QVQ VG!
    let myArr = [];
    for (let i = 0; i < str.length; i++) {
        if (alpArr.indexOf(str[i]) !== -1)
            myArr.push(alpArr.indexOf(str[i]));
        else
            myArr.push(str[i]);
    }
    myArr = myArr.map((e) => {
        e = getRightChar(e);
        return e;
    });

    return myArr.join("");
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");
