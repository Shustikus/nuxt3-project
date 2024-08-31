<template>
  <div class="table-container">
    <div v-if="loading" class="text-center">
      <div class="throbber"></div>
    </div>
    <table v-if="!loading" class="table">
      <thead>
      <tr>
        <th class="cursor-pointer relative" @click="sortPosts">
          ID
          <span v-if="sortOrder === 'asc'" class="table-span">▲</span>
          <span v-else class="table-span">▼</span>
        </th>
        <th>Title</th>
        <th>Body</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.id }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.body }}</td>
      </tr>
      </tbody>
    </table>
    <div v-if="!loading && totalPages > 1" class="pagination">
      <button :disabled="currentPage === 1" class="pagination-button" @click="changePage(currentPage - 1)">Previous
      </button>
      <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" class="pagination-button" @click="changePage(currentPage + 1)">
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {usePostStore} from '~/store/posts'

const postStore = usePostStore()
const posts = computed(() => postStore.posts)
const loading = computed(() => postStore.loading)
const currentPage = computed(() => postStore.currentPage)
const totalPages = computed(() => postStore.totalPages)
const sortOrder = computed(() => postStore.sortOrder)

const sortPosts = () => postStore.sortPosts()
const changePage = (page: number) => postStore.setPage(page)
</script>