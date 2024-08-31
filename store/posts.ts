import {defineStore} from 'pinia'
import axios from 'axios'

export const usePostStore = defineStore('posts', {
    state: () => ({
        posts: [] as any[],
        loading: false,
        currentPage: 1,
        totalPages: 0,
        postsPerPage: 10,
        sortOrder: 'asc' as 'asc' | 'desc',
    }),
    actions: {
        // Инициализация хранилища
        async initialize() {
            this.sortOrder = (localStorage.getItem('sortOrder') as 'asc' | 'desc') || 'asc'
            await this.fetchPosts()
        },

        // Загрузка постов
        async fetchPosts(page: number = 1) {
            this.loading = true
            try {
                const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: 10000,
                        _sort: 'id',
                        _order: this.sortOrder,
                    },
                })

                const locallyAddedPosts = JSON.parse(localStorage.getItem('locallyAddedPosts') || '[]')
                const allPosts = [...data, ...locallyAddedPosts]
                const uniquePosts = Array.from(new Map(allPosts.map(post => [post.id, post])).values())
                uniquePosts.sort((a, b) => this.sortOrder === 'asc' ? a.id - b.id : b.id - a.id)

                const startIdx = (page - 1) * this.postsPerPage
                this.posts = uniquePosts.slice(startIdx, startIdx + this.postsPerPage)
                this.totalPages = Math.ceil(uniquePosts.length / this.postsPerPage)
                this.currentPage = page;
            } catch (error) {
                console.error('Failed to fetch posts:', error)
            } finally {
                this.loading = false
            }
        },

        // Добавление нового поста
        async addPost(post: { title: string; body: string; userId: number }) {
            this.loading = true
            try {
                const locallyAddedPosts = JSON.parse(localStorage.getItem('locallyAddedPosts') || '[]')
                const newId = locallyAddedPosts.length ? Math.max(...locallyAddedPosts.map((p: any) => p.id)) + 1 : 101
                const newPost = {...post, id: newId}

                locallyAddedPosts.unshift(newPost)
                localStorage.setItem('locallyAddedPosts', JSON.stringify(locallyAddedPosts))

                await this.fetchPosts()
            } catch (error) {
                console.error('Failed to add post:', error)
            } finally {
                this.loading = false
            }
        },

        // Установка текущей страницы
        setPage(page: number) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.fetchPosts(page);
            }
        },

        // Переключение порядка сортировки
        sortPosts() {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
            localStorage.setItem('sortOrder', this.sortOrder)
            this.fetchPosts()
        }
    }
})