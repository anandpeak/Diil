# Тоглоомын API Ашиглалтын Заавар

Энэхүү заавар нь URL-аас хэрэглэгчийн ID-ийг авч, тоглоомын датаг хадгалах системийг хэрхэн ашиглахыг харуулна.

## Файлууд

1. **urlUtils.js** - URL параметр авах utility функцууд
2. **gameApi.js** - Тоглоомын дата хадгалах API функцууд

## URL Формат

```
https://your-domain.com/game?url=af94f905-74c5-48bd-96d7-43643be67c54
```

Энд `af94f905-74c5-48bd-96d7-43643be67c54` нь хэрэглэгчийн ID юм.

## Тохиргоо

1. `.env` файл үүсгэж API URL тохируулна:

```bash
REACT_APP_API_URL=https://your-api-url.com
```

2. Хэрэв `.env` файл байхгүй бол default нь `https://api.example.com` ашиглагдана.

## Ашиглалт

### Жишээ 1: Arrow тоглоом (хэдийн хийгдсэн)

```javascript
import { getUserIdFromUrl } from "../../../utils/urlUtils";
import { saveArrowGameResults } from "../../../utils/gameApi";

// Component дотор
const [userId, setUserId] = useState(null);

useEffect(() => {
  // URL-аас хэрэглэгчийн ID авах
  const userIdFromUrl = getUserIdFromUrl();
  setUserId(userIdFromUrl);
}, []);

// Тоглоом дууссаны дараа
const handleGameComplete = async (results) => {
  if (userId) {
    const saveResult = await saveArrowGameResults(userId, results);
    if (saveResult.success) {
      console.log('Амжилттай хадгалагдлаа!');
    }
  }
};
```

### Жишээ 2: Шинэ тоглоом (жишээ нь Puzzle)

```javascript
import { getUserIdFromUrl } from "../../utils/urlUtils";
import { saveGameResults } from "../../utils/gameApi";

const PuzzleGame = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userIdFromUrl = getUserIdFromUrl();
    setUserId(userIdFromUrl);
  }, []);

  // Тоглоомын дата бэлтгэх функц
  const preparePuzzleGameData = (results) => {
    return {
      level: results.level,
      moves: results.moves,
      time: results.time,
      score: results.score,
      completedAt: new Date().toISOString()
    };
  };

  const handleGameComplete = async (results) => {
    if (userId) {
      const saveResult = await saveGameResults(
        userId,
        'puzzle',  // Тоглоомын нэр
        results,
        preparePuzzleGameData  // Дата бэлтгэх функц (optional)
      );

      if (saveResult.success) {
        console.log('Тоглоомын дата хадгалагдлаа:', saveResult.data);
      }
    }
  };

  return (
    // ... component JSX
  );
};
```

### Жишээ 3: Хамгийн энгийн хэрэглээ

```javascript
import { getUserIdFromUrl } from "../../utils/urlUtils";
import { saveGameData } from "../../utils/gameApi";

const SimpleGame = () => {
  const handleGameEnd = async () => {
    const userId = getUserIdFromUrl();

    if (userId) {
      await saveGameData(userId, 'simple-game', {
        score: 100,
        level: 5
      });
    }
  };
};
```

## API Endpoints

Backend-д дараах endpoint үүсгэх хэрэгтэй:

### POST /game/save

**Request Body:**
```json
{
  "userId": "af94f905-74c5-48bd-96d7-43643be67c54",
  "gameName": "arrow",
  "gameData": {
    "correctCount": 45,
    "wrongCount": 5,
    "accuracy": 90,
    "avgTime": 1.23,
    "avgCorrectTime": 1.15,
    "totalScore": 450,
    "coins": 450,
    "completedAt": "2025-10-16T12:00:00.000Z"
  },
  "timestamp": "2025-10-16T12:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Game data saved successfully",
  "data": {
    "id": "game-record-id",
    "userId": "af94f905-74c5-48bd-96d7-43643be67c54",
    "gameName": "arrow",
    "savedAt": "2025-10-16T12:00:00.000Z"
  }
}
```

## Utility функцууд

### urlUtils.js

- `extractUrlParam(paramName)` - URL-аас дурын параметр авах
- `getUserIdFromUrl()` - Хэрэглэгчийн ID авах
- `hasUrlParam(paramName)` - Параметр байгаа эсэхийг шалгах

### gameApi.js

- `saveGameData(userId, gameName, gameData)` - Үндсэн дата хадгалах функц
- `saveGameResults(userId, gameName, results, prepareFunction)` - Универсал wrapper функц
- `saveArrowGameResults(userId, results)` - Arrow тоглоомын дата хадгалах
- `prepareArrowGameData(results)` - Arrow тоглоомын дата бэлтгэх

## Анхааруулга

- API URL-ийг `.env` файлд тохируулахаа бүү мартаарай
- Хэрэглэгчийн ID байхгүй үед console-д warning мессеж харагдана
- API хүсэлт амжилтгүй бол error console-д хэвлэгдэнэ
- Бүх тоглоомын дата автоматаар timestamp-тай хадгалагдана

## Шинэ тоглоом нэмэх

1. `gameApi.js` файлд тоглоомын дата бэлтгэх функц нэмнэ:

```javascript
export const prepareYourGameData = (results) => {
  return {
    // Тоглоомын онцлог датануud
    ...results,
    completedAt: new Date().toISOString()
  };
};

export const saveYourGameResults = async (userId, results) => {
  return await saveGameResults(userId, 'your-game-name', results, prepareYourGameData);
};
```

2. Тоглоомын component-д import хийж ашиглана:

```javascript
import { getUserIdFromUrl } from "../../utils/urlUtils";
import { saveYourGameResults } from "../../utils/gameApi";
```

Ингээд бэлэн!
