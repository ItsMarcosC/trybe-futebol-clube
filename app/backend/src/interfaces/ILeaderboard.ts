export default interface IBoard {
  name: string;
  totalGames: number;
  totalDraws: number;
  totalVictories: number;
  totalLosses: number;
  totalPoints: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}
