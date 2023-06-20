## sequelize mysql ssh 远程连接存在的问题

- sequelize 在配置中使用了cloneDeep导致部分stream无法读取。
- sequelize 初始化以后，在后续的执行过程中没有提供传递stream的方法。

## sequelize-mysql-ssh 使用

```javascript
const config = {
  host: "", //数据库远程地址
  username: "", //数据库用户名
  database: "", //数据库
  password: "", //数据库密码
  dialect: "mysql",
  ssh: {
    host: "", //远程主机地址
    port: 22, //主机端口
    username: "", //主机用户名
    password: "", //主机密码
  },
};

const sequelize = new Sequelize(config);
sequelize.query("select * from table").then((data) => {
  console.log("=====>", data);
});
```
