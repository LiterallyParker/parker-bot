module.exports = function(guild, name, type = 0) {
    return guild.channels.cache.find(ch => ch.name.toLowerCase() === name.toLowerCase() && ch.type === type) || null;
}