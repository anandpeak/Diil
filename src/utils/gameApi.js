/**
 * Тоглоомын дата хадгалах API utility
 * Энэ модуль нь ямар ч тоглоомын дата хадгалахад ашиглагдана
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

/**
 * Тоглоомын дата хадгалах универсал функц
 *
 * @param {string} userId - Хэрэглэгчийн ID (URL-аас авсан)
 * @param {string} gameName - Тоглоомын нэр (жишээ: 'arrow', 'puzzle', 'memory')
 * @param {object} gameData - Тоглоомын дата
 * @returns {Promise} - API хариу
 */
export const saveGameData = async (userId, gameName, gameData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/game/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                gameName,
                gameData,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error(`API хүсэлт амжилтгүй: ${response.status}`);
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error('Тоглоомын дата хадгалахад алдаа гарлаа:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Arrow тоглоомын дата бэлтгэх
 *
 * @param {object} gameResults - Тоглоомын үр дүн
 * @returns {object} - API руу илгээх дата
 */
export const prepareArrowGameData = (gameResults) => {
    return {
        correctCount: gameResults.correctCount || 0,
        wrongCount: gameResults.wrongCount || 0,
        accuracy: gameResults.accuracy || 0,
        avgTime: parseFloat(gameResults.avgTime) || 0,
        avgCorrectTime: parseFloat(gameResults.avgCorrectTime) || 0,
        totalScore: (gameResults.correctCount || 0) * 10,
        coins: gameResults.coins || 0,
        completedAt: new Date().toISOString()
    };
};

/**
 * Тоглоомын дата хадгалах ерөнхий wrapper функц
 *
 * @param {string} userId - Хэрэглэгчийн ID
 * @param {string} gameName - Тоглоомын нэр
 * @param {object} gameResults - Тоглоомын үр дүн
 * @param {function} dataPrepareFunction - Дата бэлтгэх функц (optional)
 * @returns {Promise} - Хадгалсан үр дүн
 */
export const saveGameResults = async (userId, gameName, gameResults, dataPrepareFunction = null) => {
    if (!userId) {
        console.warn('Хэрэглэгчийн ID олдсонгүй - дата хадгалахгүй');
        return { success: false, error: 'User ID шаардлагатай' };
    }

    // Дата бэлтгэх
    let gameData = gameResults;
    if (dataPrepareFunction && typeof dataPrepareFunction === 'function') {
        gameData = dataPrepareFunction(gameResults);
    }

    // API руу илгээх
    return await saveGameData(userId, gameName, gameData);
};

/**
 * Arrow тоглоомын дата хадгалах тусгай функц
 */
export const saveArrowGameResults = async (userId, gameResults) => {
    return await saveGameResults(userId, 'arrow', gameResults, prepareArrowGameData);
};
