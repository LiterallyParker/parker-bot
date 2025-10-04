module.exports = async (guild) => {
    try { await require('./roles')(guild); } catch (e) { console.error("Roles setup failed:", e) };
    try { await require('./channels')(guild); } catch (e) { console.error("Channels setup failed:", e) };
    try { await require('./permissions')(guild); } catch (e) { console.error("Permissions setup failed:", e) };
    try { await require('./messages')(guild); } catch (e) { console.error("Messages setup failed:", e) };
};