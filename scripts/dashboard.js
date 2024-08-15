import { auth, onAuthStateChanged } from "./firebase.js";
import {
  db,
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "./firebase.js";

//Current SIgnIn User

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("Current User", uid, user);
    let userGreeting = document.getElementById("userName");
    userGreeting.innerHTML = user.displayName;

    // ...
  } else {
    // User is signed out
    // ...
    console.log("Current User SignOUt");
  }
});


let post = () => {
    let blog_heading = document.getElementById("blog_heading");
    let blogTextArea = document.getElementById("blogTextArea");
    let blog_image = document.getElementById("blog_image");

    let date = new Date().toDateString()

    function result() {
      
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            var date = new Date().toDateString()
            console.log("Current User", uid, user);
            const docRef = addDoc(collection(db, "blogs"), {
                blog_heading: blog_heading.value,
                         blogTextArea:blogTextArea.value,
                         name:user.displayName,
                         email:user.email,
                         uid:user.uid,
                         date : date,
        
            });
            console.log("result Submitted", docRef.id);
            
          } else {
            // User is signed out
            console.log("Current User SignOUt");
          }
          blog_heading.value="";
          blogTextArea.value="";
              
        });
            
            }
            result();

        }

//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//           const uid = user.uid;
//         }})
//     console.log(blog_heading.value);
//     console.log(blogTextArea.value);
//     const docRef = addDoc(collection(db, "blogs"), {
//         blog_heading,
//         blogTextArea,
//         name:user.displayName,
//         email:user.email,
//         uid:user.uid,
//         date : date,
       
  
//       });
//       console.log("result Submitted", docRef.id);
//       blog_heading.value="";
//       blogTextArea.value="";
    
    
// }

let postBlogBtn = document.getElementById("postBlogBtn");
postBlogBtn.addEventListener("click", post)


