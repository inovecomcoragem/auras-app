import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator, AbstractControl } from '@angular/forms';

import { PersonService } from '../../providers/person.service';
import { Person } from '../../models/person.model';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {

  personForm: FormGroup;
  fullForm: boolean;

  constructor(
    private personService: PersonService,
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router) { }

  private _id: String;

  ngOnInit() {
    this.renderer.removeAttribute(document.body, 'class');
    this.renderer.addClass(document.body, 'mask-white');
    this.createForm();
    this.activedRoute.params.subscribe(params => this._id = params.id);
    this.fullForm = environment.fullForm;
  }

  createForm() {
    this.personForm = this.fb.group({
      name: ['', (this.fullForm && Validators.required)],
      email: ['', Validators.required],
      company: ['', (this.fullForm && Validators.required)],
      role: ['', (this.fullForm && Validators.required)],
      function: ['', (this.fullForm && Validators.required)],
      career_email_permission: [false],
      access_events_permission: [false],
      information_share_permission: [false]
    });
  }

  save() {
    if (this.personForm.invalid) {
      return false;
    }

    const newPerson: Person = this.personForm.value;
    newPerson._id = this._id;

    this.personService.update(newPerson)
      .subscribe(
        result => this.router.navigateByUrl('/code/' + this._id),
        err => console.log(err));
  }

  clear(control: AbstractControl) {
    control.reset();
  }

  get name() {
    return this.personForm.get('name');
  }

  get email() {
    return this.personForm.get('email');
  }

  get company() {
    return this.personForm.get('company');
  }

  get role() {
    return this.personForm.get('role');
  }

  get function() {
    return this.personForm.get('function');
  }
}
