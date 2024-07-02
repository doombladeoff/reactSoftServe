import * as SQLite from 'expo-sqlite'

export const database = SQLite.openDatabase('dictionary.db');

export function init() {
    database.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS words (word TEXT PRIMARY KEY, audio TEXT, dateForgets INTEGER, dateTotallyForgets INTEGER, forgettingSpan INTEGER, image TEXT, meaning TEXT, phonetics TEXT, status INTEGER);');
        tx.executeSql(`CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, isDark BOOLEAN NOT NULL);`);
    });
}

export function addWord(wordData) {
    database.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO words (word, phonetics, image, audio, meaning, dateForgets, dateTotallyForgets, forgettingSpan, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                wordData.word,
                wordData.phonetics,
                wordData.image || null,
                wordData.audio || null,
                wordData.meaning,
                wordData.dateForgets,
                wordData.dateTotallyForgets,
                wordData.forgettingSpan,
                wordData.status,
            ],
            (_, { rowsAffected }) => {
                if (rowsAffected > 0)
                    console.log(`Word ${wordData.word} added successfully`);
                else
                    console.log(`Word ${wordData.word} already exists`);
            },
            (_, error) => {
                console.log(`Error adding word ${wordData.word}`, error);
                throw error;
            }
        );
    })
}

export function updateWord(changes) {
    database.transaction((tx) => {
        tx.executeSql(
            'UPDATE words SET dateForgets = ?, dateTotallyForgets = ?, forgettingSpan = ?, image = ?, meaning = ?, phonetics = ?, status = ? WHERE word = ?',
            [
                changes.dateForgets,
                changes.dateTotallyForgets,
                changes.forgettingSpan,
                changes.image,
                changes.meaning,
                changes.phonetics,
                changes.status,
                changes.word
            ],
            () => console.log(`Word [ ${changes.word} ] updated successfully`),
            (_, error) => {
                console.log('Error updating word', error)
                throw error;
            }
        );
    });
}

export function deleteWord(word) {
    database.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM words WHERE word = ?',
            [word],
            () => console.log(`Word [ ${word} ] deleted successfully`),
            (_, error) => {
                console.log('Error deleting word', error)
                throw error;
            }
        );
    });
}

export function getWords(callback) {
    database.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM words',
            [],
            (txObj, { rows: { _array } }) => {
                callback(_array);
            },
            (txObj, error) => {
                console.log('Error ', error);
            }
        );
    });
}

export function getTheme(callback) {
    database.transaction(tx => {
        tx.executeSql(
            'SELECT isDark FROM settings WHERE id = 1;',
            [],
            (_, result) => {
                if (result.rows.length > 0) {
                    if (result.rows.item(0).isDark === 1)
                        callback(true);
                    else if (result.rows.item(0).isDark === 0)
                        callback(false);
                } else {
                    callback(false); // Default to light theme if not set
                }
            },
            (_, error) => {
                console.log('Error retrieving theme', error)
                throw error
            }
        );
    });
}

export function setTheme(isDark) {
    console.log('Setting theme to', isDark);
    database.transaction(tx => {
        tx.executeSql(
            'INSERT OR REPLACE INTO settings (id, isDark) VALUES (1, ?);',
            [isDark ? 1 : 0],
            () => console.log('Theme saved successfully'),
            (_, error) => {
                console.log('Error saving theme', error)
                throw error;
            }
        );
    });
}
