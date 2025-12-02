export default (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: DataTypes.STRING,
  });

  Organization.associate = (models) => {
    Organization.hasMany(models.User, { foreignKey: 'org_id' });
    Organization.hasMany(models.Contact, { foreignKey: 'org_id' });
  };

  return Organization;
};