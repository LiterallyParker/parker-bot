const timeoutMember = require("./timeoutMember");

module.exports = (member, reason = 'Bot cleared timeout') => {
    return timeoutMember(member, null, reason);
};