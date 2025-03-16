import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useProfileStore } from '@/stores/profileStore';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '@/constants/theme';

export default function SettingsScreen() {
  const { profile, updateProfile } = useProfileStore();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      updateProfile({ ...profile, logo: result.assets[0].uri });
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.content}>
        <Text variant="headlineMedium" style={[globalStyles.title, { textAlign: 'center' }]}>
          Account Settings
        </Text>

        <View style={styles.logoSection}>
          {profile?.logo ? (
            <Image source={{ uri: profile.logo }} style={styles.logo} />
          ) : (
            <View style={styles.placeholderLogo} />
          )}
          <Button mode="outlined" onPress={pickImage} style={styles.logoButton}>
            {profile?.logo ? 'Change Logo' : 'Add Logo'}
          </Button>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Company Name"
            value={profile?.companyName || ''}
            onChangeText={(text) => updateProfile({ ...profile, companyName: text })}
            style={styles.input}
          />

          <TextInput
            label="Professional Rate ($/hr)"
            value={profile?.hourlyRate?.toString() || '45'}
            onChangeText={(text) => updateProfile({ ...profile, hourlyRate: parseFloat(text) || 45 })}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Default Margin (%)"
            value={profile?.margin?.toString() || '10'}
            onChangeText={(text) => updateProfile({ ...profile, margin: parseFloat(text) || 10 })}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  placeholderLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#BDC3C7',
    marginBottom: 16,
  },
  logoButton: {
    marginBottom: 8,
  },
  form: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
});