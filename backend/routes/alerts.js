const router = require("express").Router();
const { Alert } = require("../models");

router.get("/", async (req,res)=>{
  const alerts = await Alert.find().sort({createdAt:-1});
  res.json(alerts);
});

module.exports = router;
