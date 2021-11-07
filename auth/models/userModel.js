'use strict'

const userModel=(sequelize,DataTypes)=>sequelize.define('users',{
    username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
})

module.exports=userModel;