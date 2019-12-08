<template>
  <div>
    <v-btn bottom color="orange" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-5">New Transaction</v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-menu
                ref="datePicker"
                :close-on-content-click="false"
                v-model="transactionDatePicker"
                transition="scale-transition"
                offset-y
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  prepend-icon="event"
                  label="Select Transaction Date"
                  v-model="transaction.transactionDate"
                  readonly
                />
                <v-date-picker
                  v-model="transaction.transactionDate"
                  v-on:input="$refs.datePicker.save(transaction.transactionDate)"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-select
                prepend-icon="credit_card"
                v-bind:items="transactionTypes"
                label="Transaction Type"
                v-model="transaction.transactionType"
                single-line
                bottom
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="description"
                placeholder="Description"
                v-model="transaction.description"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="add_circle"
                placeholder="Deposit (+)"
                v-model="transaction.deposit"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="remove_circle"
                placeholder="Charge (-)"
                v-model="transaction.charge"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="notes" placeholder="Notes" v-model="transaction.notes" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <!-- <v-btn text color="primary">More</v-btn> -->
          <v-spacer />
          <v-btn text color="danger" @click="dialog = false">Cancel</v-btn>
          <v-btn
            text
            color="primary"
            @click="saveTransaction"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditTransaction',
  data: () => ({
    dialog: false,
    transaction: {
      id: null,
      transactionDate: null,
      transactionType: null,
      description: '',
      notes: '',
      charge: 0.0,
      deposit: 0.0
    },
    transactionTypes: [
      {
        text: 'Opening Balance',
        value: 'Opening Balance'
      },
      {
        text: 'Credit Card',
        value: 'Credit Card'
      },
      {
        text: 'Debit Card',
        value: 'Debit Card'
      },
      {
        text: 'Internet Banking',
        value: 'IMPS'
      },
      {
        text: 'Paytm',
        value: 'Paytm'
      },
      {
        text: 'Amazon Pay',
        value: 'Amazon Pay'
      },
      {
        text: 'Phone Pe',
        value: 'Phone Pe'
      },
      {
        text: 'Google Pay',
        value: 'Google Pay'
      },
      {
        text: 'Rewards',
        value: 'Rewards'
      },
      {
        text: 'Cask Back',
        value: 'Cask Back'
      }
    ],
    transactionDatePicker: false
  }),
  methods: {
    saveTransaction: function () {
      console.log('Save Transaction Records')

      // TODO: VueX actions are to be added

      this.dialog = false
    },
    showEditTransactionDialog: function () {

      // this.transaction.transactionDate = thi

    },
    getCurrentDate: function () {
      const dt = new Date(Date.now())
      let month = '' + (dt.getMonth() + 1)
      let day = '' + dt.getDate()
      const year = dt.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
