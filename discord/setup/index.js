module.exports = (guild) {
    await require('./roles')(guild);
    await require('./channels')(guild);
    await require('./permissions')(guild);
    await require('./messages')(guild);
};