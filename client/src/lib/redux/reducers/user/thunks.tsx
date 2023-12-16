import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "./fetch";

export const loginAsync = createAsyncThunk('user/login', login);

export const singupAsync = createAsyncThunk('user/signup', signup);
