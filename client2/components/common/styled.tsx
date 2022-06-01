import styled from "styled-components";
import {Avatar, Card} from "@mui/material";
import React from "react";

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-items: center;
  padding: 5px 20px;
  border: 0.5px solid lightgray;
  background-color: #b8c6db;
  width: min-content;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
`
export const StyledImage = styled((props) => <Avatar {...props} variant={"rounded"}/>)`
  margin: 30px;
  height: 300px;
  width: 200px;
`