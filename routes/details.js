const routeDetails = require("express").Router();
const validate = require("../auth/hapi");
const response_code = require("../responses");
//get the database connection
const client = require("../db/connection");

/**
 *  http method: GET
    /details?query_params....
 *  Get the primary information about bank details by
 *  1. branch IFSC code 
 *      /details?ifsc=xx123
 *  2. bank name and a city  
 *    /details?bname=xyz&city=xc1
 */

//private route
routeDetails.get("/", async (req, res) => {
  //default params
  var limit = null;
  var offset = 0;

  if (req.query.hasOwnProperty("limit")) limit = req.query.limit;

  if (req.query.hasOwnProperty("offset")) offset = req.query.offset;

  if (req.query.hasOwnProperty("ifsc")) {
    /*  Get the primary information about bank details by
     *  1. branch IFSC code
     *      /details?ifsc=xx123
     */
    const err = validate.ifsc_validate({ ifsc: req.query.ifsc });

    if (err) res.status(400).json(response_code(400, err.details[0].message));

    //valid request
    client.query(
      "select * from branches where ifsc=$1 order by id limit $2 offset $3",
      [req.query.ifsc, limit, offset],
      (error, result) => {
        if (error)
          return res.status(400).json({
            msg: error.name,
            code: error.code,
            routine: error.routine
          });
        if (result.rowCount > 0) return res.json(result.rows[0]);
        else return res.json({});
      }
    );
  } else if (
    req.query.hasOwnProperty("bname") ||
    req.query.hasOwnProperty("city")
  ) {
    /*  Get the primary information about bank details by
     *  2. bank name and a city
     *   /details?bname=xyz&city=xc1
     */

    const err = validate.bname_city_validate({
      bname: req.query.bname,
      city: req.query.city
    });

    if (err) res.status(400).json(response_code(400, err.details[0].message));

    //valid request
    client.query(
      "select * from branches inner join banks on branches.bank_id=banks.id where branches.city=$1 and banks.name=$2 order by branches.id limit $3 offset $4",
      [req.query.city, req.query.bname, limit, offset],
      (error, result) => {
        if (error)
          return res.status(400).json({
            msg: error.name,
            code: error.code,
            routine: error.routine
          });
        if (result.rowCount > 0) return res.json(result.rows);
        else return res.json({});
      }
    );
  } else {
    res.status(400).json(response_code(400, "Bad input parameter"));
  }
});

module.exports = routeDetails;
