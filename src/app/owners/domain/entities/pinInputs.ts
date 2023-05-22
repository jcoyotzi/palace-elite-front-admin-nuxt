export interface AddPinInputs {
  nip: number
  nip2: number
}

export interface ChangePinInputs {
  nip: number
  nip2: number
  oldNip: number
}

export interface ResetPinInputs {
  nip: number
  nip2: number
  confirmed: boolean
}

export interface PinInputs
  extends Partial<AddPinInputs>,
    Partial<ChangePinInputs>,
    Partial<ResetPinInputs> {}
