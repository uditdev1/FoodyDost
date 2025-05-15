import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import classes from "./CopyText.module.css";

const CopyText = ({data, name}) => {
    const handleCopy = () => {
        toast.success(name);
    }
  return (
    <>
      <span className={classes.data}>{data}</span>
      <CopyToClipboard text={data}>
        <Button variant="transparent" onClick={handleCopy}><ContentCopyIcon/></Button>
      </CopyToClipboard>
    </>
  );
};

export default CopyText;