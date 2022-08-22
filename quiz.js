class Quiz {
	constructor(selector, data, options) {
		this.self = document.querySelector(selector);
		this.options = options;
		this.data = data;
		this.counter = 0;
		this.length = this.data.length;
		this.resultArray = [];
		this.init();
		this.events();
	}

	init() {
		this.self.innerHTML = this.build(this.data[this.counter], this.length, this.options);
	}

	build(data, length, options) {
		const { title, number } = data;
		const { nextBtnText, prevBtnText, sendBtnText } = options;
		const answers = data.answers.map(item => {
			return `
				<label class="quiz__label">
					<input type="${item.type}" data-valid="false" class="quiz__input" name="${data.answer_alias}" ${item.type == 'text' ? 'placeholder="Введите ваш вариант ответа"' : ''} value="${item.type !== 'text' ? item.answer_title : ''}">
					<span class="quiz__descr">${item.answer_title}</span>
				</label>
			`;
		});

		return `
			<div class="quiz__content">
				<div class="quiz__counter">${number} из ${this.length} вопросов</div>
				<div class="quiz-question">
					<h3 class="quiz-question__title">${title}</h3>
					<div class="quiz-question__answers">
						${answers.join('')}
					</div>
					<div class="quiz-question__btns">
						<button type="button" class="quiz-question__btn" data-btn-prev hidden>${prevBtnText}</button>
						<button type="button" class="quiz-question__btn" data-btn-next>${nextBtnText}</button>
					</div>
				</div>
			</div>
		`;
	}

	nextQuestion() {
		if ( this.counter + 1 < this.length ) {
			this.counter++;
			this.self.innerHTML = this.build(this.data[this.counter], this.length, this.options);

			if ( this.counter + 1 == this.length ) {
				this.self.querySelector('.quiz-question__btns').insertAdjacentHTML('beforeend', `<button class="quiz-question__btn" type="submit" data-send>${this.options.sendBtnText}</button>`);
				document.querySelector('[data-btn-next]').remove();
			}
		}
		if ( this.counter > 0 ) document.querySelector('[data-btn-prev]').removeAttribute('hidden');
	}

	prevQuestion() {
		if ( this.counter > 0 ) {		
			this.counter--;
			this.self.innerHTML = this.build(this.data[this.counter], this.length, this.options);	
			if ( this.counter > 0 ) {
				document.querySelector('[data-btn-prev]').removeAttribute('hidden');
			}
		}
	}

	events() {
		this.self.addEventListener('click', (e) => {
			if ( e.target == document.querySelector('[data-btn-next]') ) {
				this.nextQuestion();
			}

			if ( e.target == document.querySelector('[data-btn-prev]') ) {
				this.prevQuestion();
			}
		});
	}
}

window.quiz = new Quiz('.quiz', dataAnswers, {
	nextBtnText: 'Далее',
	prevBtnText: 'Назад',
	sendBtnText: 'Завершить опрос'
})