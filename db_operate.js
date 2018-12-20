const sqlite3 = require('sqlite3').verbose();

class OperateDB {
    constructor(filePath) {
        this.filePath = filePath;
        this.db = null;
    }

    connectDB() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.filePath, (err) => {
                if(err) reject(new Error(err));
                resolve('数据库连接成功')
            })
        })
    }
    run(sql) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, (err) => {
                if(err) reject(err);
                resolve('操作成功');
            })
        })
    }
    all(sql) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, (err,result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
    }
}
module.exports = OperateDB;