function topTenEconomicalBowlersIn2015(matches,deliveries) {
    const result  = {}
    const result1 = {}
    const result2 = {}
    for (let match of matches) {
        const season = match.season;
        const id = match.id;
        if(season == '2015') {
            for (let delivery of deliveries) {
                const match_id = delivery.match_id;
                const bowler = delivery.bowler;
                if (match_id == id) {
                    if(result[bowler]){
                        if(result[bowler]["balls"]){
                            result[bowler]["balls"] += 1
                        }else {
                            result[bowler]["balls"] = 1
                        }
                        if(result[bowler]["total_runs"]){
                            result[bowler]["total_runs"] += parseInt(delivery.total_runs)
                        }else{
                            result[bowler]["total_runs"] += parseInt(delivery.total_runs)
                        }
                    }else{
                        result[bowler] = {}
                        result[bowler]["balls"] = 1
                        result[bowler]["total_runs"] = parseInt(delivery.total_runs)
                    }
                }
            }
        }
    }

    for (let name in result) {
        result1[name] = {}
        const round = Math.floor((result[name]["balls"])/6)
        const mod = (result[name]["balls"])%6
        const over = round.toString() + "." + mod.toString()
        result1[name] = result[name]["total_runs"]/parseFloat(over)  
        
    }

    const sortedEconomyRate = Object.values(result1)
                                .sort(function(a, b){return a - b})
                                .slice(0,10) 

    for (let EconomyRate of sortedEconomyRate) {
    for (let key in result1) {
      if (result1[key] == EconomyRate) {
        result2[key] = EconomyRate
      }
    }
  }
    return result2
}

module.exports = topTenEconomicalBowlersIn2015;