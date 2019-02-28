const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'xiaocy', {
  dialect: 'mysql',
  host: 'localhost',
  port: '3306',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// let promise = sequelize.query("set FOREIGN_KEY_CHECKS=0"); // Cannot add foreign key constraint

// 模型定义
const Bar = sequelize.define('bar', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Foo = sequelize.define('foo', {
  flag: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  mydate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bar_id: { // 外键
    type: Sequelize.INTEGER,
    references: {
      model: Bar,
      key: 'id'
    }
  }
})


// 谨慎使用
// 同步到mysql数据库
// Bar.sync({ force: true }); // 加force:true，会先删掉表后再建表
// Foo.sync({force: true});


// 插入数据
// Bar.create({
//   'name': 'bar1'
// }).then(result => {
//   console.log('Bar1 insert successfully.');
// }).catch(err => {
//   console.log('Bar1 insert failed.');
//   console.log(err);
// })
// 批量插入
// Bar.bulkCreate([
//   {
//     name: 'bar2'
//   },{
//     name: 'bar3'
//   },{
//     name: 'bar4'
//   }
// ]).then(() => {
//   console.log('bar2, bar3, bar4 insert successfully.');
// }).catch(err => {
//   console.log('bar2, bar3, bar4 insert failed.');
//   console.log(err);
// })
// Foo.bulkCreate([
//   {
//     flag: false,
//     title: 'title1',
//     bar_id: 2
//   },{
//     title: 'title2',
//     bar_id: 2
//   },{
//     flag: true,
//     title: 'title3',
//     bar_id: 3
//   },{
//     title: 'title4',
//     bar_id: 3
//   },{
//     flag: false,
//     title: 'title5',
//     bar_id: 3
//   }
// ]).then(() => {
//   console.log('foo1-5 insert successfully.');  
// }).catch(err => {
//   console.log('foo1-5 insert failed.');
//   console.log(err);
// }


// 查询
// sequelize.query('SELECT * FROM bars;').then(result => {
//   console.log(result);
// }) // 原始查询
// Bar.findAll({
//   attributes: ['id', 'name'],
//   raw: true
// }).then(result => {
//   console.log(result);
//   console.log(result[0]);
// });
// Foo.findOne({
//   where: {
//     bar_id: 3
//   }
// }).then(result => {
//   console.log(result.get('title'));
// })


// 删除
// Foo.destroy({
//   where: {
//     title: 'title1'
//   }
// }).then(() => {
//   console.log('destory successfully.');
// }).catch(() => {
//   console.log('destory failed.');
// })


// 更新
// Foo.update({
//   bar_id: 2
// },{
//   where:{
//     title: 'title3'
//   }
// }).then(() => {
//   console.log('update successfully.');
// }).catch(() => {
//   console.log('update failed.');
// })


// foos表和bars表连接查询
// Foo.belongsTo(Bar, { foreignKey: 'bar_id' });
// Foo.findOne({
//   attributes: ['flag', 'mydate', 'title'],
//   include: [{
//     model: Bar,
//     attributes: ['name'],
//   }],
//   where: {
//     id: 2
//   },
//   raw: true
// }).then(result => {
//   console.log(result);
//   // console.log(result['bar.name']);
// }).catch(err => {
//   console.log(err);
// })


// 将对应bars表中name为'bar1'的foos行的title项更新为'title6'
// Foo.belongsTo(Bar, { foreignKey: 'bar_id' });
// Bar.findOne({
//   where: {
//     name: 'bar1'
//   }
// }).then(result => {
//   let id = result.id;
//   Foo.update({
//     title: 'title6',
//   }, {
//     where: {
//       bar_id: id
//     }
//   }).then(() => {
//     console.log('update successfully.');
//   }).catch(err => {
//     console.log(err);
//   })
// });
