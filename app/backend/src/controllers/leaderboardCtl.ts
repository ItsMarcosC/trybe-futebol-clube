import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Teams from '../database/models/TeamsMdl';
import Matches from '../database/models/MatchesMdl';
import leaderboardHelp from '../helpers/leaderboardHelper';

const leaderboardCtl = async (req: Request, res: Response) => {
  const allTeams = await Teams.findAll();
  const allMatches = await Matches.findAll();
  return res.status(StatusCodes.OK).json(
    leaderboardHelp(allTeams, allMatches)
      .sort((a, b) => a.goalsAgainst - b.goalsAgainst)
      .sort((a, b) => b.goalsPro - a.goalsPro)
      .sort((a, b) => b.goalsDiff - a.goalsDiff)
      .sort((a, b) => b.allWins - a.allWins)
      .sort((a, b) => b.teamPoints - a.teamPoints),
  );
};

export default leaderboardCtl;
