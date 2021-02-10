import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit {

  @Output() onFilter = new EventEmitter()

  filterBy = { term: '' }

  constructor() { }

  ngOnInit(): void {
  }

  onSetFilter(filterBy: any) {
    console.log('filtering', filterBy);
    this.onFilter.emit(filterBy)
  }
}
