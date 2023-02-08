import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import withUpdateUser from '../../../hoc/withUpdateUser';
import {
  InputInformation,
  RadioInputInformation,
  TextAreaInformation,
} from '../profile-input/ProfileInput';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/selectors';
import {
  UilUser,
  UilFont,
  UilUsersAlt,
  UilSignRight,
  UilCalender,
} from '@iconscout/react-unicons';
import { checkInputIsValid, formatDate } from '../../../utils/helper';
import { validateEmpty } from '../../../utils/validate';

const LIST_GENDER = [
  { title: 'Nam', value: 'male' },
  { title: 'Nữ', value: 'female' },
  { title: 'Khác', value: 'other' },
];

const BasicInformation = ({ isUpdate }, ref) => {
  const user = useSelector(getUser);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const biographyRef = useRef();
  const birthdayRef = useRef();
  const genderRef = useRef();
  const addressRef = useRef();

  const colorIcon = 'text-slate-400';

  useImperativeHandle(ref, () => ({
    userData: {
      firstNameRef,
      lastNameRef,
      biographyRef,
      birthdayRef,
      genderRef,
      addressRef,
    },
    setDefaultValue() {
      firstNameRef.current.setValue(user.firstName);
      lastNameRef.current.setValue(user.lastName);
      birthdayRef.current.setValue(formatDate(user.dob));
      biographyRef.current.setValue(user.slogan);
      addressRef.current.setValue(user.address);
      genderRef.current.setValue(user.gender);
    },
    checkValid() {
      return checkInputIsValid(
        firstNameRef,
        lastNameRef,
        birthdayRef,
        biographyRef,
        addressRef,
        genderRef,
      );
    },
    focus() {
      firstNameRef.current.focus();
    },
  }));

  return (
    <div className="flex flex-col gap-y-2 items-center w-full">
      <InputInformation
        ref={firstNameRef}
        readOnly={!isUpdate}
        title="First name"
        icon={<UilUser className={colorIcon} />}
        validateFunction={validateEmpty}
        errorText="First name must not empty!"
      />
      <InputInformation
        ref={lastNameRef}
        readOnly={!isUpdate}
        title="Last name"
        icon={<UilUser className={colorIcon} />}
        validateFunction={validateEmpty}
        errorText="Last name must not empty!"
      />
      <InputInformation
        ref={birthdayRef}
        readOnly={!isUpdate}
        type="date"
        validateFunction={validateEmpty}
        errorText="Birthday must not empty!"
        title="Day of birth"
        icon={<UilCalender className={colorIcon} />}
      />
      <InputInformation
        ref={biographyRef}
        readOnly={!isUpdate}
        title="biography"
        icon={<UilFont className={colorIcon} />}
      />
      <RadioInputInformation
        ref={genderRef}
        readOnly={!isUpdate}
        list={LIST_GENDER}
        title="Giới tính"
        icon={<UilUsersAlt className={colorIcon} />}
      />
      <TextAreaInformation
        ref={addressRef}
        readOnly={!isUpdate}
        rows={2}
        title="Address"
        icon={<UilSignRight className={colorIcon} />}
      />
    </div>
  );
};

export default withUpdateUser(
  forwardRef(BasicInformation),
  'Basic Information',
);
