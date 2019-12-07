<template>
  <div>
    <h2>Home</h2>
    <transactions></transactions>
    <edit-transactions></edit-transactions>
  </div>
</template>

<script>
import Transactions from './Transactions'
import EditTransactions from './EditTransactions'
export default {
  components: {
    Transactions,
    EditTransactions
  }
}
</script>

<style lang="scss" scoped>
</style>
