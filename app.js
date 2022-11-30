'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_PATH = 'd:\\tmp2';
const MIN_FILE_SIZE = 0;
const MAX_FILE_SIZE = 10485760;
const MIN_NAME_SIZE = 1;
const MAX_NAME_SIZE = 30;
const MIN_EXT_SIZE = 0;
const MAX_EXT_SIZE = 4;
const MIN_FILES_IN_FOLDER = 0;
const MAX_FILES_IN_FOLDER = 10;
const MIN_FOLDERS_IN_FOLDER = 1;
const MAX_FOLDERS_IN_FOLDER = 10;
const MAX_LEVEL = 3;
const ALPHABET_NAMES = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.';
const ALPHABET_EXTENSIONS = 'abcdefghijklmnopqrstuvwxyz';

generateOnLevel(1, ROOT_PATH);

function generateOnLevel(level, currentPath)
{
	//Генерируем папки
	if (level <= MAX_LEVEL)
	{
		for (let i = 0; i < randomInteger(MIN_FOLDERS_IN_FOLDER, MAX_FOLDERS_IN_FOLDER); i++)
		{
			let folderName = randomString(randomInteger(MIN_NAME_SIZE, MAX_NAME_SIZE), ALPHABET_NAMES);
			if (folderName[folderName.length - 1] === '.') folderName = folderName.slice(0, folderName.length - 1);
			const newFolderPath = path.join(currentPath, folderName);
			fs.mkdirSync(newFolderPath, { recursive: true });
			generateOnLevel(level + 1, newFolderPath);
		}
	}
	//Генерируем файлы
	for (let i = 0; i < randomInteger(MIN_FILES_IN_FOLDER, MAX_FILES_IN_FOLDER); i++)
	{
		let fileBody = randomString(randomInteger(MIN_NAME_SIZE, MAX_NAME_SIZE), ALPHABET_NAMES);
		const fileExt = randomString(randomInteger(MIN_EXT_SIZE, MAX_EXT_SIZE), ALPHABET_EXTENSIONS);
		if (fileExt.length === 0) fileBody = fileBody.replace(/\./g, '');
		const fileName = fileBody + (fileExt.length > 0 ? ('.' + fileExt) : '');
		const filePath = path.join(currentPath, fileName);
		saveRandomFile(filePath, randomInteger(MIN_FILE_SIZE, MAX_FILE_SIZE));
	}
}

function saveRandomFile(path, length)
{
	const data = crypto.randomBytes(length);
	fs.writeFileSync(path, data);
}

function randomInteger(min, max)
{
	// получить случайное число от (min-0.5) до (max+0.5)
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

function randomString(length, alphabet)
{
	let out = '';
	for (let i = 0; i < length; i++)
	{
		out += alphabet[randomInteger(0, alphabet.length - 1)];
	}
	return out;
}