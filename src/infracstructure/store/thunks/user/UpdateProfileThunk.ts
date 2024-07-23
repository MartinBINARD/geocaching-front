import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateProfileRequest } from '../../../../core/adapters/requests/user/UpdateProfileRequest';
import { core } from '../../../../core/build';

export const updateProfileThunk = createAsyncThunk(
  'user/update-profile',
  async (req: UpdateProfileRequest) => {
    const result = await core.updateProfile.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
