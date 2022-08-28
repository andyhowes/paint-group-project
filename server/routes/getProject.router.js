const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('in projects router');
  const query = `SELECT * FROM paintproject_input JOIN photo_upload ON photo_upload.id = paintproject_input.photo_upload_id JOIN project_buildingtype on project_buildingtype.id = paintproject_input.project_buildingtype_id join project_propertytype on project_propertytype.id = paintproject_input.project_propertytype_id join specialfeatureexterior_type on specialfeatureexterior_type.id = paintproject_input.specialfeatureexterior_type_id WHERE user_id = $1 AND id = $2`;
  const values = [req.user.id, req.body.id];
  pool.query(query, values)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR spawning project', err);
      res.sendStatus(500)
    })
});

module.exports = router;
