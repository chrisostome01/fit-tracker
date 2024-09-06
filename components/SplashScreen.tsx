import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>💪</Text>
      <Text style={styles.title}>FitTrack</Text>
      <Text style={styles.subtitle}>Your Personal Fitness Companion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Remove the backgroundColor property or set it to 'transparent'
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    // Change color to a dark color for better visibility on light backgrounds
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    // Change color to a dark color for better visibility on light backgrounds
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});