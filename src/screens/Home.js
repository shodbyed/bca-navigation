import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Text } from 'react-native-paper';
import { URL, URL2 } from '../constants/url';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../constants/StyleMaster';
import LoadingScreen from '../components/LoadingScreen';
import { fetchTeamList } from '../constants/fetches';

const Home = ({ navigation }) => {
  const [matches, setMatches] = useState({});

  const [teams, setTeams] = useState();

  useEffect(() => {
    fetchTeamList(setTeams);
  }, []);

  const handlePress = (page, table, home, teamName) => {
    navigation.navigate(page, { table, home, teamName });
  };

  const TeamList = () => {
    return;
  };

  return (
    <ScrollView>
      {teams ? (
        teams.map((team, index) => (
          <View key={index} style={styles.container}>
            <Text variant='headlineMedium'>Table {index + 1}</Text>
            <View style={styles.buttonView}>
              <Button
                style={styles.button}
                mode='contained'
                onPress={() =>
                  handlePress('Loading', index + 1, team[1][1], team[1][0])
                }
              >
                {team[1][0]}
              </Button>
              <Button
                style={styles.button}
                mode='contained'
                onPress={() =>
                  handlePress('Loading', index + 1, team[2][1], team[2][0])
                }
              >
                {team[2][0]}
              </Button>
            </View>
          </View>
        ))
      ) : (
        <LoadingScreen />
      )}
      <Button
        style={{ marginVertical: 40 }}
        mode='contained'
        onPress={() => handlePress('Test', 1, true, 'Test button')}
      >
        Test
      </Button>
    </ScrollView>
  );
};

export default Home;
