const fs = require('fs');
const path = require('path')
const os = require('os');
console.log(os.arch())

//
// fs.mkdir('mainFolder', (err) => {
//     if (err) throw err;
//     console.log('Directory created successfully');
// });


// fs.writeFile('mainFolder/file1.txt', 'Hello, world!', (err) => {
//     if (err) throw err;
//     console.log('File1.txt created successfully');
//
// });
//
// fs.writeFile('mainFolder/file2.txt', 'This is a text file.', (err) => {
//     if (err) throw err;
//     console.log('File2.txt created successfully');
// });
//
// fs.writeFile('mainFolder/file3.txt', 'Lorem ipsum dolor sit amet.', (err) =>{
//     if (err) throw err;
//     console.log('File3.txt created successfully');
// });
//
// fs.writeFile('mainFolder/file4.txt', 'Some random text here.', (err) =>{
//     if (err) throw err;
//     console.log('File4.txt created successfully');
// });
//
// fs.writeFile('mainFolder/file5.txt', 'The quick brown fox jumps over the lazy dog.', (err) =>{
//     if (err) throw err;
//     console.log('File5.txt created successfully');
// });
//
//
// fs.mkdir('mainFolder/folder1', (err) => {
//     if (err) throw err;
//     console.log('folder1 created successfully');
// });
// fs.mkdir('mainFolder/folder2', (err) => {
//     if (err) throw err;
//     console.log('folder2 created successfully');
// });
// fs.mkdir('mainFolder/folder3', (err) => {
//     if (err) throw err;
//     console.log('folder3 created successfully');
// });
// fs.mkdir('mainFolder/folder4', (err) => {
//     if (err) throw err;
//     console.log('folder4 created successfully');
// });
// fs.mkdir('mainFolder/folder5', (err) => {
//     if (err) throw err;
//     console.log('folder5 created successfully');
// });


const mainFolder = './mainFolder';

fs.readdir(mainFolder, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(mainFolder, file);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }

            if (stats.isDirectory()) {
                console.log(`FOLDER: ${file}`);
            } else {
                console.log(`FILE: ${file}`);
            }
        });
    });
});