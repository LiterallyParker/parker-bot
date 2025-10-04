module.exports = async (member, until, reason = 'Bot timeout action') => {
    let communicationDisabledUntil = null;

    if (until instanceof Date) {
        communicationDisabledUntil = until;
    } else if (typeof until === 'number') {
        communicationDisabledUntil = new Date(Date.now() + until);
    } else {
        throw new Error('The "until" parameter must be a Date object or a number representing milliseconds.');
    }

    try {
        const updatedMember = await member.edit(
            { communicationDisabledUntil }, reason
        );
        return updatedMember;
    } catch (error) {
        console.error(`Failed to timeout member ${member.user.tag}:`, error);
        throw error;
    }  
}