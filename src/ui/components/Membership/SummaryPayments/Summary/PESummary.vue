<template>
  <div class="pe-flex pe-justify-center">
    <div class="pe-overflow-auto">
      <PEMembershipSummary>
        <template #header>
          <PETableRow header>
            <PETableColumn>Concept</PETableColumn>
            <PETableColumn text-align="right">Paid</PETableColumn>
            <PETableColumn text-align="right">Due</PETableColumn>
            <PETableColumn text-align="right">Total</PETableColumn>
          </PETableRow>
        </template>

        <template #body>
          <PETableRow>
            <PETableColumn><span class="pe-capitalize">Downpayment</span></PETableColumn>
            <PETableColumn text-align="right"
              >{{ balance.paidDownpayment | currency }} {{ currencylabel }}</PETableColumn
            >
            <PETableColumn text-align="right"
              >{{ balance.dueDownpayment | currency }} {{ currencylabel }}</PETableColumn
            >
            <PETableColumn text-align="right"
              >{{ balance.totalDownpayment | currency }} {{ currencylabel }}</PETableColumn
            >
          </PETableRow>

          <PETableRow>
            <PETableColumn><span class="pe-capitalize">Financing Membership</span></PETableColumn>
            <PETableColumn text-align="right">
              <p>{{ balance.paidFinanciedMembership | currency }} {{ currencylabel }}</p>
              <p class="pe-text-[12px]">
                ({{ balance.paidMonthlyPayments }} monthly payments out of
                {{ balance.totalMonthlyPayments }})
              </p>
            </PETableColumn>
            <PETableColumn text-align="right">
              <p>{{ balance.dueFinanciedMembership | currency }} {{ currencylabel }}</p>
              <p class="pe-text-[12px]">
                ({{ balance.remainingMonthlyPayments }} monthly payments remaining)
              </p>
            </PETableColumn>
            <PETableColumn text-align="right"
              >{{ balance.totalFinanciedMembership | currency }} {{ currencylabel }}</PETableColumn
            >
          </PETableRow>

          <PETableRow>
            <PETableColumn></PETableColumn>
            <PETableColumn text-align="right"
              >{{ balance.paidTotal | currency }} {{ currencylabel }}</PETableColumn
            >
            <PETableColumn text-align="right"
              >{{ balance.dueTotal | currency }} {{ currencylabel }}</PETableColumn
            >
            <PETableColumn
              text-align="right"
              class="bg-blue-light text-black"
            >
              <p class="pe-font-semibold pe-uppercase pe-text-black">
                {{ balance.membershipValue | currency }} {{ currencylabel }}
              </p>
              <p class="pe-font-semibold pe-uppercase">Membership Value</p>
            </PETableColumn>
          </PETableRow>
        </template>
      </PEMembershipSummary>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import {Prop, Vue} from 'vue-property-decorator'
import {BalanceEntity} from '~/src/app/balance/domain/entities/balanceEntity'

@Component({
  name: 'PESummary',
  components: {}
})
export default class Summary extends Vue {
  @Prop() balance!: BalanceEntity

  @Prop({default: 'USD'}) currencylabel!: string
}
</script>

<style scoped></style>
