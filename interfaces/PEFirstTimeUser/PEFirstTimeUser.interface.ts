enum Steps {
  FIRST_STEP,
  SECOND_STEP,
  THIRD_STEP,
  LAST_STEP
}

interface FirstTimeUser {
  title?: string
  step: Steps
  loading?: boolean
  externalErrorMessage?: string
}

export {Steps, FirstTimeUser}
