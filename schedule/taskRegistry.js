const scheduler = require("./scheduler");
const tasks = require("./tasks");

scheduler.registerTask(
    "Reset Store",
    "0 0 12 * * *",
    tasks.resetStore
);

console.log("All tasks registered.");