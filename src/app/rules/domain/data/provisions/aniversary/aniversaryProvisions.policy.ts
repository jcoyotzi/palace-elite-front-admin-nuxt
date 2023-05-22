/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 14 8:50:55
 *
 */

// region To extend RulesEngine
export interface RuleEnginePolicyCondition {
  fact: string
  operator: string
  value: any
  path?: string
}

export interface RuleEnginePolicyEvent {
  type: string
  params: {
    policy: any
  }
}

export interface RuleEnginePolicyConditions {
  all: RuleEnginePolicyCondition []
}

export interface RuleEnginePolicy {
  conditions: RuleEnginePolicyConditions
  event: RuleEnginePolicyEvent
}
// endregion

export const Weeks: RuleEnginePolicy = {
  conditions: {
    all: [
      {
        fact: '',
        // path: '$.nested',
        operator: 'in',
        value: []
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {

      }
    }
  }
};

export const WeeksGolf: RuleEnginePolicy = {
  conditions: {
    all: [
      {
        fact: '',
        // path: '$.nested',
        operator: 'in',
        value: []
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {

      }
    }
  }
};
export const Nigths: RuleEnginePolicy = {
  conditions: {
    all: [
      {
        fact: '',
        // path: '$.nested',
        operator: 'in',
        value: []
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {

      }
    }
  }
};
export const NigthsGolf: RuleEnginePolicy = {
  conditions: {
    all: [
      {
        fact: '',
        // path: '$.nested',
        operator: 'in',
        value: []
      }
    ]
  },
  event: {
    type: 'policy',
    params: {
      policy: {

      }
    }
  }
};
