import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function DynamicTodo() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState(null);

    const addTodo = () => {
        if (!input.trim()) return;
        if (editId) {
            setTodos(prev => prev.map(t => t.id === editId ? { ...t, text: input.trim() } : t));
            setEditId(null);
        } else {
            setTodos(prev => [...prev, { id: Date.now().toString(), text: input.trim(), done: false }]);
        }
        setInput('');
    };

    const startEdit = (item) => {
        setEditId(item.id);
        setInput(item.text);
    };

    const cancelEdit = () => {
        setEditId(null);
        setInput('');
    };

    const toggleTodo = id =>
        setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

    const deleteTodo = id =>
        setTodos(prev => prev.filter(t => t.id !== id));

    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder={editId ? 'Edit task...' : 'Add a task...'}
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={addTodo}
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
                    <Text style={styles.addBtnText}>{editId ? 'Save' : 'Add'}</Text>
                </TouchableOpacity>
                {editId && (
                    <TouchableOpacity style={styles.cancelBtn} onPress={cancelEdit}>
                        <Feather name="x" size={18} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>
            <FlatList
                data={todos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.item, editId === item.id && styles.itemEditing]}>
                        <TouchableOpacity style={styles.itemLeft} onPress={() => toggleTodo(item.id)}>
                            <View style={[styles.checkbox, item.done && styles.checkboxDone]} />
                            <Text style={[styles.itemText, item.done && styles.itemTextDone]}>{item.text}</Text>
                        </TouchableOpacity>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => startEdit(item)}>
                                <Feather name="edit-2" size={18} color="#007AFF" style={styles.actionIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                                <Feather name="trash-2" size={18} color="#FF3B30" style={styles.actionIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>No tasks yet. Add one above!</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    inputRow: { flexDirection: 'row', marginBottom: 16 },
    input: { flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 10, fontSize: 15, borderWidth: 1, borderColor: '#ddd' },
    addBtn: { marginLeft: 8, backgroundColor: '#007AFF', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center' },
    addBtnText: { color: '#fff', fontWeight: '600' },
    cancelBtn: { marginLeft: 6, backgroundColor: '#FF3B30', borderRadius: 8, paddingHorizontal: 12, justifyContent: 'center' },
    cancelBtnText: { color: '#fff', fontWeight: '600' },
    item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 10 },
    itemEditing: { borderWidth: 1.5, borderColor: '#007AFF' },
    itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#007AFF', marginRight: 12 },
    checkboxDone: { backgroundColor: '#007AFF' },
    itemText: { fontSize: 15, flex: 1 },
    itemTextDone: { textDecorationLine: 'line-through', color: '#aaa' },
    actions: { flexDirection: 'row', alignItems: 'center' },
    actionIcon: { paddingLeft: 12 },
    empty: { textAlign: 'center', marginTop: 60, color: '#aaa', fontSize: 15 },
});
