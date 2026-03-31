const router = require("express").Router();
const { pushEvent } = require("../queue");

router.post("/", async (req,res)=>{
  await pushEvent(req.body);
  res.json({status:"queued"});
});

module.exports = router;
