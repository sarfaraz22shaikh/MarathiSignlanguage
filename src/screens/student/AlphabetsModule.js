import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { Colors } from '../../constants/colors';
import { getImageSource } from '../../assets/imageMapping';

const { width } = Dimensions.get('window');

const AlphabetsModule = ({ navigation }) => {
  const [currentAlphabet, setCurrentAlphabet] = useState(0);
  const [showImage, setShowImage] = useState(false);

  // Marathi alphabets (अ to ह)
  const marathiAlphabets = [
    { letter: 'अ', pronunciation: 'a', meaning: 'First letter', signDescription: 'Open palm facing forward' },
    { letter: 'आ', pronunciation: 'aa', meaning: 'Long A', signDescription: 'Two fingers extended upward' },
    { letter: 'इ', pronunciation: 'i', meaning: 'Short I', signDescription: 'Index finger pointing up' },
    { letter: 'ई', pronunciation: 'ii', meaning: 'Long I', signDescription: 'Two fingers pointing up' },
    { letter: 'उ', pronunciation: 'u', meaning: 'Short U', signDescription: 'Closed fist with thumb up' },
    { letter: 'ऊ', pronunciation: 'uu', meaning: 'Long U', signDescription: 'Two thumbs up' },
    { letter: 'ए', pronunciation: 'e', meaning: 'E sound', signDescription: 'Open hand with fingers spread' },
    { letter: 'ऐ', pronunciation: 'ai', meaning: 'AI sound', signDescription: 'Two hands forming circle' },
    { letter: 'ओ', pronunciation: 'o', meaning: 'O sound', signDescription: 'Hand forming O shape' },
    { letter: 'औ', pronunciation: 'au', meaning: 'AU sound', signDescription: 'Two hands forming larger circle' },
    { letter: 'क', pronunciation: 'ka', meaning: 'K sound', signDescription: 'Index finger pointing forward' },
    { letter: 'ख', pronunciation: 'kha', meaning: 'KH sound', signDescription: 'Two fingers pointing forward' },
    { letter: 'ग', pronunciation: 'ga', meaning: 'G sound', signDescription: 'Three fingers pointing forward' },
    { letter: 'घ', pronunciation: 'gha', meaning: 'GH sound', signDescription: 'Four fingers pointing forward' },
    { letter: 'च', pronunciation: 'cha', meaning: 'CH sound', signDescription: 'Thumb and index finger together' },
    { letter: 'छ', pronunciation: 'chha', meaning: 'CHH sound', signDescription: 'Thumb and two fingers together' },
    { letter: 'ज', pronunciation: 'ja', meaning: 'J sound', signDescription: 'Thumb and three fingers together' },
    { letter: 'झ', pronunciation: 'jha', meaning: 'JH sound', signDescription: 'All fingers together' },
    { letter: 'ट', pronunciation: 'ta', meaning: 'T sound', signDescription: 'Index finger bent' },
    { letter: 'ठ', pronunciation: 'tha', meaning: 'TH sound', signDescription: 'Two fingers bent' },
    { letter: 'ड', pronunciation: 'da', meaning: 'D sound', signDescription: 'Three fingers bent' },
    { letter: 'ढ', pronunciation: 'dha', meaning: 'DH sound', signDescription: 'Four fingers bent' },
    { letter: 'त', pronunciation: 'ta', meaning: 'T sound', signDescription: 'Index finger straight' },
    { letter: 'थ', pronunciation: 'tha', meaning: 'TH sound', signDescription: 'Two fingers straight' },
    { letter: 'द', pronunciation: 'da', meaning: 'D sound', signDescription: 'Three fingers straight' },
    { letter: 'ध', pronunciation: 'dha', meaning: 'DH sound', signDescription: 'Four fingers straight' },
    { letter: 'न', pronunciation: 'na', meaning: 'N sound', signDescription: 'Thumb touching middle finger' },
    { letter: 'प', pronunciation: 'pa', meaning: 'P sound', signDescription: 'All fingers closed' },
    { letter: 'फ', pronunciation: 'pha', meaning: 'PH sound', signDescription: 'All fingers slightly open' },
    { letter: 'ब', pronunciation: 'ba', meaning: 'B sound', signDescription: 'Thumb and little finger up' },
    { letter: 'भ', pronunciation: 'bha', meaning: 'BH sound', signDescription: 'Thumb and ring finger up' },
    { letter: 'म', pronunciation: 'ma', meaning: 'M sound', signDescription: 'Thumb and middle finger up' },
    { letter: 'य', pronunciation: 'ya', meaning: 'Y sound', signDescription: 'Thumb and index finger up' },
    { letter: 'र', pronunciation: 'ra', meaning: 'R sound', signDescription: 'Index and middle finger crossed' },
    { letter: 'ल', pronunciation: 'la', meaning: 'L sound', signDescription: 'Thumb and index finger forming L' },
    { letter: 'व', pronunciation: 'va', meaning: 'V sound', signDescription: 'Index and middle finger up, spread' },
    { letter: 'श', pronunciation: 'sha', meaning: 'SH sound', signDescription: 'Hand in peace sign' },
    { letter: 'ष', pronunciation: 'sha', meaning: 'SH sound', signDescription: 'Hand in peace sign, different' },
    { letter: 'स', pronunciation: 'sa', meaning: 'S sound', signDescription: 'Closed fist' },
    { letter: 'ह', pronunciation: 'ha', meaning: 'H sound', signDescription: 'Open hand waving' },
  ];

  const getCurrentAlphabet = () => {
    return marathiAlphabets[currentAlphabet];
  };



  // Get image source for current alphabet
  const getCurrentImageSource = () => {
    const alphabet = getCurrentAlphabet();
    return getImageSource(alphabet.letter);
  };

  // Handle alphabet card press
  const handleAlphabetPress = (index) => {
    setCurrentAlphabet(index);
    setShowImage(true);
  };

  // Handle Try Now button press - show alert
  const handleTryNow = () => {
    Alert.alert('Try Now Is', 'This feature will be available soon.');
    
  };

  // Render alphabet grid
  const renderAlphabetGrid = () => {
    return (
      <FlatList
        data={marathiAlphabets}
        numColumns={4}
        keyExtractor={(item, index) => `marathi-${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.alphabetCard}
            onPress={() => handleAlphabetPress(index)}
          >
            <Text style={styles.alphabetLetter}>
              {item.letter}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  // Render image modal
  const renderImageModal = () => {
    const alphabet = getCurrentAlphabet();
    
    return (
      <Modal
        visible={showImage}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowImage(false)}
      >
        <LinearGradient
          colors={['#3498db', '#f5f5f5']}
          style={styles.modalContainer}
        >
          <StatusBar barStyle="light-content" />
          
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowImage(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Text style={styles.imageLetter}>
              {alphabet.letter}
            </Text>
            
            {/* Sign Language Image */}
            <View style={styles.imagePlaceholder}>
              {getCurrentImageSource() ? (
                <Image
                  source={getCurrentImageSource()}
                  style={styles.signLanguageImage}
                  resizeMode="contain"
                />
              ) : (
                <>
                  <Text style={styles.imagePlaceholderText}>🖼️</Text>
                  <Text style={styles.imagePlaceholderLabel}>
                    Sign Language Image for "{alphabet.letter}"
                  </Text>
                </>
              )}
              <Text style={styles.imagePlaceholderSubtext}>
                {alphabet.signDescription}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.tryNowButton}
              onPress={handleTryNow}
            >
              <Text style={styles.tryNowButtonText}>Try Now</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  return (
    <LinearGradient
      colors={['#3498db', '#f5f5f5']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Alphabet Learning</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* Alphabet Grid */}
      {renderAlphabetGrid()}

      {/* Image Modal */}
      {renderImageModal()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 40,
  },
  gridContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  alphabetCard: {
    flex: 1,
    aspectRatio: 1,
    margin: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alphabetLetter: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageLetter: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  imagePlaceholder: {
    width: width * 0.8,
    height: width * 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  imagePlaceholderText: {
    fontSize: 60,
    marginBottom: 10,
  },
  imagePlaceholderLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  imagePlaceholderSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  signLanguageImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  tryNowButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tryNowButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AlphabetsModule;