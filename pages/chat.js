import React, { useEffect, useState, useContext, useRef } from "react";
import { db, auth, storage } from "../src/authentication/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { Grid, Stack, Typography, Divider, Box } from "@mui/material";
import User from "../src/components/Users/User";
import MessageForm from "../src/components/Message/MessageForm";
import Message from "../src/components/Message/Message";
import { NavbarContext } from "../src/components/Layout/Layout";
import Styles from "../styles/Chat.module.css";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const { open } = useContext(NavbarContext);

  const loggedInUser = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [loggedInUser]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id =
      loggedInUser > user2
        ? `${loggedInUser + user2}`
        : `${user2 + loggedInUser}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== loggedInUser) {
      await updateDoc(doc(db, "lastMsg", id), {
        unread: false,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id =
      loggedInUser > user2
        ? `${loggedInUser + user2}`
        : `${user2 + loggedInUser}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: loggedInUser,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: loggedInUser,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });
    setText("");
  };

  return (
    <Grid
      style={{
        minWidth: open ? "60%" : "100%",
        width: open? "88%": "100%",
        height: "100vh",
      }}
      m={3}
      className="justify-center top-400"
      container
      spacing={2}
      justifyContent="center"
    >
      
      <Grid item md={2} className="bg-white max-h-screen drop-shadow">
        <Stack className="w-full">
          <Box>
            <h1 className="font-sans px-8 py-2 text-lg border-b-2"> Users </h1>
            {users.map((user) => (
              <User
                key={user.uid}
                user={user}
                selectUser={selectUser}
                loggedInUser={loggedInUser}
                chat={chat}
              />
            ))}
          </Box>
        </Stack>
      </Grid>

      {/* <Divider orientation="vertical" /> */}

      <Grid className="bg-white max-h-screen drop-shadow" item md={4}>
        <Stack>
          {chat ? (
            <>
              <Box className="font-sans px-8 py-2 text-lg border-b-2">
                {chat.enteredName}
              </Box>
              <Stack spacing={5}>
                <Box
                  className="overflow-y-scroll p-4 space-y-4"
                  style={{
                    minWidth: "100%",
                    height: "65vh",
                  }}
                >
                  {msgs.length
                    ? msgs.map((msg, i) => (
                        <Message
                          key={i}
                          msg={msg}
                          loggedInUser={loggedInUser}
                        />
                      ))
                    : null}
                </Box>
                <MessageForm
                  className="absolute bottom-0"
                  handleSubmit={handleSubmit}
                  text={text}
                  setText={setText}
                  setImg={setImg}
                />
              </Stack>
            </>
          ) : (
            <Box className="font-sans px-8 py-2 text-lg border-b-2">
              Select a Chat to Begin
            </Box>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Chat;
