import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Teams from '../database/models/TeamsMdl';

const getAllTeams = async (req: Request, res: Response) => {
  const getResult = await Teams.findAll();
  res.status(StatusCodes.OK).json(getResult);
};

const getTeamByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const foundID = await Teams.findOne({ where: { id } });
  res.status(StatusCodes.OK).json(foundID);
};

export { getAllTeams, getTeamByID };
