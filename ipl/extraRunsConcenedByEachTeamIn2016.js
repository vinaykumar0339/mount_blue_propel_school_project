function extraRunsConcenedByEachTeamIn2016(matches,deliveries) {
    const result = {}
    for (let match of matches) {
        const season = match.season;
        const id = match.id
        if(season == '2016') {
            for(let delivery of deliveries) {
                bowlingTeam = delivery.bowling_team
                match_id = delivery.match_id
                if(match_id == id) {
                    if(result[bowlingTeam]){
                        result[bowlingTeam] += parseInt(delivery.extra_runs)
                    }else{
                        result[bowlingTeam] = parseInt(delivery.extra_runs)
                    }
                }
            }
        }
    }
    return result
}

module.exports = extraRunsConcenedByEachTeamIn2016;