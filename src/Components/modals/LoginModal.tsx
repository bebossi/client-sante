import {   useCallback, useContext, useState } from "react"
import { FcGoogle } from "react-icons/fc";
import useLoginModal from "../../hooks/useLoginModal"
import useRegisterModal from "../../hooks/useRegisterModal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { api } from "../../api"
import { AuthContext } from "../../auth/authContext"
import toast from "react-hot-toast"
import Button from "../Button"
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { apiURLs } from "../../api";

const LoginModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const[isLoading, setIsLoading] = useState(false)
  const { setUser, setLoggedInToken } = useContext(AuthContext);
  
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  
   const googleAuth = () => {
     window.open(`${apiURLs["development"]}/auth/google/callback`, "_self");
   };
 
  
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try{
            const response = await api.post("/login", data)
            setIsLoading(true)
            const token = response.data.token
            // localStorage.setItem("token", token)
            // const storedToken = document.cookie.split("=")[1]

            setLoggedInToken(token)
            setUser(response.data)
            toast.success("Usuario logado");
            loginModal.onClose();
        } catch(err){
            console.log(err)
        }
    }

    const toogle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
      }, [loginModal, registerModal]);

     

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
          <Button
            outline
            label="Continue com google"
            icon={FcGoogle}
            onClick={googleAuth}
          />
          {/* <Button
            outline
            label="Continue com gitHub"
            icon={AiFillGithub}
            onClick={googleAuth}
          /> */}
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
        actionLabel="Continue"
        onClose={loginModal.onClose}
        isOpen={loginModal.isOpen}
        disabled={isLoading}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  )
}

export default LoginModal
