// import { compareSync } from 'bcryptjs';
// import ILogin from '../interfaces/ILogin';
// import Users from '../database/models/UsersMdl';

// const LoginSvc = async (email: string, password: string) => {
//   const result = (await Users.findOne({ where: { email } })) as ILogin;
//   const validateBcryptHash = compareSync(password, result.password);
//   if (!result || !validateBcryptHash) {
//     return false;
//   }
//   return {
//     id: result.id,
//     username: result.username,
//     role: result.role,
//     email,
//   };
// };

// export default LoginSvc;
