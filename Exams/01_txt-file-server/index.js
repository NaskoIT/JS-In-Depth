/*
  Допишете задачата
  Сървърът слуша за заявки от следния вид: `load-file/<file-name>` и трябва да върне съдържанието на файла `files/<file-name>.txt`.
  Ако не е подаден <file-name> или даденият файл не съществува, да се върне грешка.
*/
const http = require('http');
const path = require('path');
const fs = require('fs');

const loadFilePath = 'load-file';
const txtExtension = '.txt';
const fileFolderName = 'files';

const server = http.createServer((req, res) => {
    let url = req.url;
    let urlParts = url.split('/');

    if (urlParts && urlParts.length === 3 && urlParts[1] === loadFilePath) {
        let fileName = urlParts[2];
        let filePath = getFilePath(fileName);

        fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
            if (err) {
                res.writeHead(404).end('The required resource was not found!');
                return;
            }

            res.writeHead(200).end(data);
        });
    } else {
        res.writeHead(404).end('Path not found');
    }
});

const getFilePath = (fileName) => path.resolve(__dirname, path.join(fileFolderName, fileName + txtExtension));

server.listen(8080, () => {
    console.log('Server is listening on :8080');
});