<template>
  <div class="container">
    <h1>Posts</h1>
    <button class="button-main" @click="openModal">Create New Post</button>
    <PostsTable/>
    <CreatePostModal ref="modalRef"/>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import PostsTable from '~/components/PostsTable.vue'
import CreatePostModal from '~/components/CreatePostModal.vue'
import {usePostStore} from '~/store/posts'

const modalRef = ref<any>(null)

const postStore = usePostStore()

onMounted(() => {
  postStore.initialize()
})

const openModal = () => {
  modalRef.value?.openModal()
}
</script>
