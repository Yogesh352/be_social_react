// import React, { useRef, useState } from "react";
// import styles from "../styles/Chat.module.css";

// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/analytics";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

// firebase.initializeApp({
//   apiKey: "AIzaSyBu7Ukf1PPI7Pz1ksOIUsHV8HLAbKWqx6Y",
//   authDomain: "chat-app-bccf3.firebaseapp.com",
//   projectId: "chat-app-bccf3",
//   storageBucket: "chat-app-bccf3.appspot.com",
//   messagingSenderId: "824447302866",
//   appId: "1:824447302866:web:acbb1fd620920bd006810b",
//   measurementId: "G-R8K9VRP07B",
// });

// const auth = firebase.auth();
// const firestore = firebase.firestore();

// function Chat() {
//   // determine if user is logged in (determines whether to show chat room or not)
//   const [user] = useAuthState(auth);

//   const dummy = useRef();
//   const messagesRef = firestore.collection("messages");
//   const query = messagesRef.orderBy("createdAt").limit(25);

//   const [messages] = useCollectionData(query, { idField: "id" });
//   const [chatIdx, setChatIdx] = useState(0);

//   const [formValue, setFormValue] = useState("");

//   return (
//     <>
//       <Grid
//         container
//         padding={4}
//         spacing={0}
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Grid item xs={2}>
//             <Grid direction="row">
//               <h1 className={styles.chatHeading}> Chat </h1>
//             </Grid>
//         </Grid>
//         <Grid item xs={6}>
//             <Grid direction="row">
//               <img
//                 className={styles.profPic}
//                 src={messages == null ? "" : messages[0].photoURL}
//               />
//               <h1 className={styles.chatHeading}>
//                 {" "}
//                 {messages == null ? "" : messages[0].uid}{" "}
//               </h1>
//             </Grid>
//         </Grid>
//       </Grid>

//       <section>{/* {user ? <ChatRoom /> : <SignIn />} */}</section>
//     </>
//   );
// }

// export default Chat;


const Chats = () =>{ 
  return <div>This is chats</div>
}
export default Chats;