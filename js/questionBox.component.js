app.component('questionBox', {
	controller: function(questions) {
		this.questions = questions;
		this.questionIdx = 0;
		this.completed = false;
		this.scores = [];
		this.total = 0;
		this.questions.forEach( item => this.scores.push(0));


		this.nextPage = function() {
			this.questionIdx++;
		}
		this.prevPage = function() {
			this.questionIdx--;
		}
		this.chooseAnswer = function(index) {
			this.scores[this.questionIdx] = this.questions[this.questionIdx].answers[index].points;
			if(this.questionIdx < this.questions.length - 1) {
				this.nextPage();
			} else {
				this.completed = true;
			}
			this.total = 0;
			this.scores.forEach(score => this.total += score); 
		}

	},
	template: `
		<div class="single-question" ng-show="!$ctrl.completed">
			<div class="pagers">
				<div class="pager pager-left" 
					ng-click="$ctrl.prevPage()" 
					ng-class="{ 'disabled': $ctrl.questionIdx === 0}">&lt; prev
				</div>
				<div class="pager pager-right" 
					ng-click="$ctrl.nextPage()"
					ng-class="{ 'disabled': $ctrl.questionIdx === $ctrl.questions.length - 1}"> next &gt;
				</div>
			</div>
			<div class="question">Question {{ $ctrl.questionIdx + 1 }}:
				 {{ $ctrl.questions[$ctrl.questionIdx].question}}</div>
			<div class="answers">
				<ul>
					<li ng-repeat="answer in $ctrl.questions[$ctrl.questionIdx].answers">
						<button ng-click="$ctrl.chooseAnswer($index)">{{ answer.label }}</button>
					</li>
				</ul>
			</div>
		</div>
		<div class="results"" ng-show="$ctrl.completed">
			Thanks for completing questions. Your score is <b>{{ $ctrl.total }}</b>.
		</div>
	`
});