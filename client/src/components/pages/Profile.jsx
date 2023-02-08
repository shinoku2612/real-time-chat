import React, { useEffect } from 'react';
import ProfileAvatar from '../profile/profile-avatar/ProfileAvatar';
import ProfileInformation from '../profile/profile-information/ProfileInformation';
import { useDispatch, useSelector } from 'react-redux';
import { resetStatus } from '../../store/authen-slice';
import { getStatus } from '../../store/selectors';
import withToast from '../../hoc/withToast';

const Profile = withToast(({ toast }) => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);

  useEffect(() => {
    if (status === 'update-user/success') {
      toast.addToast({
        message: 'Update successfully!',
      });
      dispatch(resetStatus());
    }
    if (status === 'update-user/failed') {
      toast.addToast({
        message: 'Update failed, try again!',
        type: 'error',
      });
      dispatch(resetStatus());
    }
  }, [status, toast, dispatch]);

  return (
    <div className="format-page-size flex py-2 gap-x-2">
      <ProfileAvatar />
      <ProfileInformation />
    </div>
  );
});

export default Profile;
