(()=> {
   console.log('Hello ^^');
   'use strict';

   class Person {
      constructor(firstname, lastname) {
         this.firstname = firstname;
         this.lastname = lastname;
      }

      personInfo() {
         return `First Name: ${this.firstname}\nLast Name: ${this.lastname}`;
      }
   }

   class Account extends Person {
      constructor(firstname, lastname, email, password) {
         super(firstname, lastname);
         this.email = email;
         this.password = password;
      }

      accountInfo() {
         return `${super.personInfo()}\nEmail Address: ${this.email}\nPassword: ${this.password}`;
      }
   }

   const accounts = []; 
   let regForm = document.querySelector('.registration__form');
   AddEventListeners();


   function AddEventListeners() {
      regForm.addEventListener('submit', formOnSubmit);
   }

   function formOnSubmit(event) {
      event.preventDefault();
      let firstName = document.querySelector('.registration__form .fname');
      let lastName = document.querySelector('.registration__form .lname');
      let email = document.querySelector('.registration__form .email');
      let password = document.querySelector('.registration__form .password');
      let accountObj = {
         firstName,
         lastName,
         email,
         password
      };
      if(checkFields(accountObj) === true) {
         accounts.push(new Account(capitalizePerWord(firstName.value),capitalizePerWord(lastName.value),email.value,password.value));
         accounts.forEach(account => {
            let successMsg = document.querySelector('.registration__form .success__span');
            let inputContainers = document.querySelectorAll('.input__container');
            let formButton = document.querySelector('.registration__form .submit');
            let termParagraph = document.querySelector('.registration__form p');
            successMsg.classList.add('success');
            successMsg.innerHTML = `Congratulations, your account has been successfully created. </br></br>${account.accountInfo().replaceAll('\n', '</br>')}`;
            inputContainers.forEach(container => {
               container.style.display = "none";
            });
            formButton.style.display = "none";
            termParagraph.style.display = "none";

         });
      }
   }

   function checkFields(accountObj) {
      let error = true;

      // checkFName(accountObj);
      // checkLName(accountObj);
      // checkEmail(accountObj);
      // checkPassword(accountObj);

      if(checkFName(accountObj) === true) {
         error = false;
      }
      if(checkLName(accountObj) === true) {
         error = false;
      }
      if(checkEmail(accountObj) === true) {
         error = false;
      }  
      if(checkPassword(accountObj) === true) {
         error = false;
      }

      return error;

   }

   function isEmpty(target) {

      let errorMsg = document.querySelector(`.registration__form .${target} + span`);
      errorMsg.classList.add('error');

      switch(target) {
         case 'fname':
            errorMsg.innerHTML = "First Name cannot be empty";
            break;
         case 'lname':
            errorMsg.innerHTML = "Last Name cannot be empty";
            break;
         case 'email':
            errorMsg.innerHTML = "Email cannot be empty";
            break;
         case 'password':
            errorMsg.innerHTML = "Password cannot be empty";
      }
   }

   function checkFName(accountObj) {
      let target = 'fname';
      if(accountObj.firstName.value === ''| undefined) {
         accountObj.firstName.classList.add('error');
         isEmpty(accountObj.firstName.classList[0]);
         return true;
      }
      removeErrorDisplay(target, accountObj.firstName);
      return false;
   }

   function checkLName(accountObj) {
      let target = 'lname';
      if(accountObj.lastName.value === ''| undefined) {
         accountObj.lastName.classList.add('error');
         isEmpty(accountObj.lastName.classList[0]);
         return true;
      }
      removeErrorDisplay(target, accountObj.lastName);
      return false;
   }

   function checkEmail(accountObj) {
      let target = 'email';
      if(accountObj.email.value === ''| undefined) {
         accountObj.email.classList.add('error');
         isEmpty(accountObj.email.classList[0]);
         return true;
      }
      if(emailRegexValidation(accountObj.email.value)=== false) {
         accountObj.email.classList.add('error');
         invalidEmail();
         return true;
      }
      removeErrorDisplay(target, accountObj.email);
      return false;
   }

   function checkPassword(accountObj) {
      let target = 'password';
      if(accountObj.password.value === ''| undefined) {
         accountObj.password.classList.add('error');
         isEmpty(accountObj.password.classList[0]);
         return true;
      }
      if(passwordRegexValidation(accountObj.password.value) === false) {
         accountObj.password.classList.add('error');
         invalidPassword();
         return true;
      }
      removeErrorDisplay(target, accountObj.password);
      return false;
   }

   function emailRegexValidation(email) {
      let pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/;
      let result = pattern.test(email);
      return result;
   }

   function invalidEmail() {
      let errorMsg = document.querySelector(`.registration__form .email + span`);
      errorMsg.classList.add('error');
      errorMsg.innerHTML = "Looks like this is not an email";
      return;
   }

   function invalidPassword() {
      let errorMsg = document.querySelector(`.registration__form .password + span`);
      errorMsg.classList.add('error');
      errorMsg.innerHTML = "Password must contain atleast 8 characters </br>1 capital letter 1 </br>special character </br>and atleast 3 numbers";
      return;
   }

   function removeErrorDisplay(target, objelem) {
      let errorMsg = document.querySelector(`.registration__form .${target} + span`);
      errorMsg.classList.remove('error');
      errorMsg.innerHTML = "";
      objelem.classList.remove('error');
   }

   function passwordRegexValidation(password) {
      let pattern = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d{3,})(?=.*[!#@$%&? "]).*$/;
      let result = pattern.test(password);
      return result;
   }

   function capitalizePerWord(string) {
      return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
   }





})();


