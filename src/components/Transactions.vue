<template>
  <v-card style="width: 100%">
    <v-card-title>
      <span class="pr-3">Transactions for {{ months[currentMonth].name }} - {{ currentYear }}</span>
      <v-btn icon class="pr-2" v-on:click="gotoMonth(-1)">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn icon class="pr-2" v-on:click="gotoCurrentMonth">
        <v-icon>today</v-icon>
      </v-btn>
      <v-btn icon class="pr-2" v-on:click="gotoMonth(1)">
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="items"
      v-bind:search="search"
      item-key="_id"
    >
      <template slot="items" slot-scope="props">
        <div>
          <tr>
            <td>
              <v-edit-dialog>
                {{ props.item.transactionDate }}
                <v-text-field
                  slot="input"
                  label="Edit"
                  v-model="props.item.transactionDate"
                  single-line
                ></v-text-field>
              </v-edit-dialog>
            </td>
            <td class="text-xs-left">{{ props.item.transactionType }}</td>
            <td
              class="text-xs-left"
              @click="props.expand = !props.expand"
            >{{ props.item.description }}</td>
            <td class="text-xs-right">{{ props.item.charge }}</td>
            <td class="text-xs-right">{{ props.item.deposit }}</td>
            <td class="text-xs-right">{{ props.item.balance }}</td>
          </tr>
        </div>
      </template>

      <template slot="expand" slot-scope="props">
        <div>
          <v-card class="pl-5">
            <v-card-text class="text-xs-left">
              <v-text-field label="Note" v-model="props.item.notes"></v-text-field>
            </v-card-text>
          </v-card>
        </div>
      </template>

      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        <div>From {{ pageStart }} to {{ pageStop }}</div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      months: [
        { name: 'Zero', abrev: 'ZZZ', index: '0' },
        { name: 'January', abrev: 'Jan', index: '1' },
        { name: 'February', abrev: 'Feb', index: '2' },
        { name: 'March', abrev: 'Mar', index: '3' },
        { name: 'April', abrev: 'Apr', index: '4' },
        { name: 'May', abrev: 'May', index: '5' },
        { name: 'June', abrev: 'Jun', index: '6' },
        { name: 'July', abrev: 'Jul', index: '7' },
        { name: 'August', abrev: 'Aug', index: '8' },
        { name: 'September', abrev: 'Sep', index: '9' },
        { name: 'October', abrev: 'Oct', index: '10' },
        { name: 'November', abrev: 'Nov', index: '11' },
        { name: 'December', abrev: 'Dec', index: '12' }
      ],
      currentMonth: 12,
      currentYear: 2019,
      balanceCharges: 0,
      balanceDeposits: 0,
      maxChars: (v) => v.length < 25 || 'Input too Long!',
      search: '',
      pagination: {},
      headers: [
        { text: 'Date', align: 'center', sortable: false, value: 'date' },
        { text: 'Type', align: 'center', sortable: false, value: 'type' },
        { text: 'Description', align: 'center', sortable: false, value: 'description' },
        { text: 'Charge (-)', align: 'center', sortable: false, value: 'charge' },
        { text: 'Deposit (+)', align: 'center', sortable: false, value: 'deposit' },
        { text: 'Balance', align: 'center', sortable: false, value: 'balance' }
      ],
      items: [
        {
          '_id': '5deaac62e94b3f80383bf3e9',
          'transactionDate': 'May-2015',
          'transactionType': 'Opening Balance',
          'description': 'Equity line initial opening balance',
          'charge': 12378,
          'deposit': 0,
          'notes': '',
          'userId': '5deaa7dccdfc9a438c4d1a94'
        },
        {
          '_id': '5deab421e94b3f80383e6c5a',
          'transactionDate': '2019-10-14',
          'transactionType': 'Credit Card',
          'description': 'Amazon Purchase',
          'charge': 23.45,
          'deposit': 0,
          'notes': '',
          'userId': '5deaa7dccdfc9a438c4d1a94'
        },
        {
          '_id': '5deab4dde94b3f80383ea6f4',
          'transactionDate': '1974-12-17',
          'transactionType': 'Phone Pe',
          'description': 'Kengeri Bakers Hub',
          'charge': 575,
          'deposit': 0,
          'notes': '',
          'userId': '5de67475e94b3f803815ff21'
        },
        {
          '_id': '5deab4f3e94b3f80383ead90',
          'transactionDate': '2019-09-07',
          'transactionType': 'Rewards',
          'description': 'Cashback for shopping at Dmart',
          'charge': 0,
          'deposit': 55.08,
          'notes': '',
          'userId': '5de67475e94b3f803815ff21'
        },
        {
          '_id': '5deab509e94b3f80383eb5ec',
          'transactionDate': '2019-09-07',
          'transactionType': 'Debit Card',
          'description': 'Shopping at Dmart',
          'charge': 5508,
          'deposit': 0,
          'notes': '',
          'userId': '5de67475e94b3f803815ff21'
        },
        {
          '_id': '5deab538e94b3f80383ec46e',
          'transactionDate': '2019-09-05',
          'transactionType': 'Google Pay',
          'description': 'Paid to Kumar Kamalakar. Notes: House Rent',
          'charge': 6500,
          'deposit': 0,
          'notes': '',
          'userId': '5deab38ce94b3f80383e3861'
        },
        {
          '_id': '5deab545e94b3f80383ec7ea',
          'transactionDate': '2019-08-24',
          'transactionType': 'Reward',
          'description': 'Mobikwik Joining Rewards',
          'charge': 0,
          'deposit': 100,
          'notes': '',
          'userId': '5deab38ce94b3f80383e3861'
        },
        {
          '_id': '5deab571e94b3f80383ed623',
          'transactionDate': '2019-06-07',
          'transactionType': 'Amazon Pay',
          'description': 'Shopping at Amazon',
          'charge': 1199,
          'deposit': 0,
          'notes': '',
          'userId': '5deaa7dccdfc9a438c4d1a94'
        },
        {
          '_id': '5deab57ce94b3f80383ed962',
          'transactionDate': '2019-06-07',
          'transactionType': 'Cash Back',
          'description': 'Amazon Pay Cash Back',
          'charge': 0,
          'deposit': 119.9,
          'notes': '',
          'userId': '5deaa7dccdfc9a438c4d1a94'
        },
        {
          '_id': '5deab586e94b3f80383edcb5',
          'transactionDate': '2019-09-16',
          'transactionType': 'Paytm',
          'description': 'Paid to Kengeri Backers Den',
          'charge': 1000,
          'deposit': 0,
          'notes': '',
          'userId': '5deaa7dccdfc9a438c4d1a94'
        }
      ]
    }
  },
  methods: {
    getTransactionsByMonth: function () {
    },
    getPreviousMonthsBalances: function () { },
    mapTransaction: function (tx) {
      const me = this
      const transDate = new Date(tx.transactionDate)
      let transaction = {
        transactionDate: me.months[transDate.getUTCMonth() + 1].abrev + '-' + transDate.getFullYear(),
        transactionType: tx.transactionType,
        description: tx.description,
        charge: me.moneyFormatter(tx.charge),
        deposit: me.moneyFormatter(tx.deposit),
        balance: me.moneyFormatter(tx.calcRunningBalance(tx))
      }
      return transaction
    },
    moneyFormatter: function (amount) {
      let formtter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })
      return formtter.format(amount)
    },
    calcRunningBalance: function (tx) {
      if (tx && tx.charge > 0) { this.balanceCharges += tx.charge } else if (tx && tx.deposit > 0) {
        this.balanceDeposits += tx.deposit
      }
      return this.balanceCharges - this.balanceDeposits
    },
    gotoMonth: function (increment) { },
    gotoCurrentMonth: function () { }
  }
}
</script>

<style lang='scss' scoped>
</style>
