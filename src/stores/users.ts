import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User'
import data from '@/userList.json'

export const useUsersStore = defineStore('users', () => {
  const users: Ref<Map<Number, User>> = ref(new Map())

  function fetchUserList() {
    // использовал Map из-за малого кол-ва пользователей, можно и обычный массив но тогда придется усложнять saveUser/deleteUser
    users.value = new Map(data.map((item) => [item.id, item]))
  }

  function saveUser(value: User) {
    return users.value.set(value.id, value)
  }

  function deleteUser(id: Number) {
    return users.value.delete(id)
  }

  return { users, fetchUserList, saveUser, deleteUser }
})
