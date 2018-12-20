const Koa = require('koa');
const Router = require('koa-router');
const OperateDB = require('./db_operate');
const app = new Koa();
const router = new Router();

app.use(router.routes())
    .use(router.allowedMethods());

router.get('/', async (ctx, next) => {
    const db = new OperateDB('./test.db');
    await db.connectDB().then(async result => {
        console.log(result);
        await db.run('create table First_Table (ID int(10), name varchar(60))');
        await db.run(`insert into First_Table values (1, 'Harlan')`);
        await db.all(`select * from First_Table`).then(result => {
            console.log(result);
            ctx.body = result;
        })
    })
});
router.post('/', async (ctx, next) => {

});

app.listen(3000);