const fs = require('fs');
const path = require('path');

// Функция для рекурсивного обхода всех файлов и папок
function readFilesRecursively(dir, callback) {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stat) => {
                if (err) throw err;
                if (stat.isDirectory()) {
                    // Если это папка, рекурсивно читаем ее
                    readFilesRecursively(filePath, callback);
                } else {
                    // Если это файл, вызываем callback
                    if (file !== 'mergeFiles.js') {
                        if (file !== 'main.txt') {
                            callback(filePath);
                        }
                        
                    }
                }
            });
        });
    });
}

// Функция для записи содержимого файла в main.txt
function appendFileContentToFile(filePath, outputPath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        const relativeFilePath = path.relative(__dirname, filePath);
        const content = `Название файла: ${path.basename(filePath)}\nРасположение файла: ./${relativeFilePath}\n\n${data}\n\n`;
        fs.appendFile(outputPath, content, (err) => {
            if (err) throw err;
            console.log(`Содержимое файла ${filePath} записано в ${outputFilePath}`);
        });
    });
}

const rootDir = path.join(__dirname, './'); // Путь к корневой папке
const outputFilePath = path.join(__dirname, 'main.txt'); // Путь к файлу main.txt

// Очищаем или создаем файл main.txt
fs.writeFile(outputFilePath, '', (err) => {
    if (err) throw err;

    // Начинаем рекурсивный обход файлов
    readFilesRecursively(rootDir, (filePath) => {
        appendFileContentToFile(filePath, outputFilePath);
    });
});
