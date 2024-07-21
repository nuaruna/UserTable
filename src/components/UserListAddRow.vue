<script setup lang="ts">
import { computed, ref } from 'vue'
import type { User } from '../interfaces/User'

const props = defineProps<{
  item: User
}>()

const localUser = ref({ ...props.item })
const localLastVisitedAt = computed(() => new Date(localUser.value.lastVisitedAt))

function onLastVisitedAtChange(value: Date) {
  localUser.value.lastVisitedAt = value.getTime()
}
</script>

<template>
  <tr>
    <td>{{ item.id }}</td>
    <td class="td-center">
      <v-text-field v-model="localUser.firstName" hide-details></v-text-field>
    </td>
    <td class="td-center">
      <v-text-field v-model="localUser.lastName" hide-details></v-text-field>
    </td>
    <td class="td-center"><v-text-field v-model="localUser.email" hide-details></v-text-field></td>
    <td class="td-center">
      <v-date-input
        :model-value="localLastVisitedAt"
        @update:model-value="onLastVisitedAtChange"
        hide-details
      />
    </td>
    <td class="td-center">
      <div class="datatable-row__controls">
        <v-btn
          class="datatable-row__controls--save"
          density="compact"
          @click="$emit('save', localUser)"
          icon="$complete"
          variant="text"
          color="success"
        />
        <v-btn
          density="compact"
          @click="$emit('cancel')"
          icon="$cancel"
          variant="text"
          color="red"
        />
      </div>
    </td>
  </tr>
</template>

<style scoped>
.datatable-row__controls {
  display: flex;
  justify-content: center;
}
.datatable-row__controls--save {
  margin-right: 20px;
}
.td-center > div {
  margin: 20px 0;
}
</style>
