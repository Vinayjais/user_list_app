import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Row from '../../../components/Row';
export default function UserDetails({ route } : any) {
  const { id, name, username, email, phone, website, address, company } = route.params;

  return (
    <SafeAreaView style={{
      flex: 1, backgroundColor: '#fff'}} edges={[ 'bottom']}>
    <ScrollView style={styles.container}>
      <Row label="ID" value={String(id)} />
      <Row label="Name" value={name} />
      <Row label="Username" value={username} />
      <Row label="Email" value={email} />
      <Row label="Phone" value={phone} />
      <Row label="Website" value={website} />

      <Text style={styles.section}>Address</Text>
      <Row label="Street" value={`${address.street}, ${address.suite}`} />
      <Row label="City" value={`${address.city}, ${address.zipcode}`} />
      <Row label="Geo" value={`${address.geo.lat}, ${address.geo.lng}`} />

      <Text style={styles.section}>Company</Text>
      <Row label="Name" value={company.name} />
      <Row label="Catch Phrase" value={company.catchPhrase} />
      <Row label="BS" value={company.bs} />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, marginBottom:10 },
  section: { fontSize: 14, fontWeight: '700', color: '#333', marginTop: 20, marginBottom: 4 },
});
