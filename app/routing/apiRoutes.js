const path = require("path");

let friends = require("../data/friends");
let apiRoutes = function (app) {
  // friends stuff in here
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    let user = req.body;
    console.log("The user", user);
    let match = {
      friend: null,
      scoreDifference: 99999999999,
    };

    for (let i = 0; i < friends.length; i++) {
      let friend = friends[i];
      // compare friends to user
      let userScores = user.scores.map((score) => {
        return parseInt(score);
      });
      user.scores = userScores;
      let friendScores = friend.scores;
      // do an inner loop to compare scores of friends to score of incoming user
      let differences = [];
      for (let j = 0; j < friendScores.length; j++) {
        differences.push(Math.abs(friendScores[j] - userScores[j]));
      }

      let totalDifference = differences.reduce((a, b) => {
        return a + b;
      });
      if(match.scoreDifference > totalDifference) {
         match.friend = friend;
         match.scoreDifference = totalDifference; 
      }

    }
    friends.push(user)
    // do the logic to loops through the friends and compare to incoming uer
    res.json(match);
  });
};

module.exports = apiRoutes;
