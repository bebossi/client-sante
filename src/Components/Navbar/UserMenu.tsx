import { AiOutlineMenu } from 'react-icons/ai';
import { useState, useCallback, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRegisterModal, useLoginModal } from '../../hooks';
import MenuItem from './MenuItem';
import Avatar from '../Avatar';
import { UserContext } from '../../Contexts';
import { api } from '../../api';

const UserMenu = () => {
  const navigate = useNavigate();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext || { user: null, setUser: () => {} };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  useEffect(() => {}, [user]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          data-cy="menu"
          onClick={() => {
            navigate('/menu');
            setIsOpen(false);
          }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Cardápio
        </div>
        <div
          onClick={() => {
            navigate('/menuu');
            setIsOpen(false);
          }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Quem somos
        </div>
        <div
          onClick={() => {
            navigate('/map');
            setIsOpen(false);
          }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Dúvidas
        </div>
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Contato
        </div>
        <div
          data-cy="userMenu"
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block ">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:vw-3/4 bg-white overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer">
            {((user && user.role === 'guest') || !user) && (
              <>
                <MenuItem
                  data-cy="entre"
                  onClick={loginModal.onOpen}
                  label="Entre"
                />
                <MenuItem
                  data-cy="cadastre"
                  onClick={registerModal.onOpen}
                  label="Cadastre"
                />
                <MenuItem
                  data-cy="menu"
                  onClick={() => {
                    navigate('/menu');
                    toggleOpen();
                  }}
                  label="Cardápio"
                />
                <MenuItem
                  onClick={() => {
                    navigate('/menuu');
                    toggleOpen();
                  }}
                  label="Quem somos"
                />
                <MenuItem
                  onClick={() => {
                    navigate('/doubts');
                    toggleOpen();
                  }}
                  label="Dúvidas"
                />
                <MenuItem
                  onClick={() => {
                    navigate('/contact');
                    toggleOpen();
                  }}
                  label="Contato"
                />
              </>
            )}
            {user && user.role === 'admin' && (
              <>
                <MenuItem
                  data-cy="menu"
                  onClick={() => {
                    navigate('/menu');
                    toggleOpen();
                  }}
                  label="Cardápio"
                />
                <MenuItem
                  onClick={() => {
                    navigate('/menuu');
                    toggleOpen();
                  }}
                  label="Quem somos"
                />
                <MenuItem
                  onClick={() => {
                    navigate('/doubts');
                    toggleOpen();
                  }}
                  label="Dúvidas"
                />
                <MenuItem
                  onClick={() => {
                    navigate('/contact');
                    toggleOpen();
                  }}
                  label="Contato"
                />
                <MenuItem
                  onClick={() => {
                    navigate(`/dashboardOverview`);
                    toggleOpen();
                  }}
                  label="Dashboard"
                />
                <MenuItem
                  label="Agendamento"
                  onClick={() => {
                    navigate(`/appointment`);
                    toggleOpen();
                  }}
                />
                <MenuItem onClick={handleLogout} label="Sair" />
              </>
            )}
            {user && user.role === 'user' && (
              <>
                <MenuItem
                  onClick={() => {
                    navigate('/menu');
                    toggleOpen();
                  }}
                  label="Cardápio"
                />
                <MenuItem
                  onClick={() => {
                    navigate('/menuu');
                    toggleOpen();
                  }}
                  label="Quem somos"
                />
                <MenuItem
                  onClick={() => {
                    navigate('/doubts');
                    toggleOpen();
                  }}
                  label="Dúvidas"
                />
                <MenuItem
                  onClick={() => {
                    navigate('/contact');
                    toggleOpen();
                  }}
                  label="Contato"
                />
                <MenuItem
                  onClick={() => {
                    navigate('/orders');
                    toggleOpen();
                  }}
                  label="Pedidos"
                />
                <hr />
                <MenuItem onClick={handleLogout} label="Sair" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
