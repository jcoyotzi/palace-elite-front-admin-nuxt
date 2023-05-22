/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 21 0:36:44
 *
 */

import 'reflect-metadata'
import RulesServiceRepository from '~/src/app/bookingBenefits/domain/repositories/rules/EliteProductServiceRepository'
import {
  formatPolicyToEvaluate,
  paidGolfPolicyWeeks,
  freeGolfPolicyWeeks,
  allInclusivePolicyWeeks,
  freeGolfPolicyNights,
  paidGolfPolicyNights
} from '~/src/app/bookingBenefits/domain/policies/GolfPolicie'
import {EliteProductFact} from '~/src/app/bookingBenefits/domain/entities/rules/EliteProductRuleEntity'
import {BookingCategoryStatus} from '~/src/app/bookings/domain/enums/bookingCategoryStatus'

describe('paidGolfPolicyWeeks', () => {
  it('should return week golf with pay', async () => {
    const repo = new RulesServiceRepository()
    const fact: EliteProductFact = {
      hotel: 'MPS',
      reserveType: BookingCategoryStatus.PREFERENCIAL,
      AIWK: 100,
      ULGAPWK: 10,
      ULGHFWK: 100,
      AING: 10,
      ULGAPNG: 100,
      ULGHFNG: 10,
      travelWithBeneficiary: false,
      selectedGolfOption: true,
      nights: 10
    }

    const data = await repo.evaluate(formatPolicyToEvaluate(paidGolfPolicyWeeks, fact))
    expect(data.events?.compliance).toBe(true)
    expect(data.events?.code).toBe('ULGAPWK')
  })
})
describe('freeGolfPolicyWeeks', () => {
  it('should return free golf', async () => {
    const repo = new RulesServiceRepository()
    const golfFact: EliteProductFact = {
      hotel: 'MPS',
      reserveType: BookingCategoryStatus.INCENTIVA,
      AIWK: 100,
      ULGAPWK: 10,
      ULGHFWK: 100,
      AING: 10,
      ULGAPNG: 100,
      ULGHFNG: 10,
      travelWithBeneficiary: true,
      selectedGolfOption: true,
      nights: 10
    }
    const data = await repo.evaluate(formatPolicyToEvaluate(freeGolfPolicyWeeks, golfFact))
    expect(data.events?.compliance).toBe(true)

    expect(data.events?.code).toBe('ULGHFWK')
  })
})

describe('All inclusive', () => {
  it('should return all inclusive weeks', async () => {
    const repo = new RulesServiceRepository()
    const golfFact: EliteProductFact = {
      hotel: 'CZ',
      reserveType: BookingCategoryStatus.INCENTIVA,
      AIWK: 100,
      ULGAPWK: 10,
      ULGHFWK: 100,
      AING: 10,
      ULGAPNG: 100,
      ULGHFNG: 10,
      travelWithBeneficiary: true,
      selectedGolfOption: true,
      nights: 10
    }
    const data = await repo.evaluate(formatPolicyToEvaluate(allInclusivePolicyWeeks, golfFact))
    expect(data.events?.compliance).toBe(true)
    expect(data.events?.code).toBe('AIWK')
  })

it('should return all inclusive weeks on preferencial', async () => {
  const repo = new RulesServiceRepository()
  const golfFact: EliteProductFact = {
    hotel: 'MPS',
    reserveType: BookingCategoryStatus.PREFERENCIAL,
    AIWK: 156,
    ULGAPWK: 0,
    ULGHFWK: 0,
    AING: 94,
    ULGAPNG: 0,
    ULGHFNG: 0,
    travelWithBeneficiary: true,
    selectedGolfOption: true,
    nights: 7
  }
  const data = await repo.evaluate(formatPolicyToEvaluate(allInclusivePolicyWeeks, golfFact))
  expect(data.events?.compliance).toBe(true)
  expect(data.events?.code).toBe('AIWK')
})

})

describe('only golf options', () => {

  it("should not return golf since it's not available", async () => {
    const repo = new RulesServiceRepository()
    const golfFact: EliteProductFact = {
      hotel: 'BP',
      reserveType: BookingCategoryStatus.PREFERENCIAL,
      AIWK: 100,
      ULGAPWK: 0,
      ULGHFWK: 0,
      AING: 10,
      ULGAPNG: 100,
      ULGHFNG: 10,
      travelWithBeneficiary: false,
      selectedGolfOption: false,
      nights: 10
    }
    const data = await repo.evaluate(
      formatPolicyToEvaluate([paidGolfPolicyWeeks, freeGolfPolicyWeeks], golfFact)
    )
    expect(data.events?.compliance).toBe(undefined)
    expect(data.events?.code).toBe(undefined)
  })
})

describe('night golf', async () => {
  it('should return night golf', async () => {
    const repo = new RulesServiceRepository()
    const golfFact: EliteProductFact = {
      AIWK: 100,
      ULGAPWK: 10,
      ULGHFWK: 100,
      AING: 10,
      ULGAPNG: 100,
      ULGHFNG: 10,
      hotel: 'BP',
      nights: 7,
      reserveType: 'PREFERENCIAL',
      selectedGolfOption: false,
      travelWithBeneficiary: true
    }
    const data = await repo.evaluate(
      formatPolicyToEvaluate([paidGolfPolicyWeeks, freeGolfPolicyWeeks], golfFact)
    )
    expect(data.events?.compliance).toBe(true)
  })
    it('should return freeGolfPolicyNights', async () => {
      const repo = new RulesServiceRepository()
      const golfFact: EliteProductFact = {
        hotel: 'BP',
        reserveType: BookingCategoryStatus.PREFERENCIAL,
        AIWK: 100,
        ULGAPWK: 11,
        ULGHFWK: 100,
        AING: 16,
        ULGAPNG: 100,
        ULGHFNG: 100,
        travelWithBeneficiary: true,
        selectedGolfOption: true,
        nights: 10
      }
      const data = await repo.evaluate(
        formatPolicyToEvaluate([paidGolfPolicyNights, freeGolfPolicyNights], golfFact)
      )
      expect(data.events?.compliance).toBe(true)
    })
})

describe('all options', () => {
  it('should return all options', async () => {
    const repo = new RulesServiceRepository()
    const golfFact: EliteProductFact = {
      hotel: 'MPS',
      reserveType: BookingCategoryStatus.INCENTIVA,
      AIWK: 100,
      ULGAPWK: 10,
      ULGHFWK: 100,
      AING: 10,
      ULGAPNG: 100,
      ULGHFNG: 10,
      travelWithBeneficiary: true,
      selectedGolfOption: true,
      nights: 10
    }
    const data = await repo.evaluate(
      formatPolicyToEvaluate(
        [paidGolfPolicyWeeks, freeGolfPolicyWeeks, allInclusivePolicyWeeks],
        golfFact
      )
    )
    expect(data.events?.compliance).toBe(true)
    expect(data.events?.code).toBe('AIWK')
  })
  it('should return ULGW', async () => {
    const repo = new RulesServiceRepository()
    const golfFact: EliteProductFact = {
      hotel: 'MPS',
      reserveType: BookingCategoryStatus.INCENTIVA,
      AIWK: 100,
      ULGAPWK: 10,
      ULGHFWK: 100,
      AING: 10,
      ULGAPNG: 100,
      ULGHFNG: 10,
      travelWithBeneficiary: true,
      selectedGolfOption: true,
      nights: 10
    }
    const data = await repo.evaluate(
      formatPolicyToEvaluate(
        [paidGolfPolicyWeeks, freeGolfPolicyWeeks, allInclusivePolicyWeeks],
        golfFact
      )
    )
    expect(data.events?.compliance).toBe(true)
    expect(data.events?.code).toBe('AIWK')
  })
  it('should return paid golf', async () => {
    const repo = new RulesServiceRepository()
    const golfFact: EliteProductFact = {
      hotel: 'MPS',
      reserveType: BookingCategoryStatus.INCENTIVA,
      AIWK: 100,
      ULGAPWK: 10,
      ULGHFWK: 100,
      AING: 10,
      ULGAPNG: 100,
      ULGHFNG: 10,
      travelWithBeneficiary: true,
      selectedGolfOption: true,
      nights: 10
    }
    const data = await repo.evaluate(
      formatPolicyToEvaluate(
        [paidGolfPolicyWeeks, freeGolfPolicyWeeks, allInclusivePolicyWeeks],
        golfFact
      )
    )
    expect(data.events?.compliance).toBe(true)
    expect(data.events?.code).toBe('AIWK')
  })
})
