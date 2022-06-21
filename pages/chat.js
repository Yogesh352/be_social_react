import React, { useRef, useState } from 'react';
import styles from '../styles/Chat.module.css';
import Navbar from "../src/components/Navbar/Navbar";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/analytics'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBu7Ukf1PPI7Pz1ksOIUsHV8HLAbKWqx6Y",
  authDomain: "chat-app-bccf3.firebaseapp.com",
  projectId: "chat-app-bccf3",
  storageBucket: "chat-app-bccf3.appspot.com",
  messagingSenderId: "824447302866",
  appId: "1:824447302866:web:acbb1fd620920bd006810b",
  measurementId: "G-R8K9VRP07B"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
    // determine if user is logged in (determines whether to show chat room or not)
    const [user] = useAuthState(auth);
  
    return (
      <div className={styles.App}>
        <Navbar />

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item direction="column">
            <Paper
                sx={{
                  height: 940,
                  width: 350,
                }}
              />
          </Grid>
          <Grid item xs={8}>
            <Paper>xs=8</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>xs=4</Paper>
          </Grid>
          {/* <Box 
            sx={{
              width: 940,
              height: 950,
              backgroundColor: 'white',
            }}
          >
            <Grid
              item
              xs={2}
              direction="column"
            >
              <Box className={styles.headerBox}>
                <h1 className={styles.chatHeading}> My Chats </h1>
              </Box>
            </Grid>

            <Grid
              item
              xs={4}
              direction="column"
            >
              <Box className={styles.chatBox}>
                <h1 className={styles.chatHeading}> Hello </h1>
              </Box>
            </Grid>

          </Box> */}
        </Grid>
  
        <section>
          {/* {user ? <ChatRoom /> : <SignIn />} */}
        </section>
  
      </div>
    );
}

export default App;