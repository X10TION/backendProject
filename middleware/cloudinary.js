const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'obittechnology', 
    api_key: '832937133612423', 
    api_secret: '0LQgwYZ_gniRi7jD_EiJ56M6fTU' 
  });
module.exports = cloudinary;