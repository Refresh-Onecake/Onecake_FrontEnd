import {DateData} from 'react-native-calendars';

export type RootStackParamList = {
  AuthNavigation: undefined;
  MainNavigator: {
    screen?: string | undefined;
  };
  SelectUserType: undefined;
  FindPwd: undefined;
  SignUp: {userType: string};
  SignIn: undefined;
  // 입점 신청 및 메뉴 신청
  EnterComplete: undefined;
  EnterStore: undefined;
  EnterStart: undefined;
  EnterMenu: undefined;
  EnterMenuSheet: undefined;
  //가게 관련
  StoreDetail: undefined;
  StackNavigator: {
    screen?: string | undefined;
  };
  OrderManageList: undefined;
  OrderSheet: undefined;
  OrderDetail: undefined;
  ReSign: undefined;
  MenuImage: undefined;
  MenuImageDetails: undefined;
  Setting: undefined;
};
