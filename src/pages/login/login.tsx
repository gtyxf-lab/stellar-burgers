import { Preloader } from '@ui';
import { LoginUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { loginUser } from '../../services/slices/user.slice';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isLoading) return <Preloader />;

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
