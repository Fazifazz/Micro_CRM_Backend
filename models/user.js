export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    org_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    role: DataTypes.STRING,
  });

  User.associate = models => {
    User.belongsTo(models.Organization, { foreignKey: 'org_id' });
    User.hasMany(models.Contact, { foreignKey: 'created_by' });
  };

  return User;
};
