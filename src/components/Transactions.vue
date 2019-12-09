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
  computed: {
    currentMonth () {
      return this.$store.state.transactions.currentMonth
    },
    currentYear () {
      return this.$store.state.transactions.currentYear
    },
    months () {
      return this.$store.state.transactions.months
    },
    items () {
      return this.$store.getters.transactionsByMonth
    },
    balanceCharges () {
      return this.$store.getters.balanceCharges
    },
    balanceDeposits () {
      return this.$store.getters.balanceDeposits
    }
  },
  data () {
    return {
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
      ]
    }
  },
  methods: {
    getTransactionsByMonth: function () {
      this.$store.dispatch('getTransactionByMonth')
    },
    getPreviousMonthsBalances: function () {
      this.$store.dispatch('getPreviousMonthsBalances')
    },
    gotoMonth: function (increment) {
      this.$store.dispatch('gotoMonth').then(() => {
        this.getPreviousMonthsBalances()
        this.getTransactionsByMonth()
      })
    },
    gotoCurrentMonth: function () {
      this.$store.dispatch('gotoCurrentMonth').then(() => {
        this.getPreviousMonthsBalances()
        this.getTransactionsByMonth()
      })
    }
  },
  mounted: async function () {
    await this.getPreviousMonthsBalances()
    await console.log(this.balanceCharges)
    await console.log(this.balanceDeposits)
    await this.getTransactionsByMonth()
  }
}
</script>

<style lang='scss' scoped>
</style>
