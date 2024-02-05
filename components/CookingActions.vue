<script setup lang="ts">
import { onMounted } from 'vue';
import { useOperationStore } from '~/store/operation';

const operationStore = useOperationStore()

onMounted(() => {
  operationStore.startOperation()
})

const updateOperation = () => {
  if (operationStore.operation === undefined) {
    operationStore.startOperation()
  } else {
    operationStore.stopOperation()
  }
}
</script>

<template>
  <span class="mb-2">Operation</span>
  <Button class="m-2" @click.prevent="updateOperation">
    {{
      operationStore.operation === undefined ? "Start Cooking" : "Stop Cooking"
    }}
  </Button>
</template>
