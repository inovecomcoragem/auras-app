import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator, AbstractControl } from '@angular/forms';

import { PersonService } from '../../providers/person.service';
import { Person } from '../../models/person.model';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';

import { AppGlobals } from '../../app-globals.service';
import { environment } from '../../../environments/environment';

declare var MktoForms2: any;

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {

  personForm: FormGroup;
  accessForm: boolean;
  radarForm: boolean;

  constructor(
    private personService: PersonService,
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    private globals: AppGlobals) { }

  private _id: String;

  ngOnInit() {
    this.renderer.removeAttribute(document.body, 'class');
    this.renderer.addClass(document.body, 'mask-white');
    this.createForm();
    this.activedRoute.params.subscribe(params => this._id = params.id);
    this.activedRoute.queryParams.subscribe(params => {
      if (params.aliId) {
        this.router.navigateByUrl('/code/' + this._id);
      }
    });
  }

  createForm() {
    this.accessForm = (this.globals.formType === 'access');
    this.radarForm = (this.globals.formType === 'radar');

    if (this.accessForm) {
      setTimeout(function() {
        MktoForms2.loadForm('https://app-e.marketo.com', '199-QDE-291', 9089, function() {
          const btn = <HTMLElement>document.getElementsByClassName('mktoButton')[0];
          btn.classList.add('btn', 'btn-lg');
          btn.innerHTML = 'CONFIRMAR';
          btn.style['background-color'] = '#074c9d';
          btn.style['background-image'] = 'none';
          btn.style['border'] = 'none';
          btn.style['margin'] = '2rem 0 0';

          const phoneElementRow = document.getElementById('Phone').parentElement.parentElement.parentElement;
          const foodElementRow = document.getElementById('event_Dietary_Requirements').parentElement.parentElement.parentElement;
          phoneElementRow.parentNode.removeChild(phoneElementRow);
          foodElementRow.parentNode.removeChild(foodElementRow);

          const emailInput = document.getElementById('Email');
          emailInput.addEventListener('focusout', function() {
            this.save();
          }.bind(this), false);
        }.bind(this));
      }.bind(this), 1000);
    }

    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      company: ['', Validators.required],
      role: ['CARGO'],
      function: ['', Validators.required],
      career_email_permission: [false],
      access_permission: [false],
      events_permission: [false],
      radar_permission: [false],
      information_share_permission: [false]
    });
  }

  save() {
    if (this.accessForm) {
      this.personForm.value.email =
        (<HTMLInputElement>document.getElementById('Email')).value;
      this.personForm.value.name =
        (<HTMLInputElement>document.getElementById('FirstName')).value + ' ' +
        (<HTMLInputElement>document.getElementById('LastName')).value;

      if (this.personForm.value.email === '') {
        return false;
      }
    } else if (this.personForm.invalid) {
      return false;
    }

    const newPerson: Person = this.personForm.value;
    newPerson._id = this._id;

    this.personService.update(newPerson)
      .subscribe(
        result => {
          if (this.accessForm) {
            console.log(result);
          } else {
            this.router.navigateByUrl('/code/' + this._id);
          }
        },
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
