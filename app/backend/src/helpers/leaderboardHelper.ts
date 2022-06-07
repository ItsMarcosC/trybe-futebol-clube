import Teams from '../database/models/TeamsMdl';
import Matches from '../database/models/MatchesMdl';

const homeMatches = (id:number, matchs:Matches[]) => matchs
  .filter((index) => index.homeTeam === id && !index.inProgress);
const awayMatches = (id:number, matchs:Matches[]) => matchs
  .filter((index) => index.awayTeam === id && !index.inProgress);
const homeDraws = (id:number, matchs:Matches[]) => homeMatches(id, matchs)
  .filter((index) => index.homeTeamGoals === index.awayTeamGoals && !index.inProgress);
const awayDraws = (id:number, matchs:Matches[]) => awayMatches(id, matchs)
  .filter((index) => index.homeTeamGoals === index.awayTeamGoals && !index.inProgress);
const homeWins = (id:number, matchs:Matches[]) => homeMatches(id, matchs)
  .filter((index) => index.homeTeamGoals > index.awayTeamGoals && !index.inProgress);
const awayWins = (id:number, matchs:Matches[]) => awayMatches(id, matchs)
  .filter((index) => index.homeTeamGoals < index.awayTeamGoals && !index.inProgress);

const leaderboardHelp = (teams:Teams[], matchs:Matches[]) => teams.map(({ id, teamName: name }) => {
  const allGames = homeMatches(id, matchs).length + awayMatches(id, matchs).length;
  const allDraws = homeDraws(id, matchs).length + awayDraws(id, matchs).length;
  const allWins = homeWins(id, matchs).length + awayWins(id, matchs).length;
  const goalsScoredHome = homeMatches(id, matchs).reduce((a, c) => a + c.homeTeamGoals, 0);
  const goalsScoredAway = awayMatches(id, matchs).reduce((a, c) => a + c.awayTeamGoals, 0);
  const goalsConcededHome = homeMatches(id, matchs).reduce((a, c) => a + c.awayTeamGoals, 0);
  const goalsConcededAway = awayMatches(id, matchs).reduce((a, c) => a + c.homeTeamGoals, 0);

  return { name,
    allGames,
    allDraws,
    allWins,
    allLosses: allGames - allDraws - allWins,
    teamPoints: allWins * 3 + allDraws,
    goalsPro: goalsScoredHome + goalsScoredAway,
    goalsAgainst: goalsConcededHome + goalsConcededAway,
    goalsDiff: (goalsScoredHome + goalsScoredAway) - (goalsConcededHome + goalsConcededAway),
    pointsPercentage: +(((allWins * 3 + allDraws) / (allGames * 3)) * 100).toFixed(2),
  };
});

export default leaderboardHelp;