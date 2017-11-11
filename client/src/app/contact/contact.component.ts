import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form;
  messageClass;
  message;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createContactForm(); // Create new blog form on start up          
  }

  ngOnInit() {
  }

  createContactForm() {
    this.form = this.formBuilder.group({
      // firstname field
      firstname: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        this.alphaValidation
      ])],
      // lastname field
      lastname: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        this.alphaValidation
      ])],
      // email field
      email: ['', Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
      // title field
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
      ])],
      // Body field
      message: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  // Validation for title
  alphaValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaValidation': true } // Return error in validation
    }
  }

  // Function to validate e-mail is proper format
  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  sendMessage() {
    var n = 'Con';
    var d = 'ky';
    const emailInfo = {
      email: this.form.get('email').value,
      title: this.form.get('title').value,
      message: `<div style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
                  <h3>Message from your personal site</h3>
                  <div>
                    ${ this.form.get('message').value }
                  </div>
                  <br />
                  <div>
                    <b style="color:#610808">Sent from:</b> ${ this.form.get('firstname').value } ${ this.form.get('lastname').value }.
                  </div>
                  <br />
                  <div>
                    <b style="color:#610808">Email Address:</b> ${ this.form.get('email').value }
                  </div>
                  <br />
                </div>`
    };
    console.log(emailInfo);
    this.contactService.sendEmail(emailInfo).subscribe(data => {
      // Check if email was sent
      if (!data.success) {
        console.log('Email not sent');
        this.message = 'Email not sent.';
        this.messageClass = 'failure';
      } else {
        console.log('Email sent');
        this.message = 'Email sent';
        this.messageClass = 'success';
        setTimeout(() => {
          this.router.navigate(['/home']); // Redirect to home view
        }, 2000);
      }
    });
  }

}
