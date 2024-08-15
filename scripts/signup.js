import { app } from "../scripts/firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

//ClearInput Value

function clearAllInputs() {
  const inputs = document.querySelectorAll("#myInputs");
  inputs.forEach((input) => {
    input.value = "";
  });
}

// Signed up

var name = document.getElementById("yourSignUpName");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
let btnCreateAccount = document.querySelector("#btnCreateAccount");

if (btnCreateAccount) {
  btnCreateAccount.addEventListener("click", () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("account register succesfully", user);
        new AWN().success("Account SignUp Succesfully!");
        setTimeout(() => {
          window.location.href = "./login.html";
      }, 2000);


        // sendEmailVerification(auth.currentUser).then(() => {
        //   // Email verification sent!
        //   if (user.emailVerified == true) {
        //     window.location.href = "./quizCourse.html";
        //     greetName.innerHTML = greetingName;
        //     console.log(greetingName);
        //   } else {
        //     console.log("Please Verify Your Account ");
        //   }
        // });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("account Register Failed");
        new AWN().alert("Account Register Failed");
      });

    name.value = "";
    email.value = "";
    password.value = "";
  });
}

// Signed in
let loginName = document.getElementById("loginName");
let loginemail = document.querySelector("#loginemail");
let loginpassword = document.getElementById("loginpassword");
let loginBtn = document.querySelector("#loginBtn");
let greetName = document.getElementById("userName");

// let userNam = loginName.value;

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    let greetingName = loginName.value;
    let userPassword = loginpassword.value;
    if (greetingName === "") {
      new AWN().alert("Name Required");
    }

    signInWithEmailAndPassword(auth, loginemail.value, loginpassword.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("login succesfully", user);
        async function userSignUp() {
          await setDoc(doc(db, "users", user.uid), {
            name: greetingName,
            email: user.email,
            password: userPassword,
            gmailName: user.displayName,
          });
        }
        userSignUp();
        new AWN().success("Account SignIn Succesfully!");
        setTimeout(() => {
          window.location.href = "./dashboard.html";
      }, 2000);

        // if (user.emailVerified == true) {
        //   // new AWN().success("Account Verify Succesfully")
        //   new AWN().success("Account SignIn Succesfully");
        //   setTimeout(() => {
        //     window.location.href = "./quizCourse.html";
        //   }, 5000);
        // } else {
        //   new AWN().warning(
        //     "Verifivation Email Sent! Please Verify Your Account"
        //   );
        // }
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        new AWN().alert(errorCode);
        console.log("sorry login failed", errorMessage);
      });

    loginName.value = "";
    loginemail.value = "";
    loginpassword.value = "";
  });
}

//Signin With Google

let signInWithGoogle = document.getElementById("signInWithGoogle");
let googleSignUp = document.getElementById("googleSignUp");
let checkFunc = signInWithGoogle || googleSignUp;

if (checkFunc) {
  checkFunc.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        new AWN().success("Account SignIn Succesfully");
        window.location.href = "./quizCourse.html";
        console.log("Google SignIn", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Google SignIn Error", errorMessage);
        new AWN().alert(errorCode);
        window.location.href = "./signup.html";
      });
  });
}

//SignOut

let signoutBtn = document.querySelector("#signoutBtn");

if (signoutBtn) {
  signoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        new AWN().success("SignOut Succesfully");
        window.location.href = "./signup.html";
        setTimeout(() => {
          window.location.href = "./signup.html";
      }, 6000);
      })
      .catch((error) => {
        console.log("Sign-out Error");
        new AWN().alert(errorCode);

      });
  });
}

//Current SIgnIn User

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("Current User", uid, user);

    // ...
  } else {
    // User is signed out
    // ...
    console.log("Current User SignOUt");
  }
});

// Sent Password Reset Email

let forgetPassword = document.getElementById("forgetPassword");

if (forgetPassword) {
  let loginemail = document.querySelector("#loginemail");

  forgetPassword.addEventListener("click", () => {
    sendPasswordResetEmail(auth, loginemail.value)
      .then(() => {
        // Password reset email sent!
        console.log("Password reset email sent!");
        new AWN().success("Password Reset Email Sent");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        new AWN().alert(errorCode);
        console.log("Reset Email Error", errorMessage);

        // ..
      });
  });
}

//PhoneNUmber Verify

let sendOtp = () => {
  const appVerifier = window.recaptchaVerifier;
  let email = document.getElementById("email");

  if(email.value[0] == 0){
    alert("923151025098")

  }

  signInWithPhoneNumber(auth, `+${email.value}`, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      console.log("confirmationResult", confirmationResult);
      new AWN().success("OTP Sent In Your Phone Number!");
      // ...
    })
    .catch((error) => {
      // Error; SMS not sent
      // ...
      console.log("error", error);
      new AWN().error(error);

    });
};

let sendOtpBtn = document.getElementById("sendOtpBtn");
sendOtpBtn.addEventListener("click", sendOtp);

window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
  size: "invisible",
  callback: (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    // ...
  },
  "expired-callback": () => {
    // Response expired. Ask user to solve reCAPTCHA again.
    // ...
  },
});

let verify = () => {
  let code = document.getElementById("verify");
  confirmationResult
    .confirm(code.value)
    .then((result) => {
      // User signed in successfully.
      const user = result.user;

      new AWN().success("OTP Verification Successful!");

      console.log("hogyaa bhaii", user);
      window.location.href = "./dashboard.html";

      // ...
    })
    .catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error);
      new AWN().error(error);

    });

   
};

let verifyBtn = document.getElementById("verifyBtn");
verifyBtn.addEventListener("click", verify);
