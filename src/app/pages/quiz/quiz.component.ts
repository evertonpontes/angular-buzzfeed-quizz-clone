import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import quizzQuestions from '../../../assets/data/quizz_questions.json';
import { filter } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  displayResult: boolean = false;
  params: number = 0;
  quizzType: any;
  currentQuestion: any;
  questionsList: any[] = [];
  questionId: number = 1;
  answers: string[] = [];
  result: any;

  constructor(
    private activedRoute: ActivatedRoute,
    private navigator: Router
  ) { }

  ngOnInit(): void {

    this.activedRoute.params.subscribe(
      res => this.params = Number(res['id'])
    )

    this.quizzType = quizzQuestions[this.params - 1];

    this.currentQuestion = this.quizzType.questions.filter((_question: any) => _question.id === this.questionId)[0];

    this.questionsList.push(this.currentQuestion);

  }

  scrollToBottom(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }

  playerClickOption(answer: string): void {

    if (this.questionId === this.quizzType.questions.length) {
      this.answers.push(answer);
      this.questionId += 1;
      this.displayResult = true;

      setTimeout(() => this.scrollToBottom(), 1000);

      console.log(this.answers);
      this.result = this.quizzType.results[this.findResult()];
      console.log(this.result);

    } else {
      this.answers.push(answer);
      this.questionId += 1;
      this.currentQuestion = this.quizzType.questions.filter((_question: any) => _question.id === this.questionId)[0];

      this.questionsList.push(this.currentQuestion);
      setTimeout(() => this.scrollToBottom(), 1000);
    }

  }

  findResult() {
    const result = this.answers.reduce(
      (prev: string, curr: string, currId: number, arr: string[]) => {
        const prevArr = arr.filter(value => value === prev);
        const currArr = arr.filter(value => value === curr);

        if (prevArr.length > currArr.length) {
          return prev
        } else {
          return curr
        }
      })

    return result;
  }

  reset() {
    this.displayResult = false;
    this.questionId = 1;
    this.answers = [];
    this.questionsList.splice(1, this.questionsList.length - 1);
    this.result = undefined;
  }

}
