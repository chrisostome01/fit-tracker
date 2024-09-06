import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

type WorkoutData = {
  date: string;
  steps: number;
  calories: number;
};

const { width } = Dimensions.get('window');

export default function WorkoutHistoryScreen() {
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadWorkoutHistory = useCallback(async () => {
    try {
      const historyData = await AsyncStorage.getItem('workoutHistory');
      if (historyData) {
        const parsedData = JSON.parse(historyData);
        setWorkoutHistory(parsedData.reverse()); // Newest first
      } else {
        setWorkoutHistory([]);
      }
    } catch (error) {
      console.error('Error loading workout history:', error);
    }
  }, []);

  useEffect(() => {
    loadWorkoutHistory();
  }, [loadWorkoutHistory]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadWorkoutHistory();
    setRefreshing(false);
  }, [loadWorkoutHistory]);

  const renderWorkoutItem = ({ item }: { item: WorkoutData }) => (
    <View style={styles.card}>
      <View style={styles.dateContainer}>
        <FontAwesome5 name="calendar-alt" size={16} color="#666" />
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <FontAwesome5 name="shoe-prints" size={24} color="#4A90E2" />
          <Text style={styles.statValue}>{item.steps}</Text>
          <Text style={styles.statLabel}>Steps</Text>
        </View>
        <View style={styles.statItem}>
          <FontAwesome5 name="fire" size={24} color="#E25A4A" />
          <Text style={styles.statValue}>{item.calories.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>
      {workoutHistory.length > 0 ? (
        <FlatList
          data={workoutHistory}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.date}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No workout data available yet.</Text>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'transparent', // Make the background transparent
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: width - 40,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light gray border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
  },
});
