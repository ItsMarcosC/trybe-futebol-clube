import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { board, boardSort, boardHome, boardAway } from '../helpers/leaderboardHelper';
import Matches from '../database/models/MatchesMdl';
import Teams from '../database/models/TeamsMdl';

const ctlAll = async (req: Request, res: Response) =>
  res.status(StatusCodes.OK)
    .json(boardSort(board(await Teams.findAll(), await Matches.findAll())));

const ctlHome = async (req: Request, res: Response) =>
  res.status(StatusCodes.OK)
    .json(boardSort(boardHome(await Teams.findAll(), await Matches.findAll())));

const ctlAway = async (req: Request, res: Response) =>
  res.status(StatusCodes.OK)
    .json(boardSort(boardAway(await Teams.findAll(), await Matches.findAll())));

export { ctlAll, ctlHome, ctlAway };
