module.exports = ({
    message = "Success.",
    data = null
}) => {
    return {
        error: false,
        message,
        data
    }
}