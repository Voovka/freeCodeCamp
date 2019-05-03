function checkCashRegister(price, cash, cid) {
    
    let cashBox = {}, cashBoxRet = {};
    for (let i = 0; i < cid.length; i++) {
        cashBox[cid[i][0]] = cid[i][1];
        cashBoxRet[cid[i][0]] = 0.0;
    }

    let change = Math.round((cash - price) * 100) / 100;
    let cashType = "";

    while (true) {
        if (change >= 100 && cashBox['ONE HUNDRED'] > 0) {
            cashType = "ONE HUNDRED";
        } else if (change >= 20 && cashBox.TWENTY > 0) {
            cashType = "TWENTY";
        } else if (change >= 10 && cashBox.TEN > 0) {
            cashType = "TEN";
        } else if (change >= 5 && cashBox.FIVE > 0) {
            cashType = "FIVE";
        } else if (change >= 1 && cashBox.ONE > 0) {
            cashType = "ONE";
        } else if (change >= 0.25 && cashBox.QUARTER > 0) {
            cashType = "QUARTER";
        } else if (change >= 0.1 && cashBox.DIME > 0) {
            cashType = "DIME";
        } else if (change >= 0.05 && cashBox.NICKEL > 0) {
            cashType = "NICKEL";
        } else if (change >= 0.01 && cashBox.PENNY > 0) {
            cashType = "PENNY";
        } else {
            break;
        }

        change = Math.round((change - getPriceByCashName(cashType)) * 100) / 100;
        cashBoxRet[cashType] = Math.round((cashBoxRet[cashType] + getPriceByCashName(cashType)) * 100) / 100;
        cashBox[cashType] = Math.round((cashBox[cashType] - getPriceByCashName(cashType)) * 100) / 100;
        cashType = "";
    }


    let retObj = {status: "", change: []};

    if (change !== 0) {
        retObj.status = "INSUFFICIENT_FUNDS";
    } else {

        let restSumInBox = Object.values(cashBox).reduce((prevVal, currVal) => {
            return prevVal += currVal;
        }, 0);

        for (let cashTypeop in cashBoxRet) {
            if (cashBoxRet[cashTypeop] === 0 && restSumInBox !== 0) {
                delete cashBoxRet[cashTypeop];
            } else {
                retObj.change.push([cashTypeop, cashBoxRet[cashTypeop]]);
            }
        }

        if (restSumInBox !== 0) {
            retObj.change.reverse();
            retObj.status = "OPEN";
        } else {
            retObj.status = "CLOSED";
        }

    }
    console.log(retObj);
    return retObj;
}

function getPriceByCashName(cashName) {
    switch (cashName) {
        case "PENNY":
            return 0.01;
        case "NICKEL":
            return 0.05;
        case "DIME":
            return 0.1;
        case "QUARTER":
            return 0.25;
        case "ONE":
            return 1;
        case "FIVE":
            return 5;
        case "TEN":
            return 10;
        case "TWENTY":
            return 20;
        case "ONE HUNDRED":
            return 100;
    }

}

// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// //should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// // should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// // should return {status: "INSUFFICIENT_FUNDS", change: []}.

// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// // should return {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.