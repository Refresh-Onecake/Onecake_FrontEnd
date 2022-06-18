import {appKeys} from '../../enum';

export type RootStackParamList = {
  AuthNavigation: undefined;
  MainNavigation: undefined;
  SelectUserType: undefined;
  FindPwd: undefined;
  SignUp: {userType: string};
  SignIn: undefined;
  EnterComplete: undefined;
  EnterMenu: undefined;
  EnterSheet: undefined;
  EnterStore: undefined;
};
