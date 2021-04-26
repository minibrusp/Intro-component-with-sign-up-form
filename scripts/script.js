(()=> {
   console.log('Hello ^^');
   'use strict';

   class Person {
      constructor() {
         this.getPerson();
      }

      getPerson() {
         let firstname = document.querySelector('.registration__form .fname');
         let lastname = document.querySelector('.registration__form .lname');
         return this.checkPerson(firstname, lastname);
      }

      checkPerson(firstname, lastname) {
         let error = false;

         if(this.checkFirstname(firstname) === true) {
            error = true;
         }

         if (this.checkLastname(lastname) === true) {
            error = true;
         }

         return error;
      }

      checkFirstname(firstname) {
         let target = 'fname';
         if(firstname.value === ''| undefined) {
            firstname.classList.add('error');
            this.addPersonError(target);
            return true;
         }
         this.removeError(target, firstname);
         this.firstname = firstname.value;
      }

      checkLastname(lastname) {
         let target = 'lname';
         if(lastname.value === ''| undefined) {
            lastname.classList.add('error');
            this.addPersonError(target);
            return true;
         }
         this.removeError(target, lastname);
         this.lastname = lastname.value;
      }

      addPersonError(target) {
         let errorMsg = document.querySelector(`.registration__form .${target} + span`);
         errorMsg.classList.add('error');

         switch(target) {
            case 'fname':
               errorMsg.innerHTML = "First Name cannot be empty";
               break;
            case 'lname':
               errorMsg.innerHTML = "Last Name cannot be empty";
               break;
         }
      }

      removeError(target, markup) {
         let errorMsg = document.querySelector(`.registration__form .${target} + span`);
         errorMsg.classList.remove('error');
         errorMsg.innerHTML = "";
         markup.classList.remove('error');
      }

      personInfo() {
         return `First Name: ${this.firstname}\nLast Name: ${this.lastname}`;
      }

   }

   class Account extends Person {
      constructor() {
         super()
         super.getPerson();
         this.getAccount();
      }

      getAccount() {
         let email = document.querySelector('.registration__form .email');
         let password = document.querySelector('.registration__form .password');
         if(this.checkAccount(email,password) === false) {
            this.accountRegistrationSuccess();
         }
      }

      checkAccount(email, password) {

         let error = false;

         if(super.getPerson()=== true) {
            error = true;
         }

         if(this.checkEmail(email) === true) {
            error = true;
         }

         if(this.checkPassword(password) === true) {
            error = true;
         }

         return error;
      }

      checkEmail() {
         let target = 'email';
         if(email.value === ''| undefined) {
            email.classList.add('error');
            this.addAccountError(target);
            return true;
         }

         if(this.emailRegexValidation(email.value) === false) {
            email.classList.add('error');
            this.invalidEmail();
            return true;
         }
         super.removeError(target, email);
         this.email = email.value;
      }

      checkPassword() {
         let target = 'password';
         if(password.value === ''| undefined) {
            password.classList.add('error');
            this.addAccountError(target);
            return true;
         }
         if(this.passwordRegexValidation(password.value) === false) {
            password.classList.add('error');
            this.invalidPassword();
            return true;
         }
         super.removeError(target, password);
         this.password = password.value;
      }

      addAccountError(target) {
         let errorMsg = document.querySelector(`.registration__form .${target} + span`);
         errorMsg.classList.add('error');

         switch(target) {
            case 'email':
               errorMsg.innerHTML = "Email cannot be empty";
               break;
            case 'password':
               errorMsg.innerHTML = "Password cannot be empty";
               break;
         }
      }

      emailRegexValidation(email) {
         let pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/;
         let result = pattern.test(email);
         return result;
      }

      invalidEmail() {
         let errorMsg = document.querySelector(`.registration__form .email + span`);
         errorMsg.classList.add('error');
         errorMsg.innerHTML = "Looks like this is not an email";
         return;
      }

      passwordRegexValidation(password) {
         let pattern = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@$%&? "]).*$/;
         let result = pattern.test(password);
         return result;
      }

      invalidPassword() {
         let errorMsg = document.querySelector(`.registration__form .password + span`);
         errorMsg.classList.add('error');
         errorMsg.innerHTML = "Password must contain atleast 8 characters </br>1 capital letter 1 </br>special character </br>and atleast 1 number";
         return;
      }

      accountRegistrationSuccess() {
         let successMsg = document.querySelector('.registration__form .success__span');
         let inputContainers = document.querySelectorAll('.input__container');
         let formButton = document.querySelector('.registration__form .submit');
         let termParagraph = document.querySelector('.registration__form p');
         successMsg.classList.add('success');
         successMsg.innerHTML = `Congratulations, your account has been successfully created. </br></br>${this.accountInfo().replaceAll('\n', '</br>')}`;
         inputContainers.forEach(container => {
            container.style.display = "none";
         });
         formButton.style.display = "none";
         termParagraph.style.display = "none";
      }

      accountInfo() {
         return `${super.personInfo()}\nEmail Address: ${this.email}\nPassword: ${this.password}`;
      }
   }

   let regForm = document.querySelector('.registration__form');

   regForm.addEventListener('submit', event => {
      event.preventDefault();
      let account = new Account();
      // console.log(`${account.accountInfo()}`);

   });


})();


