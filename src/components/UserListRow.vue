<script setup lang="ts">
import { computed, ref } from 'vue'
import type { User } from '../interfaces/User'

const props = defineProps<{
  item: User
  isEditing?: Boolean
}>()

const emit = defineEmits<{
  save: [value: User]
  delete: [value: Number]
}>()

const localUser = ref({ ...props.item })
const localIsEditing = ref(props.isEditing || false)
const localLastVisitedAt = computed(() => new Date(localUser.value.lastVisitedAt))

function onLastVisitedAtChange(value: Date) {
  localUser.value.lastVisitedAt = value.getTime()
}

function cancelEdit() {
  localUser.value = props.item
  localIsEditing.value = false
}

function saveItem() {
  localIsEditing.value = false
  emit('save', localUser.value)
}
</script>

<template>
  <tr v-if="localIsEditing">
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
          @click="saveItem"
          icon="$complete"
          variant="text"
          color="success"
        />
        <v-btn density="compact" @click="cancelEdit" icon="$cancel" variant="text" color="red" />
      </div>
    </td>
  </tr>
  <tr v-else>
    <td>{{ item.id }}</td>
    <td>{{ item.firstName }}</td>
    <td>{{ item.lastName }}</td>
    <td>{{ item.email }}</td>
    <td>{{ localLastVisitedAt.toLocaleString() }}</td>
    <td class="td-center">
      <div class="datatable-row__controls">
        <v-btn
          class="datatable-row__controls--save"
          density="compact"
          @click="localIsEditing = true"
          icon="$edit"
          variant="text"
          color="success"
        />
        <v-btn
          density="compact"
          @click="$emit('delete', item.id)"
          icon="mdi-trash-can"
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
