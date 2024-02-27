function getRandomNumber() {
    const min = 1;
    const max = 1000;

    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    getRandomNumber
};

console.log(getRandomNumber());
