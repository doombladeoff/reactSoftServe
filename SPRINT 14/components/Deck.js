import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

function Deck({ cardCount }) {
    const colors = useSelector((state) => state.theme.colors);
    const styles = getStyles(colors);

    return (
        <View style={styles.deckContainer}>
            {Array.from({ length: cardCount }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.deckCard,
                        index % 2 === 0 ? styles.deckCardLeft : styles.deckCardRight,
                        { zIndex: -index }
                    ]}
                />
            ))}
        </View>
    );
}

function getStyles(colors) {
    return StyleSheet.create({
        deckContainer: {
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        deckCard: {
            flex: 4,
            width: Dimensions.get('window').width / 1.4,
            height: Dimensions.get('window').height / 1.4,
            position: 'absolute',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.primary200,
        },
        deckCardLeft: {
            transform: [{ rotate: '-3deg' }],
        },
        deckCardRight: {
            transform: [{ rotate: '3deg' }],
        },
    });
}

export default Deck;
