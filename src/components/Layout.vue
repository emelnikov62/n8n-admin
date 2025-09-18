<template>
    <div class="layout flex flex-column justify-space-between align-items-center gradient-layout gap-20"
        v-if="!$root.loading" :class="$root.user ? 'auth-content' : ''">
        <Header />
        <router-view />
        <Modal />
    </div>
    <div class="loader-container full-width full-height flex-column align-items-center justify-center flex" v-else>
        <span class="loader"></span>
    </div>
</template>

<script>
import Header from './Header.vue';
import Modal from './Modal.vue';

export default {
    components: {
        Header, Modal
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    },
    sockets: {
    }
}
</script>
