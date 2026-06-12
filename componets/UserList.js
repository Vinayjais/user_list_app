
import React, {useState, useEffect} from 'react';

import { ActivityIndicator, FlatList, StatusBar, StyleSheet,
     Text, TouchableOpacity, useColorScheme, View} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch  } from 'react-redux';
import { fetchData } from '../store/slices/list';

export default function UserList({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {data, laoding, page, limit, hasMore, haseMoreLoading} = useSelector((state) => state.list)

  useEffect(() => {
    dispatch(fetchData({ page: 1, limit }));
  }, []);

  const loadMoreData = () => {
    if (!laoding && !haseMoreLoading && hasMore) {
      dispatch(fetchData({ page, limit }));
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreData}
        initialNumToRender={5}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ViewDetails', item)}>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={laoding ? <ActivityIndicator color="blue" size="large" /> : null}
        ListFooterComponent={ haseMoreLoading && <ActivityIndicator color="blue" size="large" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontSize: 16 },
});