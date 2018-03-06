module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    code: { type: DataTypes.STRING(6), unique: true },
    originalUrl: DataTypes.STRING,
  }, {});
  urls.createObject = (code, originalUrl) => urls.findOrCreate({
    where: { code },
    defaults: { originalUrl },
  });
  return urls;
};
