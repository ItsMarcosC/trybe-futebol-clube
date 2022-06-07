import Matches from '../database/models/MatchesMdl';
import Teams from '../database/models/TeamsMdl';
import IBoard from '../interfaces/ILeaderboard';

const homeMatches = (id:number, matches:Matches[]) => matches
  .filter((index) => index.homeTeam === id && !index.inProgress);
const awayMatches = (id:number, matches:Matches[]) => matches
  .filter((index) => index.awayTeam === id && !index.inProgress);
const homeDraws = (id:number, matches:Matches[]) => homeMatches(id, matches)
  .filter((index) => index.homeTeamGoals === index.awayTeamGoals && !index.inProgress);
const awayDraws = (id:number, matches:Matches[]) => awayMatches(id, matches)
  .filter((index) => index.homeTeamGoals === index.awayTeamGoals && !index.inProgress);
const homeWins = (id:number, matches:Matches[]) => homeMatches(id, matches)
  .filter((index) => index.homeTeamGoals > index.awayTeamGoals && !index.inProgress);
const awayWins = (id:number, matches:Matches[]) => awayMatches(id, matches)
  .filter((index) => index.homeTeamGoals < index.awayTeamGoals && !index.inProgress);

const board = (teams:Teams[], matches:Matches[]): IBoard[] => teams.map(({ id, teamName }) => {
  const totalGames = homeMatches(id, matches).length + awayMatches(id, matches).length;
  const totalDraws = homeDraws(id, matches).length + awayDraws(id, matches).length;
  const totalVictories = homeWins(id, matches).length + awayWins(id, matches).length;
  const goalsFavorH = homeMatches(id, matches).reduce((a, c) => a + c.homeTeamGoals, 0);
  const goalsFavorA = awayMatches(id, matches).reduce((a, c) => a + c.awayTeamGoals, 0);
  const goalsOwnH = homeMatches(id, matches).reduce((a, c) => a + c.awayTeamGoals, 0);
  const goalsOwnA = awayMatches(id, matches).reduce((a, c) => a + c.homeTeamGoals, 0);

  return { name: teamName,
    totalGames,
    totalDraws,
    totalVictories,
    totalLosses: totalGames - totalDraws - totalVictories,
    totalPoints: totalVictories * 3 + totalDraws,
    goalsFavor: goalsFavorH + goalsFavorA,
    goalsOwn: goalsOwnH + goalsOwnA,
    goalsBalance: (goalsFavorH + goalsFavorA) - (goalsOwnH + goalsOwnA),
    efficiency: +(((totalVictories * 3 + totalDraws) / (totalGames * 3)) * 100).toFixed(2),
  };
});

const boardSort = (leaderboard: IBoard[]) => leaderboard
  .sort((a, b) => a.goalsOwn - b.goalsOwn)
  .sort((a, b) => b.goalsFavor - a.goalsFavor)
  .sort((a, b) => b.goalsBalance - a.goalsBalance)
  .sort((a, b) => b.totalVictories - a.totalVictories)
  .sort((a, b) => b.totalPoints - a.totalPoints);

const boardHome = (teams:Teams[], matches:Matches[]): IBoard[] =>
  teams.map(({ id, teamName }) => {
    const totalGames = homeMatches(id, matches).length;
    const totalDraws = homeDraws(id, matches).length;
    const totalVictories = homeWins(id, matches).length;
    const goalsFavorH = homeMatches(id, matches).reduce((a, c) => a + c.homeTeamGoals, 0);
    const goalsOwnH = homeMatches(id, matches).reduce((a, c) => a + c.awayTeamGoals, 0);

    return { name: teamName,
      totalGames,
      totalDraws,
      totalVictories,
      totalLosses: totalGames - totalDraws - totalVictories,
      totalPoints: totalVictories * 3 + totalDraws,
      goalsFavor: goalsFavorH,
      goalsOwn: goalsOwnH,
      goalsBalance: goalsFavorH - goalsOwnH,
      efficiency: +(((totalVictories * 3 + totalDraws) / (totalGames * 3)) * 100).toFixed(2),
    };
  });

const boardAway = (teams:Teams[], matches:Matches[]): IBoard[] =>
  teams.map(({ id, teamName }) => {
    const totalGames = awayMatches(id, matches).length;
    const totalDraws = awayDraws(id, matches).length;
    const totalVictories = awayWins(id, matches).length;
    const goalsFavorA = awayMatches(id, matches).reduce((a, c) => a + c.awayTeamGoals, 0);
    const goalsOwnA = awayMatches(id, matches).reduce((a, c) => a + c.homeTeamGoals, 0);
    return { name: teamName,
      totalGames,
      totalDraws,
      totalVictories,
      totalLosses: totalGames - totalDraws - totalVictories,
      totalPoints: totalVictories * 3 + totalDraws,
      goalsFavor: goalsFavorA,
      goalsOwn: goalsOwnA,
      goalsBalance: goalsFavorA - goalsOwnA,
      efficiency: +(((totalVictories * 3 + totalDraws) / (totalGames * 3)) * 100).toFixed(2),
    };
  });

export { board, boardHome, boardAway, boardSort };
