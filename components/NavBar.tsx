import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useTranslation } from 'react-i18next';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import LanguagePicker from './LanguagePicker';
// Removed Picker import as it's not needed

const Navbar = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (
        <View style={styles.navbar}>
            <LanguagePicker></LanguagePicker>
            <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                <Ionicons name="person" size={27} color={theme?.colors?.primary || 'black'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: theme?.colors?.background || '#fff',
        elevation: 3,
    },
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: theme?.colors?.onSurface || '#ccc',
        borderRadius: 5,
        color: theme?.colors?.primary || '#000',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: theme?.colors?.onSurface || '#ccc',
        borderRadius: 5,
        color: theme?.colors?.primary || '#000',
        paddingRight: 30,
    },
};

export default Navbar;