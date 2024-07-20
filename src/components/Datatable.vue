<script setup lang="ts">
import { useUsersStore } from '../stores/users'
import { storeToRefs } from 'pinia'
import { computed, onMounted, Ref, ref } from 'vue'
import type { User } from '../interfaces/User'
import DatatableRow from './DatatableRow.vue'

const usersStore = useUsersStore()

const { users } = storeToRefs(usersStore)
const { fetchUserList, saveUser, deleteUser } = usersStore

const headers = ref([
	{ title: 'ID', key: 'id', width: 60 },
	{ title: 'Имя', key: 'firstName' },
	{ title: 'Фамилия', key: 'lastName' },
	{ title: 'Email', key: 'email' },
	{ title: 'Последний визит', key: 'lastVisitedAtString' },
	{ title: '', key: 'actions', sortable: false }
])
const newUser: Ref<User | null> = ref(null)
const search = ref('')

const tableItems = computed(() => {
	return [...users.value].map(([, user]) => user)
})

onMounted(() => {
	fetchUserList()
})

function onDeleteItem(id: Number) {
	if (confirm('Вы уверены что хотите удалить пользователя?')) {
		deleteUser(id)
	}
}

function addNewUser() {
	if (newUser.value) {
		return
	}
	let newId = new Date().getTime()

	while (users.value.has(newId)) {
		newId++
	}

	newUser.value = {
		id: newId,
		firstName: null,
		lastName: null,
		email: null,
		lastVisitedAt: newId
	}
}

function addUser(value: User) {
	saveUser(value)
	newUser.value = null
}

function refreshList() {
	search.value = ''
	newUser.value = null
	fetchUserList()
}
</script>

<template>
	<div class="datatable">
		<div class="datatable__controls">
			<v-btn class="datatable__controls--add" @click="addNewUser" :disabled="!!newUser"
				>Добавить подьзователя</v-btn
			>
			<v-btn class="datatable__controls--refresh" @click="refreshList"
				>Обновить из json файла</v-btn
			>
		</div>
		<div class="datatable__controls">
			<v-text-field v-model="search" label="Поиск" max-width="400" />
		</div>
		<v-data-table :items="tableItems" :headers="headers" item-key="id" :search="search">
			<template v-if="newUser" #[`body.prepend`]>
				<DatatableRow :item="newUser" @save="addUser" @delete="newUser = null" />
			</template>
			<template #item="{ item }">
				<DatatableRow :item="item" @save="saveUser" @delete="onDeleteItem" />
			</template>
		</v-data-table>
	</div>
</template>

<style scoped>
.datatable {
	width: 100vw;
}
.datatable__controls--add {
	margin-right: 20px;
}
.datatable__controls {
	margin: 20px 40px;
}
</style>