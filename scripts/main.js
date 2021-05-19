const words = [];
const tableContainer = document.querySelector('.table-container');
const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const userAnswer_input = document.getElementById('word-input');
const showAnswer = document.querySelector('.word');
let wordsCopy;
let answers = {};
let askedWord, correctAnswer;
let language;
let randomIndex;
let correctCount;
const getRandomNum = (min, max) => Math.floor(Math.random() * max) + min;

function startQuiz() {
	if (words.length === 0) return;
	tableContainer.innerHTML = '';
	language = document.getElementById('lang').value;
	answers = {};
	wordsCopy = [...words];
	correctCount = 0;
	[askedWord, correctAnswer] = getWords();
	setText();
}

function getWords() {
	randomIndex = getRandomNum(0, wordsCopy.length);
	const word = wordsCopy[randomIndex];
	let askedWord = Object.keys(word)[0];
	let correctAnswer = Object.values(word)[0];
	if (language === 'foreign')
		[askedWord, correctAnswer] = [correctAnswer, askedWord];
	return [askedWord, correctAnswer];
}

function nextWord() {
	addInfo(askedWord, correctAnswer);
	wordsCopy.splice(randomIndex, 1);
	if (wordsCopy.length === 0) {
		endQuiz();
		return;
	}
	[askedWord, correctAnswer] = getWords();
	setText();
	userAnswer_input.value = '';
}

function setText() {
	showAnswer.textContent = askedWord;
}

function addInfo(askedWord, correctAnswer) {
	const userAnswer = userAnswer_input.value;
	answers[askedWord] = { correctAnswer, userAnswer };
	console.log(answers);
}

function endQuiz() {
	addTable();
}

function addTable() {
	tableContainer.innerHTML = '';
	const table = document.createElement('table');
	const head = document.createElement('thead');
	const body = document.createElement('tbody');
	const footer = document.createElement('tfoot');
	const headingRow = document.createElement('tr');
	const numCell = document.createElement('th');
	const askedWordCell = document.createElement('th');
	const answeredWordCell = document.createElement('th');
	const correctAnswerCell = document.createElement('th');
	const isCorrectCell = document.createElement('th');
	table.setAttribute('cellspacing', '0');
	numCell.textContent = '№';
	askedWordCell.textContent = 'Дума';
	answeredWordCell.textContent = 'Вашият отговор';
	correctAnswerCell.textContent = 'Правилен отговор';
	isCorrectCell.textContent = 'Верен ли е отговорът Ви';
	headingRow.append(
		numCell,
		askedWordCell,
		correctAnswerCell,
		answeredWordCell,
		isCorrectCell
	);
	head.appendChild(headingRow);

	// body

	Object.entries(answers).forEach((entry, counter) => {
		const [word, info] = entry;
		const bodyRow = document.createElement('tr');
		const isCorrect = info.correctAnswer === info.userAnswer;
		const correctClass = isCorrect ? 'correct' : 'incorrect';
		const correctOrNot_result = isCorrect ? 'да' : 'не';

		bodyRow.innerHTML +=
			`<td>${counter + 1}</td>` +
			`<td>${word}</td>` +
			`<td>${info.correctAnswer}</td>` +
			`<td>${info.userAnswer}</td>` +
			`<td>${correctOrNot_result}`;

		bodyRow.classList.add(correctClass);
		body.appendChild(bodyRow);
		if (isCorrect) correctCount++;
	});

	// footer
	footer.innerHTML +=
		'<tr class="last-row">' +
		'<td colspan="4">Верни отговори: </td>' +
		`<td>${correctCount}</td>` +
		'<tr>';
	table.append(head, body, footer);
	tableContainer.appendChild(table);
}

function addNewWords(currentWords) {
	currentWords.forEach(([word, answer]) => {
		words.push({ [word]: answer });
	});
}

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextWord);

// addNewWords(
// 	'гъска гусь кокошка курица диви дитие кон лошадь жерав журавль мазнина жир иглолистна_гора хвойнь|е_деревья гъба гриб бор сосна кедър кедр лале тюльпан домашна_ягода клубника кокиче подснежник уморен устал гладен голоден замръзнал замерз'
// );
// addNewWords(
// 	'ален;развратен;проститутка scarlet консул consul опростен simplistic извличам extract дъбов oaken своеобразен;специфичен peculiar налагане;на;наказание penal;infliction последвам ensue; тежко;печално grievously  конгрегация;паство congregation самоназначен self-constituted  клюки gossips ярък;светъл vivid прегръщам clasp пазва;гръд;бюст bosom по;този;начин thereby прикривам conceal символ token надменен;горделив haughty поглед glance рокля;расо gown сложен;натруфен elaborate бродерия embroidery заврънгулки flourish изобилен abundant лъскав glossy блясък gleam осветен;озарен illuminated прекратявам prorogue безпристрастен impartial хобот snout работа;с;ръце trade стажант trainee гъмжа;изобилствам teem трапец trapez щур;налудничав madcap скандален;нечуван outrageous опънато;въже tightrope дървесни;стърготини sawdust шия sew пайети sequins мим mime перука wig непохватен clumsy пакостлив;игрив mischievous суматоха commotion апарат;уред apparatus; каскада stunt изисквам;търся demand особено particularly'
// );

addNewWords([['ален;развратен;проститутка', 'scarlet']]);
