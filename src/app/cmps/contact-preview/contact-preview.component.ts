import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from 'src/app/model/contact.model';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {

  @Input() contact: Contact

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
