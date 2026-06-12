import { StyleSheet, Text, View } from 'react-native';

export default function ViewDetails({ route }) {
  const { id, name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID</Text>
      <Text style={styles.value}>{id}</Text>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.value}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  label: { fontSize: 12, color: '#888', marginTop: 16 },
  value: { fontSize: 18, fontWeight: '600', marginTop: 4 },
});
