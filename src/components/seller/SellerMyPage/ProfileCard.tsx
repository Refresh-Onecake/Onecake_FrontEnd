import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useGetUserProfile} from '../../../hooks/Query/Common';
import {AppStyles} from '../../../styles/AppStyles';
import {commonStyles} from '../../../styles/commonStyles';
import {useUserPhoneNumberMutate} from '../../../hooks/Query/Common/useUserPhoneNumberMutation';
import {useGetUserPhoneNumberQuery} from '../../../hooks/Query/Common/useGetUserPhoneNumber';
import {convertPhoneNumber} from '../../../utils';

export const ProfileCard = () => {
  const userProfile = useGetUserProfile();
  const userPhoneNumber = useGetUserPhoneNumberQuery();

  return (
    <View style={[styles.view, commonStyles.lightShadow]}>
      <Image
        style={styles.profile}
        source={{
          uri:
            userProfile.data?.profileImg !== ''
              ? userProfile.data?.profileImg
              : undefined,
        }}
      />
      <View>
        <Text style={styles.title}>
          안녕하세요! {userProfile.data?.nickname} 사장님
        </Text>
        <Text style={styles.number}>
          {convertPhoneNumber(userPhoneNumber.data as string)}
        </Text>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  profile: {
    width: 72.12,
    height: 72.12,
    borderRadius: 100,
    marginRight: 17.35,
  },
  view: {
    flexDirection: 'row',
    paddingHorizontal: 29.5,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: AppStyles.color.white,
    paddingTop: 35,
    paddingBottom: 35.68,
  },
  title: {
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.bold,
      },
    }),
    fontWeight: '700',
    fontSize: 19,
    color: AppStyles.color.black,
    marginBottom: 4.43,
  },
  number: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: AppStyles.color.subTitle,
  },
});
