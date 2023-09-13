import { FcGoogle } from "react-icons/fc";
import { useCallback, useContext, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../Button";
import { api, apiURLs } from "../../api";
import { toast } from "react-hot-toast";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import Input from "../inputs/Input";
import { UserContext } from "../../auth/currentUser";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const googleAuth = () => {
    window.open(`${apiURLs["production"]}/auth/google/callback`, "_self");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
   const response = await api.post("/signup", data);
    setIsLoading(true);
    const token = response.data.token
    localStorage.setItem("token", token)
    setUser(response.data)
    registerModal.onClose();
    toast.success("Usuário registrado e logado com sucesso");
  };

  const toogle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to airbnb" subtitle="Create an account!" />
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
        label="Password"
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
      <Button
        outline
        label="Continue with google"
        icon={FcGoogle}
        onClick={googleAuth}
      />
  
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Já tem uma conta</div>
          <div
            onClick={toogle}
            className="text-neutral-900 cursor-pointer hover:underline"
          >
            Login 
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        isOpen={registerModal.isOpen}
        disabled={isLoading}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
