async function newPlayerMoneyGenerator(allUsers) {
    console.log("!!! newPlayerMoneyGenerator !!!");
    //console.log(allUsers);

    let totalPlayerMoney = 0;

    allUsers.forEach((element) => {
        if (element.money != undefined) {
            totalPlayerMoney += element.money;
        }
    });

    return totalPlayerMoney;
}

module.exports = newPlayerMoneyGenerator;
