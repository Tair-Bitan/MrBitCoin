import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contact: Contact
  contactId: string
  subscription: Subscription
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {
    this.form = this.fb.group(
      {
        name: this.contact?.name,
        email: '',
        phone: ''
      }
    )
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => this.contactId = params.id)
    if (this.contactId) this.loadContact()
  }

  loadContact(): void {
    this.subscription = this.route.params.pipe(
      mergeMap(params => this.contactService.getContactById(params.id)))
      .subscribe(contact => {
        console.log('contact', contact);
        this.contact = contact;
        this.loadForm(this.contact)
      })
  }

  loadForm(contact: Contact) {
    return this.form.setValue({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
  }

  onSaveContact() {
    let contactToSave
    if (this.contactId) {
      contactToSave = {
        _id: this.contact._id,
        ...this.form.value
      }
    } else contactToSave = {
      ...this.form.value
    }
    this.contactService.saveContact(contactToSave)
    this.router.navigate(['contact'])
  }

  onGoBack() {
    if (this.contact?._id) this.router.navigate(['contact', this.contact._id])
    this.router.navigate(['contact'])
  }

}
