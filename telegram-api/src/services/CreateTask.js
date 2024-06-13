const client = require('../redis-client')

/**
 * Create Redis task
 * @param { string } id 
 * @param { string } taskType 
 * @param { object } data 
 */
async function createTask(id, taskType, data) {
    await client.hSet(`${taskType}:${id}`, data)
}

module.exports = createTask