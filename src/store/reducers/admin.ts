/* eslint-disable no-param-reassign */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../service/axios';

import { CreateCircuitForm, ModifyCircuitForm } from '../../@types/admin';

interface AdminState {
  loading: boolean;
}
// init states
const intialState: AdminState = {
  loading: false,
};

export const createCircuit = createAsyncThunk(
  'admin/createCircuit',
  async (data: CreateCircuitForm): Promise<boolean> => {
    try {
      await api.post('/circuits', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return true;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const patchCircuit = createAsyncThunk(
  'admin/patchCircuit',
  async ({ id, updatedData }: ModifyCircuitForm): Promise<boolean> => {
    try {
      await api.patch(`/circuits/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return true;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const deleteCircuit = createAsyncThunk(
  'admin/deleteCircuit',
  async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/circuits/${id}`);

      return true;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

const adminReducer = createReducer(intialState, (builder) => {
  builder
    .addCase(createCircuit.pending, (state) => {
      state.loading = true;
    })
    .addCase(createCircuit.fulfilled, (state) => {
      toast('Circuit ajouté !');
      state.loading = false;
    })
    .addCase(createCircuit.rejected, (state) => {
      toast("Echec de l'ajout de circuit");
      state.loading = false;
    })
    .addCase(patchCircuit.pending, (state) => {
      state.loading = true;
    })
    .addCase(patchCircuit.fulfilled, (state) => {
      toast('Circuit modifié !');
      state.loading = false;
    })
    .addCase(patchCircuit.rejected, (state) => {
      toast('Echec de la modification de ce circuit');
      state.loading = false;
    })
    .addCase(deleteCircuit.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteCircuit.fulfilled, (state) => {
      toast('Circuit supprimé !');
      state.loading = false;
    })
    .addCase(deleteCircuit.rejected, (state) => {
      toast('Echec de la suppression de ce circuit');
      state.loading = false;
    });
});

export default adminReducer;
