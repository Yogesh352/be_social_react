import React, {useRef, useEffect} from "react";
import Moment from "react-moment";
import Image from "next/image";
import { Box, Stack } from "@mui/material";

const Message = ({ msg, loggedInUser }) => {
  const format = msg.from === loggedInUser ? "bg-green-100 float-right p-3 rounded-md" : "bg-blue-100 float-left p-3 rounded-md";
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior : "smooth", block: 'nearest', inline: 'start'})
  }, [msg])
  return (
    <div className="flow-root" ref ={scrollRef}>
      <Box className={format} >
        <Stack>
          {msg.media ? (
            <Image src={msg.media} alt={msg.text} width="50" height="50" />
          ) : null}
          {msg.text}
          <br />
          <small className ="text-grey-500">
            <Moment fromNow>{msg.createdAt.toDate()}</Moment>
          </small>
        </Stack>
      </Box>
    </div>
  );
};

export default Message;
