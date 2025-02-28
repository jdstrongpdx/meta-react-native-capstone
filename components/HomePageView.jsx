import React from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from './Footer';
import HeaderWithProfile from "./HeaderWithProfile";
import HeroWithSearch from "./HeroWithSearch";

export default function HomePageView({ children, searchText, handleSearchChange }) {
    const [contentChildren, footerChildren] = React.Children.toArray(children);

    return (
        <View style={styles.container}>
            <HeaderWithProfile />
            <HeroWithSearch searchText={searchText} handleSearchChange={handleSearchChange}/>

            {/* Content Style Applied Here */}
            {contentChildren && (
                <View style={styles.content}>
                    {contentChildren}
                </View>
            )}

            {/* Pass the second child (if any) to Footer */}
            {footerChildren && <Footer>{footerChildren}</Footer>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: .75,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#EEEEEE',
    },
});