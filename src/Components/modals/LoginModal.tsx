import { useCallback, useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLoginModal, useRegisterModal } from '../../hooks';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { api } from '../../api';
import toast from 'react-hot-toast';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../Input';
import Modal from './Modal';
import { apiURLs } from '../../api';
import { UserContext } from '../../Contexts';
import { useLockBody } from '../../hooks/useLockBoody';

export const LoginModal = () => {
  useLockBody();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const toogle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }

  const { setUser } = userContext;

  const googleAuth = () => {
    // window.open(`${apiURLs["production"]}/auth/google/callback`, "_self");
    window.open(`${apiURLs['development']}/auth/google/callback`, '_self');
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await api.post('/login', data);
      console.log(response);
      setIsLoading(true);
      setUser(response.data);
      toast.success('Usuario logado');
      loginModal.onClose();
      window.location.reload();
    } catch (err) {
      toast.error('Algo deu errado');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Senha"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue com google" icon={FcGoogle} onClick={googleAuth} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Primeira vez usando nosso app?</div>
          <div
            onClick={toogle}
            className="text-neutral-900 cursor-pointer hover:underline"
          >
            Crie uma conta
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        title="Login"
        actionLabel={isLoading ? 'Fazendo login...' : 'Continue'}
        onClose={loginModal.onClose}
        isOpen={loginModal.isOpen}
        disabled={isLoading}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default LoginModal;
