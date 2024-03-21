import { IInputs, ISignUpFx } from '@/types/authPopup'
import { EventCallable, Store } from 'effector'
import { useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'

const useAuthForm = (
  initialSpinner: Store<boolean>,
  isSideActive: boolean,
  event: EventCallable<ISignUpFx>
) => {
  const spinner = useUnit(initialSpinner)
  // const { isConnected, user, connectWithPopup } = useEarthoOne()

  const handleSignupWithOAuth = () => ''

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IInputs>()

  return {
    spinner,
    register,
    errors,
    handleSubmit,
    handleSignupWithOAuth,
  }
}

export { useAuthForm }
