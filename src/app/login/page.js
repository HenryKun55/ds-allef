'use client';

import { Button, Label, TextInput } from 'flowbite-react';
import { useLoginMutation } from '../../api/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const { replace } = useRouter()
  const [login, { isLoading }] = useLoginMutation()
  const [error, setError] = useState('')

  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    login(data).unwrap().then((response) => {
      if(response.user.type === 'student')
      replace('/estudante')
      else replace('/professor')
    }).catch(error => {
      setError(error.data.message)
    })
  }

  return (
    <div class="h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div class="px-10 mx-auto w-full">
        <h1 class="font-bold text-center text-2xl mb-5 text-black">
          Digital Schedule
        </h1>
        <form className="flex max-w-md mx-auto flex-col gap-4 px-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                value="Seu e-mail"
              />
            </div>
            <TextInput
              id="email"
              placeholder="nome@email.com"
              required
              type="email"
              {...register('email')}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="Sua senha"
              />
            </div>
            <TextInput
              id="password"
              required
              type="password"
              {...register('password')}
            />
          </div>
          <Button type="submit" isProcessing={isLoading}>
            Login
          </Button>
          {error && <span className='text-red-500 font-bold'>{error}</span>}
        </form>
      </div>
    </div>
  );
}
