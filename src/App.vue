<template>
  <div class="m-4">
    <div class="card">
      <div class="card-body">
        <div class="card-header">
          Count total story
        </div>

        <div class="form-field">
          <label class="form-label">Select Boards</label>

          <select
            v-model="selected.boards.id"
            class="select"
            @change="handleSelectBoard"
          >
            <option
              v-for="board in boards"
              :key="board.name"
              :value="board.id"
            >
              {{ board.name }}
            </option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label">Select Lists</label>

          <select
            v-model="selected.list"
            class="select"
            @change="handleSelectList()"
          >
            <option
              v-for="list in lists"
              :key="list.name"
              :value="list"
            >
              {{ list.name }}
            </option>
          </select>
        </div>

        <div>{{ total }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {axios} from "./axios.js";
import {onMounted, reactive, ref} from "vue";

const boards = ref()
const lists = ref()
const total = ref(0)

const selected = reactive({
  boards: {
    id: ''
  },
  list: {
    id: ''
  }
})

async function getBoardsMe() {
  const {data} = await axios.get('members/me/boards')
  boards.value = data
}

async function handleSelectBoard() {
  const id = selected.boards.id
  const { data } = await axios.get(`/boards/${id}/lists`)
  lists.value = data
}

async function handleSelectList() {
  total.value = 0

  const id = selected.list.id
  const { data } = await axios.get(`/lists/${id}/cards`)
  data.forEach(cards => {
    cards.labels.forEach(item => {
      if (item.color === 'green_dark'){
        total.value += JSON.parse(item.name)
      }
    })
  })
}

onMounted(() => {
  getBoardsMe()
})
</script>
