import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';

export default function HomePageView({ children }) {
    const [contentChildren, footerChildren] = React.Children.toArray(children);

    return (
        <View style={styles.container}>
            <Header />
            <Hero />

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
        flex: .85,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#EEEEEE',
    },
});