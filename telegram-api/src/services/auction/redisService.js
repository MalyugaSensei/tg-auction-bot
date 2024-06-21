const { client } = require('@/redis-client')

/**
 * Create Redis task
 * @param { string } id 
 * @param { string } taskType 
 * @param { object } data 
 */
async function createTask(id, taskType, data) {
    try {
        await client.hSet(`${taskType}:${id}`, data)
    } catch (error) {
        console.error(error)
    }
}

/**
 * Get all Redis tasks
 * @param { String } pattern
 * @param { Object } [options]
 * @param { {[key: String]: String | string[]} } [options.where]
 * @returns { Promise<{[key: String]: String}[]> }
 */
async function getAll(pattern, { where = null } = {}) {
    try {
        const keys = await client.keys(pattern);
        //console.log(keys)

        if (keys.length === 0) {
            return [];
        }

        const allData = await Promise.all(keys.map(key => client.hGetAll(key)));

        if (!where || !Object.keys(where).length) {
            return allData;
        }

        return allData.filter(data => {
            return Object.entries(where).every(([field, values]) => {
                return Array.isArray(values) ? values.includes(data[field]) : values === data[field]
            });
        });

    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    createTask,
    getAll
}

