'use strict';

export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    org_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    notes: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
  });

  Contact.associate = (models) => {
    Contact.belongsTo(models.Organization, { foreignKey: 'org_id' });
    Contact.belongsTo(models.User, { foreignKey: 'created_by' });
  };

  return Contact;
};