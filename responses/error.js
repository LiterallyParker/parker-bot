module.exports = ({
    message = "There was an error"
}) => {
    return {
        error: true,
        message
    }
}