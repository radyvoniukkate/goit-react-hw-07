import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    console.log("Fetching contacts..."); // Лог до запиту
    try {
      const response = await axios.get("/api/contacts");
      console.log("API Response Data:", response.data); // Лог даних з API
      return response.data;
    } catch (error) {
      console.log("Error fetching contacts:", error.message); // Лог помилки
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
