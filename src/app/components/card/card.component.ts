import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card-container">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
