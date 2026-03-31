async function detectAnomaly(event){
  let score=0;
  if(event.action==="upload") score+=20;
  return score;
}
module.exports={detectAnomaly};
