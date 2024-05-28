const area = document.querySelector('.area')
let move = 0
let result = ''
const content = document.querySelector('.content')
const modalWrapper = document.querySelector('.modal__wrapper')
const modal = document.querySelector('.modal')
const btnClose = document.querySelector('.btn__close')
const boxes = document.getElementsByClassName('box')
const scoresDisplay = document.querySelector('.scores')

let scores = {
	krzyzy: 0,
	kolka: 0,
	remis: 0,
}

function loadScores() {
	const storedScores = localStorage.getItem('ticTacToeScores')
	if (storedScores) {
		scores = JSON.parse(storedScores)
	}
	displayScores()
}
function saveScores() {
	localStorage.setItem('ticTacToeScores', JSON.stringify(scores))
}

function displayScores() {
	scoresDisplay.innerHTML = `
            Krzyży: ${scores.krzyzy}     
            Kółka: ${scores.kolka}       
            Remisy: ${scores.remis}
    `
}

area.addEventListener('click', (e) => {
	if (e.target.classList.contains('box')) {
		if (e.target.innerHTML !== '') {
			return
		}
		if (move % 2 === 0) {
			e.target.innerHTML = '<img class="box-img" src="img/x.svg" alt="">'
			e.target.classList.add('x')
		} else {
			e.target.innerHTML = '<img class="box-img" src="img/o.svg" alt="">'
			e.target.classList.add('o')
		}
		move++
		if (check()) {
			prepareResult(result)
		} else if (move === 9) {
			result = 'remis'
			scores.remis++
			saveScores()
			prepareResult(result)
		}
	}
})
const check = () => {
	const arr = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
		[0, 4, 8],
	]
	for (let index = 0; index < arr.length; index++) {
		if (
			boxes[arr[index][0]].classList.contains('x') &&
			boxes[arr[index][1]].classList.contains('x') &&
			boxes[arr[index][2]].classList.contains('x')
		) {
			result = 'krzyzy'
			scores.krzyzy++
			saveScores()
			prepareResult(result)
		} else if (
			boxes[arr[index][0]].classList.contains('o') &&
			boxes[arr[index][1]].classList.contains('o') &&
			boxes[arr[index][2]].classList.contains('o')
		) {
			result = 'kolka'
			scores.kolka++
			saveScores()
			prepareResult(result)
			return
		}
	}
}

const isDraw = () => {
	return [...boxes].every((box) => box.innerHTML !== '')
}

const prepareResult = (winner) => {
	content.innerHTML = `Wygrali: ${winner}`
	modal.style.display = 'flex'
	move = 0
}

const closeModal = () => {
	modal.style.display = 'none'
	for (let index = 0; index < boxes.length; index++) {
		boxes[index].innerHTML = ''
		boxes[index].classList.remove('x')
		boxes[index].classList.remove('o')
	}
	loadScores()
}

btnClose.addEventListener('click', closeModal)
modalWrapper.addEventListener('click', closeModal)
loadScores()
