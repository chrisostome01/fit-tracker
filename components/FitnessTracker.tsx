import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { Text, View } from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FitnessTracker() {
  const [stepCount, setStepCount] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    let subscription: { remove: () => void; };

    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      if (isAvailable) {
        subscription = Pedometer.watchStepCount(result => {
          setStepCount(result.steps);
          setCalories(result.steps * 0.04);
        });
      }
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const resetTracker = async () => {
    // Save current workout data before resetting
    const date = new Date().toISOString();
    const workoutData = { date, steps: stepCount, calories };
    
    try {
      const existingData = await AsyncStorage.getItem('workoutHistory');
      const workoutHistory = existingData ? JSON.parse(existingData) : [];
      workoutHistory.push(workoutData);
      await AsyncStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
      console.log('Workout data saved:', workoutData);
    } catch (error) {
      console.error('Error saving workout data:', error);
    }

    // Reset the tracker
    setStepCount(0);
    setCalories(0);
  };

  return (
    <View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{stepCount}</Text>
          <Text style={styles.statLabel}>Steps</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{calories.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={resetTracker}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});