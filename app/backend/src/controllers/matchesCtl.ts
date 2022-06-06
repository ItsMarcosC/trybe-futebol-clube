import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Teams from '../database/models/TeamsMdl';
import Matches from '../database/models/MatchesMdl';

const getMatches = async (req: Request, res: Response) => {
  const allMatches = await Matches.findAll({
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
  });
  res.status(StatusCodes.OK).json(allMatches);
};

const finishMatch = async (req: Request, res: Response) => {
  const strFinish = { message: 'Finished' };
  const { id } = req.params;
  const foundMatch = await Matches.findOne({ where: { id } });
  await Matches.update({ ...foundMatch, inProgress: false }, { where: { id } });
  res.status(StatusCodes.OK).json(strFinish);
};

const updateById = async (req: Request, res: Response) => {
  const strSuccess = { message: 'GOOOAL!!! #YNWA' };
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  res.status(StatusCodes.OK).json(strSuccess);
};

const insertMatches = async (req: Request, res: Response) => {
  const strDuped = { message: 'It is not possible to create a match with two equal teams' };
  const strNotFound = { message: 'There is no team with such id!' };
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(StatusCodes.UNAUTHORIZED).json(strDuped);
  }
  const foundTeams = await Teams.findAll({ where: { id: [homeTeam, awayTeam] } });
  if (!foundTeams || foundTeams.length !== 2) {
    return res.status(StatusCodes.NOT_FOUND).json(strNotFound);
  }
  const { id } = await Matches.create(
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
  );
  res.status(StatusCodes.CREATED).json({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress, id,
  });
};

export { getMatches, finishMatch, updateById, insertMatches };
