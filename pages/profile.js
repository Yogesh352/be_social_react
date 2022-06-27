import React, { useState, useEffect } from "react";
import { Grid, Avatar, Typography, Stack, Badge, Button } from "@mui/material";

import { AdditionIcon } from "../src/components/Icons/index";
import { storage, db, auth } from "../src/authentication/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          console.log(auth.currentUser.uid);

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");
        } catch (err) {
          console.log(err.msg);
        }
      };
      uploadImg();
    }
  }, [img]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage,user.avatarPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return user ? (
    <Grid
      container
      padding={4}
      spacing={0}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        className="bg-white p-4 rounded-md shadow-md"
        direction="row"
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <Stack spacing={1}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <div>
                <label htmlFor="photo">
                  <AdditionIcon color="green" className="h-5 w-5 cursor-pointer" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="photo"
                  onChange={(e) => setImg(e.target.files[0])}
                ></input>
              </div>
            }
          >
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt="Bobby"
              src={user.avatar || null}
            />
          </Badge>
          {user.avatar ? (
            <Button color="error" variant="contained" size="small" onClick = {deleteImage}>
              Remove
            </Button>
          ) : null}
        </Stack>
        <Stack spacing={2}>
          <Typography>
            <span className="text-xl font-bold text-gray-500">
              {user.enteredName}
            </span>
          </Typography>
          <Typography>{user.enteredEmail}</Typography>
          <Typography>
            Joined on: {user.createdAt.toDate().toDateString()}
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  ) : null;
};

export default Profile;
