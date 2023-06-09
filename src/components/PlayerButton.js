import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { postSetTieWinner, postSetWinner } from '../constants/posts';

const PlayerButton = ({
  playerName,
  tie,
  winner,
  table,
  gameKey,
  refreshData,
  updateGameWinner,
}) => {
  const gameNumber = gameKey.replace('game', '');

  const handleButtonPress = () => {
    if (winner === '') {
      Alert.alert(
        `${playerName} has won game ${gameNumber}`,
        '',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Confirm', onPress: () => handleConfirm() },
        ],
        { cancelable: true },
      );
    }
  };

  const handleConfirm = async () => {
    updateGameWinner(playerName, gameNumber);

    if (!tie) {
      await postSetWinner(table, gameNumber, playerName);
    }
    if (tie) {
      await postSetTieWinner(table, gameNumber, playerName);
    }
    refreshData();
  };

  const getButtonStyle = () => {
    if (winner === '') {
      return styles.awayButton;
    } else if (winner === playerName) {
      return styles.homeButton;
    } else {
      return styles.greyButton;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.playerButton, getButtonStyle()]}
      disabled={winner !== ''}
      onPress={handleButtonPress}
    >
      <Text style={styles.playerButtonText}>{playerName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playerButton: {
    minHeight: 60,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  playerButtonText: {
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#0050B5',
  },
  awayButton: {
    backgroundColor: 'green',
  },
  greyButton: {
    backgroundColor: 'grey',
  },
});

export default PlayerButton;
