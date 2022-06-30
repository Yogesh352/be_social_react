import React, { useEffect, useState } from "react";
import { Stack, Avatar, Box, Typography } from "@mui/material";
import { CircleIcon } from "../Icons/index";
import { onSnapshot, doc } from "@firebase/firestore";
import { db } from "../../authentication/firebase";

const User = ({ user, selectUser, loggedInUser, chat }) => {
  const user2 = user?.uid;

  const [data, setData] = useState("");
  useEffect(() => {
    const id =
      loggedInUser > user2
        ? `${loggedInUser + user2}`
        : `${user2 + loggedInUser}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  console.log(data);

  const format =
    chat.enteredName === user.enteredName
      ? "w-full border-b-2 px-8 py-4 cursor-pointer bg-grey-300"
      : "w-full border-b-2 px-8 py-4 cursor-pointer";
  return (
    <Stack className={format} spacing={2} onClick={() => selectUser(user)}>
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={{ width: 50, height: 50 }}
          alt="Profile Pic"
          src={user.avatar || null}
        />
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Box justifyContent="center" alignItems="center" className="relative">
            {user.enteredName}
            {data && (
              <p className="text-grey-600 text-ellipsis">
                <strong>{data.from === loggedInUser ? "you: " : null}</strong>
                {data.text}
              </p>
            )}
            {user.isOnline ? (
              <CircleIcon className="absolute -right-5 top-1 inline rounded-full w-3 h-3 fill-green-500 " />
            ) : (
              <CircleIcon className="rounded-full w-3 h-3 fill-red-500" />
            )}
          </Box>
          {data?.from !== loggedInUser && data?.unread && (
            <small className="bg-blue-500 px-2 rounded-10 border rounded-md ">New</small>
          )}
          
          
        </Stack>
      </Stack>
    </Stack>
  );
};

export default User;
