import { View, Platform, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import TabBarButton from './TabBarButton';
import { theme } from '@/constants/theme';
const Tab = createBottomTabNavigator();

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if(['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TabBarButton 
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused? theme.colors.primary: theme.colors.onSurface}
            label={label}
          />
        )

        // return (
        //   <TouchableOpacity
        //     key={route.name}
        //     style={styles.tabbarItem}
        //     accessibilityRole="button"
        //     accessibilityState={isFocused ? { selected: true } : {}}
        //     accessibilityLabel={options.tabBarAccessibilityLabel}
        //     testID={options.tabBarTestID}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
        //   >
        //     {
        //         icons[route.name]({
        //             color: isFocused? primaryColor: greyColor
        //         })
        //     }
        //     <Text style={{ 
        //         color: isFocused ? primaryColor : greyColor,
        //         fontSize: 11
        //     }}>
        //       {label}
        //     </Text>
        //   </TouchableOpacity>
        // );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute', 
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowOpacity: 0.1
    },
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
    }
})

export default TabBar