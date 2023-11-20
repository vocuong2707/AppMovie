import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Routes/Navigation'
import Data from './data/Datademo'
import Popular  from './PopularPeople/Popular'
export default function App() {
  return (
    // <Navigation />
    <Popular />
    // <Data />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
