import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {ConsumerOrderListHeader} from './ConsumerOrderListHeader';
import {useGetConsumerOrderHistoryQuery} from '../../../hooks/Query/Consumer';
import {useQueryClient} from 'react-query';
import {FlatList} from 'react-native-gesture-handler';
import {ConsumerOrderCard} from './ConsumerOrderCard';
import {AppStyles} from '../../../styles/AppStyles';

export const ConsumerOrderList = () => {
  const queryClient = useQueryClient();
  const {data, refetch} = useGetConsumerOrderHistoryQuery(queryClient);
  const onPressRefetchBtn = useCallback(() => {
    refetch();
  }, [refetch]);
  return (
    <View style={styles.view}>
      <ConsumerOrderListHeader onPress={onPressRefetchBtn} />
      {data && data.length > 0 && (
        <FlatList
          contentContainerStyle={styles.cardContent}
          data={data}
          keyExtractor={(item, _) => item.orderHistoryId.toString()}
          renderItem={item => (
            <ConsumerOrderCard
              item={item.item}
              index={item.index}
              dataLength={data.length}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
  },
  cardContent: {
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
});
