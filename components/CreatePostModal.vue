<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <h2 class="modal-header">Create Post</h2>
      <form @submit.prevent="createPost">
        <div class="modal-body">
          <label class="modal-label" for="title">Title</label>
          <input v-model="title" class="modal-input" placeholder="Title" required/>
        </div>
        <div class="modal-body">
          <label class="modal-label" for="body">Body</label>
          <textarea v-model="body" class="modal-input" placeholder="Body" required></textarea>
        </div>
        <div class="modal-footer">
          <button class="modal-button__close" type="button" @click="closeModal">Cancel
          </button>
          <button class="modal-button__submit" type="submit">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {usePostStore} from '~/store/posts'

const isOpen = ref(false)
const title = ref('')
const body = ref('')

const postStore = usePostStore()

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
  title.value = ''
  body.value = ''
}

const createPost = async () => {
  if (title.value && body.value) {
    await postStore.addPost({title: title.value, body: body.value, userId: 1})
    closeModal()
  }
}

defineExpose({
  openModal,
  closeModal,
})
</script>