const schedule = require("node-schedule");

const tasks = [];

const registerTask = (name, cron, task) => {
    const job = schedule.scheduleJob(cron, task);
    tasks.push({ name, job });
    console.log(`Scheduled task registered: ${name}`);
};

const cancelTask = (name) => {
    const task = tasks.find((t) => t.name === name);
    if (task) {
        task.job.cancel();
        return console.log(`Scheduled task canceled: ${name}`);
    };
    return console.log(`Task not found: ${name}`);
};

const listTasks = () => {
    return tasks.map((t) => t.name);
};

module.exports = { registerTask, cancelTask, listTasks };