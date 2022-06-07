import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { lebo, lebosort, lebohome, leboaway } from '../helpers/leaderboardHelper';
import Matches from '../database/models/MatchesMdl';
import Teams from '../database/models/TeamsMdl';

const ctlAll = async (req: Request, res: Response) =>
  res.status(StatusCodes.OK)
    .json(lebosort(lebo(await Teams.findAll(), await Matches.findAll())));

const ctlHome = async (req: Request, res: Response) =>
  res.status(StatusCodes.OK)
    .json(lebosort(lebohome(await Teams.findAll(), await Matches.findAll())));

const ctlAway = async (req: Request, res: Response) =>
  res.status(StatusCodes.OK)
    .json(lebosort(leboaway(await Teams.findAll(), await Matches.findAll())));

export { ctlAll, ctlHome, ctlAway };
