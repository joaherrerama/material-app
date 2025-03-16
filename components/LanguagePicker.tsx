import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, IconButton, Menu, Text } from 'react-native-paper';
import { Settings, Languages } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '@/constants/theme';

const LanguagePicker = () => {
    const { i18n } = useTranslation();
    const [visible, setVisible] = React.useState(false);

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'pl', label: 'Polski', flag: '🇵🇱' },
    ];

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setVisible(false);
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language);

    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
                <Button
                    mode="text"
                    onPress={() => setVisible(true)}
                    contentStyle={styles.languageButton}>
                    {currentLanguage?.flag} {currentLanguage?.label}
                </Button>
            }>
            {languages.map((lang) => (
                <Menu.Item
                    key={lang.code}
                    onPress={() => handleLanguageChange(lang.code)}
                    title={
                        <View style={styles.menuItem}>
                            <Text style={styles.flag}>{lang.flag}</Text>
                            <Text style={[
                                styles.languageText,
                                i18n.language === lang.code && styles.activeLanguage
                            ]}>
                                {lang.label}
                            </Text>
                        </View>
                    }
                />
            ))}
        </Menu>
    );
}

const styles = StyleSheet.create({
    languageButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        fontSize: 18,
        marginRight: 8,
    },
    languageText: {
        fontSize: 16,
    },
    activeLanguage: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
});

export default LanguagePicker;