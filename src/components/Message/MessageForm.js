import React from "react";
import { AttachmentIcon } from "../Icons/index";
import { Button, Stack, Box } from "@mui/material";
import { Textarea } from "@mantine/core";

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Stack className="box-shadow-md">
        <Stack className="w-full">
          <Textarea
            className="w-full"
            placeholder="Enter Message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Stack
            className="border px-2 justify-between content-center"
            direction="row"
          >
            <label htmlFor="img">
              <AttachmentIcon
                className="h-10 cursor-pointer"
                size={18}
                color="grey"
              />
            </label>
            <input
              type="file"
              id="img"
              accept="image/*"
              style={{ display: "none" }}
              onChange={e=>setImg(e.target.files[0])}
            />
            <Button type="submit"> Send </Button>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};

export default MessageForm;
