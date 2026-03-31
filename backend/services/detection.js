function calculateRisk(url){
  if(url.includes("pastebin")) return 90;
  if(url.includes("github")) return 60;
  return 30;
}
function getLevel(score){
  if(score>80) return "critical";
  if(score>60) return "high";
  if(score>40) return "medium";
  return "low";
}
module.exports={calculateRisk,getLevel};
