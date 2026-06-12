
import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, TextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../store/slices/list';

export default function UserList({ navigation }) {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { data, laoding, page, limit, hasMore, haseMoreLoading } = useSelector((state) => state.list);
    const [search, setSearch] = useState('');

    const filteredData = useMemo(() =>
        data.filter(item => item.name.toLowerCase().includes(search.toLowerCase())),
        [data, search]
    );

    useEffect(() => {
        dispatch(fetchData({ page: 1, limit }));
    }, []);

    const loadMoreData = () => {
        if (!laoding && !haseMoreLoading && hasMore && !search) {
            dispatch(fetchData({ page, limit }));
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search user..."
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
            />
            <Text style={styles.count}>{`Users (${filteredData.length})`}</Text>
            <FlatList
                data={filteredData}
                keyExtractor={item => String(item.id)}
                onEndReachedThreshold={0.5}
                onEndReached={loadMoreData}
                initialNumToRender={5}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ViewDetails', item)}>
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
    item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
    name: { fontSize: 16 },
    empty: { textAlign: 'center', marginTop: 40, color: '#888' },
});