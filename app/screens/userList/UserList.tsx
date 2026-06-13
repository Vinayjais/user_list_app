
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { ActivityIndicator, FlatList, TextInput, StyleSheet, Text, TouchableOpacity, View, RefreshControl, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../../store/slices/list';
import { navigate } from '../../../utils/NavigationService';
import { AppDispatch, RootState } from '../../../store/store';

export default function UserList() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, laoding = false, isRefreshing = false, page, limit, hasMore, haseMoreLoading } = useSelector((state: RootState) => state.list);
    const [search, setSearch] = useState('');
    const isFetching = useRef(false);

    const filteredData = useMemo(() =>
        data.filter(item => item.name.toLowerCase().includes(search.toLowerCase())),
        [data, search]
    );

    useEffect(() => {
        dispatch(fetchData({ page: 1, limit }));
        console.log('useEffect called');

    }, []);

    useEffect(() => {
        isFetching.current = laoding || haseMoreLoading;
    }, [laoding, haseMoreLoading, isRefreshing]);

    const loadMoreData = useCallback(() => {
        if ((isFetching.current || !hasMore ) && !laoding) {
            return;
        }
        console.log('loadMoreData called');
        isFetching.current = true;

        dispatch(fetchData({ page, limit }))
            .finally(() => {
                isFetching.current = false;
            });
    }, [dispatch, page, limit, hasMore]);



    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search user..."
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                placeholderTextColor={"#ccc"}
            />
            <Text style={styles.count}>{`Users (${filteredData.length})`}</Text>
            <FlatList
                data={filteredData}
                keyExtractor={item => String(item.id)}
                onEndReachedThreshold={0.5}
                onEndReached={loadMoreData}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => dispatch(fetchData({ page: 1, limit }))}
                    />
                }
                initialNumToRender={5}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => navigate('ViewDetails', item)}>
                        <Text style={styles.name}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={laoding ? <ActivityIndicator color="blue" size="large" /> : <Text style={styles.empty}>No users found</Text>}
                ListFooterComponent={haseMoreLoading ? <ActivityIndicator color="blue" size="large" /> : null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    searchInput: { margin: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, fontSize: 15 },
    count: { paddingHorizontal: 10, paddingBottom: 4, fontWeight: 'bold' },
    item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', height: Platform.select({ios:90,android:150}) },
    name: { fontSize: 16 },
    empty: { textAlign: 'center', marginTop: 40, color: '#888' },
});