module.exports = {
    createUser: (connection, params, db) => {
        return new Promise(async (resolve, reject) => {
            try {
                let insertData = await connection.collection(db).insert(params);
                resolve(insertData);
            } catch (error) {
                reject(error);
            }
        });
    },
    updateUser: async (data, params, query) => {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    },
}