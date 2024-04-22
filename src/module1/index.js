function getRandomNumber() {
    const min = 1;
    const max = 1000;

    const random = Math.floor(Math.random() * (max - min) + min);
    console.log(random);
    return random;
}

module.exports = {
    getRandomNumber
};
