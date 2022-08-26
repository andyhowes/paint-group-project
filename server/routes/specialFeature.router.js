const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('req.body:', req.body);
  const addSF = `
  INSERT INTO "paintproject_input" (
  "isproject_typespecialfeature",
  "specialfeatureexterior_type_id",
  "specialfeature_paintproduct",
  "isspecialfeaturestatus_needprimer",
  "isspecialfeaturestatus_patchedrepair",
  "isspecialfeaturestatus_extensivescraping",
  "specialfeature_notes")
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  const values = [true, req.body.specialFeatureType, req.body.specialFeatureProduct, req.body.primeIsChecked, req.body.patchingIsChecked, req.body.scrapingIsChecked, req.body.specialFeatureNotes];
  pool.query(addSF, values)
  .then(result => {
    console.log('added to paintproject_input');
  }).catch(err => {
    console.log('problem adding special feature data', err);
    res.sendStatus(500);
  })
  // POST route code here
});

module.exports = router;