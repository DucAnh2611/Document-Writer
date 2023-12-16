import { createAsyncThunk } from "@reduxjs/toolkit";
import { create, info, list, update } from "./fetch";

export const createDocument = createAsyncThunk('document/create', create);

export const updateDocument = createAsyncThunk('document/update', update);

export const listDocument = createAsyncThunk('document/list', list);

export const infoDocument = createAsyncThunk('document/info', info);