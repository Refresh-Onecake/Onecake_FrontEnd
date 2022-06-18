import {appKeys} from '../enum';

export type RootStackParamList = {
  AuthNavigation: undefined;
  MainNavigation: undefined;
  SelectUserType: undefined;
  FindPwd: undefined;
  SignUp: {userType: string};
  SignIn: undefined;
};
