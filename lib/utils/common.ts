export const removeOverflowHiddenBody = () => {
  const body = document.body as HTMLBodyElement
  body.classList.remove('overflow-hidden')
}

export const addOverflowHiddenBody = (pr = '') => {
  const body = document.body as HTMLBodyElement
  body.classList.add('overflow-hidden')

  pr && (body.style.paddingRight = pr)
}

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}
