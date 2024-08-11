import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/contacts", {
        headers: {
          "Cache-Control": "no-cache",
        }
      });
      if (!Array.isArray(response.data)) {
        throw new Error("API did not return an array");
      }
      return response.data;
    } catch (error) {
      if (error.response.status === 429) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get("/api/contacts");
        return response.data;
      }
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post("/api/contacts", newContact, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/api/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
