const express = require('express');

const fs = require('fs');

const path = require("path");

const app = express();

const PORT = 5100;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dirPath = path.join(__dirname, 'dataUsers');
const filePath = path.join(dirPath, 'users.json');

// async function createFile() {
//     try {
//         await fs.promises.mkdir(dirPath);
//         await fs.promises.writeFile(filePath, '[]');
//         console.log(`Файл ${filePath} успішно створено!`);
//     }   catch (err) {
//         console.error(`Не вдалося створити файл: ${err}`);
//     }
// }
//
// createFile().then();

// async function addUser(name, age, gender) {
//
//     if (name.length < 3) {
//         console.error('Ім\'я повинно містити не менше 3 символів');
//         return;
//     }
//     if (age < 0) {
//         console.error('Вік не може бути від\'ємним');
//         return;
//     }
//
//     let data = await fs.promises.readFile(filePath, 'utf-8');
//     data = JSON.parse(data);
//
//     data.push({ name, age, gender });
//
//
//     await fs.promises.writeFile(filePath, JSON.stringify(data));
//     console.log(`Користувач ${name} успішно доданий!`);
// }
//
// addUser('Kolia', 25, 'male').then();


app.get('/users/:name', async (req, res) => {
    const { name } = req.params;

    let data = await fs.promises.readFile(filePath, 'utf-8');
    data = JSON.parse(data);

    const user = data.find(user => user.name === "Dmytro");
    if (!user) {
        res.status(404).json({ message: 'Користувача не знайдено' });
        return;
    }

    res.json(user);
    console.log(user)
});


app.put('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const updateUser = req.body;

    let data = await fs.promises.readFile(filePath, 'utf-8');
    data = JSON.parse(data);

    data[+userId] = updateUser;

    await fs.promises.writeFile(filePath, JSON.stringify(data));
    console.log(`Користувач ${userId} успішно оновлений!`);

    res.status(200).json({
        message: `Користувач ${userId} успішно оновлений!`,
    });
});

app.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    let data = await fs.promises.readFile(filePath, 'utf-8');
    data = JSON.parse(data);

    // Видаляємо користувача за індексом userId
    data.splice(userId, 1);

    await fs.promises.writeFile(filePath, JSON.stringify(data));
    console.log(`Користувач з індексом ${userId} успішно видалений!`);

    res.status(200).json({
        message: `Користувач з індексом ${userId} успішно видалений!`,
    });
});


async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`Сервер запущено на порту ${PORT}`);
        });
    } catch (err) {
        console.error(`Сталася помилка: ${err}`);
    }
}

startServer().then();