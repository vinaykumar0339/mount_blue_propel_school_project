const fs = require("fs");
const csv = require("csvtojson");
// IPL module Functions
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByEachTeam = require("./ipl/matchesWonByEachTeam");
const extraRunsConcenedByEachTeamIn2016 = require("./ipl/extraRunsConcenedByEachTeamIn2016")
const topTenEconomicalBowlersIn2015 = require("./ipl/topTenEconomicalBowlersIn2015")
const matchesWonByEachTeamVsVenue = require("./ipl/matchesWonByEachTeamVsVenue")

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {

        let result1 = matchesPlayedPerYear(matches);
        let result2 = matchesWonByEachTeam(matches);

        csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {
            let result3 = extraRunsConcenedByEachTeamIn2016(matches,deliveries);
            let result4 = topTenEconomicalBowlersIn2015(matches,deliveries);
            let result5 = matchesWonByEachTeamVsVenue(matches);
            saveMatchesPlayedPerYear(result1,result2,result3,result4,result5);
      });

      });
      
}


function saveMatchesPlayedPerYear(result1,result2,result3,result4,result5) {
  const jsonData = {
    matchesPlayedPerYear: result1,
    matchesWonByEachTeam: result2,
    extraRunsConcenedByEachTeamIn2016: result3,
    topTenEconomicalBowlersIn2015:result4,
    matchesWonByEachTeamVsVenue:result5
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();
