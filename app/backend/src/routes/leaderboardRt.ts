import * as express from 'express';
import Matches from '../database/models/MatchesMdl';
import Teams from '../database/models/TeamsMdl';

interface Lb {
  name: string; totalGames: number; totalDraws: number; totalVictories: number;
  totalLosses: number; totalPoints: number; goalsFavor: number; goalsOwn: number;
  goalsBalance: number; efficiency: number;
}

const homeGames = (id:number, matchs:Matches[]) => matchs
  .filter((i) => i.homeTeam === id && !i.inProgress);
const awayGames = (id:number, matchs:Matches[]) => matchs
  .filter((i) => i.awayTeam === id && !i.inProgress);
const homeDraws = (id:number, matchs:Matches[]) => homeGames(id, matchs)
  .filter((i) => i.homeTeamGoals === i.awayTeamGoals && !i.inProgress);
const awayDraws = (id:number, matchs:Matches[]) => awayGames(id, matchs)
  .filter((i) => i.homeTeamGoals === i.awayTeamGoals && !i.inProgress);
const homeVicto = (id:number, matchs:Matches[]) => homeGames(id, matchs)
  .filter((i) => i.homeTeamGoals > i.awayTeamGoals && !i.inProgress);
const awayVicto = (id:number, matchs:Matches[]) => awayGames(id, matchs)
  .filter((i) => i.homeTeamGoals < i.awayTeamGoals && !i.inProgress);

const lebo = (teams:Teams[], matchs:Matches[]): Lb[] => teams.map(({ id, teamName: name }) => {
  const totalGames = homeGames(id, matchs).length + awayGames(id, matchs).length;
  const totalDraws = homeDraws(id, matchs).length + awayDraws(id, matchs).length;
  const totalVictories = homeVicto(id, matchs).length + awayVicto(id, matchs).length;
  const goalsFavorH = homeGames(id, matchs).reduce((a, c) => a + c.homeTeamGoals, 0);
  const goalsFavorA = awayGames(id, matchs).reduce((a, c) => a + c.awayTeamGoals, 0);
  const goalsOwnH = homeGames(id, matchs).reduce((a, c) => a + c.awayTeamGoals, 0);
  const goalsOwnA = awayGames(id, matchs).reduce((a, c) => a + c.homeTeamGoals, 0);

  return { name,
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

const lebohome = (teams:Teams[], matchs:Matches[]): Lb[] => teams.map(({ id, teamName: name }) => {
  const totalGames = homeGames(id, matchs).length;
  const totalDraws = homeDraws(id, matchs).length;
  const totalVictories = homeVicto(id, matchs).length;
  const goalsFavorH = homeGames(id, matchs).reduce((a, c) => a + c.homeTeamGoals, 0);
  const goalsOwnH = homeGames(id, matchs).reduce((a, c) => a + c.awayTeamGoals, 0);

  return { name,
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

const leboaway = (t:Teams[], matchs:Matches[]): Lb[] => t.map(({ id, teamName: name }) => {
  const totalGames = awayGames(id, matchs).length;
  const totalDraws = awayDraws(id, matchs).length;
  const totalVictories = awayVicto(id, matchs).length;
  const goalsFavorA = awayGames(id, matchs).reduce((a, c) => a + c.awayTeamGoals, 0);
  const goalsOwnA = awayGames(id, matchs).reduce((a, c) => a + c.homeTeamGoals, 0);
  return { name,
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

const lebosort = (leaderboard: Lb[]) => leaderboard
  .sort((a, b) => a.goalsOwn - b.goalsOwn)
  .sort((a, b) => b.goalsFavor - a.goalsFavor)
  .sort((a, b) => b.goalsBalance - a.goalsBalance)
  .sort((a, b) => b.totalVictories - a.totalVictories)
  .sort((a, b) => b.totalPoints - a.totalPoints);

export default class Leaderboard {
  constructor(public router: express.Router = express.Router()) {
    this.router = router;
    this.routes();
  }

  private routes(): void {
    this.router.get('/', async (req, res) => res.status(200)
      .json(lebosort(lebo(await Teams.findAll(), await Matches.findAll()))));

    this.router.get('/home', async (req, res) => res.status(200)
      .json(lebosort(lebohome(await Teams.findAll(), await Matches.findAll()))));

    this.router.get('/away', async (req, res) => res.status(200)
      .json(lebosort(leboaway(await Teams.findAll(), await Matches.findAll()))));
  }
}
