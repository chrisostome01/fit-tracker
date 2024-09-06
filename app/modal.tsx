import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About FitTrack</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Features:</Text>
        <Text style={styles.infoText}>• Real-time step counting</Text>
        <Text style={styles.infoText}>• Calorie burn estimation</Text>
        <Text style={styles.infoText}>• Workout history tracking</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How to use:</Text>
        <Text style={styles.infoText}>1. Keep your phone with you while walking or exercising</Text>
        <Text style={styles.infoText}>2. View your step count and estimated calories burned on the main screen</Text>
        <Text style={styles.infoText}>3. Check your workout history in the 'Workout History' tab</Text>
        <Text style={styles.infoText}>4. Use the 'Reset' button to start a new tracking session</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Note:</Text>
        <Text style={styles.infoText}>Calorie estimates are approximate and based on average metrics. For more accurate health information, please consult with a healthcare professional.</Text>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
