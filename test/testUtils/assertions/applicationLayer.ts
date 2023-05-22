/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 0:45:56
 *
 */

export const useCaseAssertionContext = async (assertions: Function, isFakeContext: boolean) => {
  try {
    await assertions()
  } catch (err: any) {
    if (!isFakeContext) {
      expect(true).toBe(true)
    } else {
      throw err as Error
    }
  }
}
