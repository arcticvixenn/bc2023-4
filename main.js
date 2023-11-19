// Імпортуємо модуль http, який дозволить нам створити HTTP-сервер
const http = require('http');

// Імпортуємо модуль fs (файлова система), необхідний для роботи з файлами
const fs = require('fs');

// Імпортуємо модуль fast-xml-parser для роботи з XML-даними
const xml = require('fast-xml-parser');


// Створюємо HTTP-сервер
const server = http.createServer((req, res) => {
    try {
        // Зчитуємо XML-дані з файлу 'data.xml'
        const xmlData = fs.readFileSync('data.xml', 'utf8');

        // Створюємо парсер XML
        const parser = new xml.XMLParser();

        // Розбираємо XML-дані у JavaScript-об'єкт
        const obj = parser.parse(xmlData);

        // Отримуємо дані аукціону з об'єкту
        let data = obj.auctions?.auction;

        // Перевіряємо, чи дані аукціону є масивом
        if (!Array.isArray(data)) {
        // Якщо дані аукціону не є масивом, обгортаємо їх в масив
        data = [data];
        }



// Створюємо новий об'єкт newObj для зберігання спрощених даних аукціону
const newObj = {
    // Створюємо властивість 'data', яка міститиме дані аукціону
    data: {
        // Створюємо властивість 'auction', яка буде масивом об'єктів
        auction: data.map((item) => {
            // Для кожного аукціону створюємо новий об'єкт 'auctionItem'
            const auctionItem = {
                // Витягуємо дані з аукціону та присвоюємо їх властивостям нового об'єкта
                StockCode: item?.StockCode,       // Властивість 'StockCode' аукціону
                ValCode: item?.ValCode,           // Властивість 'ValCode' аукціону
                Attraction: item?.Attraction,     // Властивість 'Attraction' аукціону
            };
            return auctionItem;  // Повертаємо новий об'єкт аукціону
        }),
    },
};



// Створюємо екземпляр будівника XML
const builder = new xml.XMLBuilder();

// Будуємо рядок XML із спрощеного об'єкта
const xmlStr = builder.build(newObj);

// Встановлюємо HTTP-заголовки для відповіді
res.writeHead(200, { 'Content-Type': 'application/xml' });

// Надсилаємо XML-відповідь клієнту
res.end(xmlStr);


} catch (error) {
    // Обробка помилок в коді
    console.error('Error:', error.message);

    // Встановлення HTTP-заголовків для відповіді у випадку помилки
    res.writeHead(500, { 'Content-Type': 'text/plain' });

    // Відправлення текстового повідомлення про внутрішню помилку сервера клієнту
    res.end('Internal Server Error');
}

});

// Встановлюємо номер порту для сервера
const port = 8000;

// Запускаємо сервер і прослуховуємо вказаний порт
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

 