import { useLang } from '@/hooks/useLang'
import { IAuthSideProps, IInputs } from '@/types/authPopup'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AuthPopupClose } from './AuthPopupClose'
import { useAuthForm } from '@/hooks/useAuthForm'
import { singUpFx } from '@/api/auth'
import { handleSignUp } from '@/context/auth'
import { NameInput } from './NameInput'
import { EmailInput } from './EmailInput'
import PasswordInput from './PasswordInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthPopupSocials } from './AuthPopupSocials'

const AuthPopupRegistration = ({
  toggleAuth,
  isSideActive,
}: IAuthSideProps) => {
  const { lang, translations } = useLang()

  const { errors, handleSubmit, register, spinner, handleSignupWithOAuth } =
    useAuthForm(singUpFx.pending, isSideActive, handleSignUp)

  const submitForm = (data: IInputs) => {
    handleSignUp({
      email: data.email,
      password: data.password,
      name: data.name,
      isOAuth: false,
    })
  }

  return (
    <div className='card-front'>
      <AuthPopupClose />

      <div className='card-body wow-bg'>
        <h3 className='card-body__title'>
          {translations[lang].auth_popup.registration_title}
        </h3>

        <p className='card-body__description'>
          {translations[lang].auth_popup.registration_description}
        </p>

        <form onSubmit={handleSubmit(submitForm)}>
          <NameInput register={register} errors={errors} />
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />

          <div className='card-body__inner'>
            <div className='inner__top'>
              <button className='inner__btn' type='submit' disabled={spinner}>
                {spinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  translations[lang].auth_popup.registration_text
                )}
              </button>
            </div>
            <div className='inner__bottom'>
              <span className='inner__bottom__text'>
                {translations[lang].auth_popup.registration_question}
              </span>

              <button
                type='button'
                className='btn-reset inner__switch'
                onClick={toggleAuth}
              >
                {translations[lang].auth_popup.login_text}!
              </button>
            </div>
          </div>
        </form>

        <AuthPopupSocials handleSignupWithOAuth={handleSignupWithOAuth} />
      </div>
    </div>
  )
}

export { AuthPopupRegistration }
