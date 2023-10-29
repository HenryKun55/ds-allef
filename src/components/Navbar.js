'use client';

import { Button, Navbar as NavbarFlowbite } from 'flowbite-react';
import { logout } from '../store/auth/slice';
import { useAppDispatch } from '../store';
import { useRouter } from 'next/navigation';

export function Navbar({ type }) {
  const { replace } = useRouter();
  const dispatch = useAppDispatch()

  const menu = [
    {
      label: 'Atividades',
      path: `${type}/atividades`,
    },
    {
      label: 'Horários',
      path: `${type}/horarios`
    },
    {
      label: 'Eventos',
      path: `${type}/eventos`
    }
  ]

  const handleLogout = () => {
    dispatch(logout())
    replace('/login')
  }

  return (
    <NavbarFlowbite fluid rounded>
      <NavbarFlowbite.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white">Digital Schedule</span>
      </NavbarFlowbite.Brand>
      <NavbarFlowbite.Collapse>
        {menu.map(item => (
          <NavbarFlowbite.Link key={item.path} href={item.path}>{item.label}</NavbarFlowbite.Link>
        ))}
      </NavbarFlowbite.Collapse>
      <div className="flex md:order-2">
        <Button onClick={handleLogout}>Sair</Button>
        <NavbarFlowbite.Toggle />
      </div>
    </NavbarFlowbite>)
}

