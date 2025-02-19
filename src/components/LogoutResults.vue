<template>
<button @click="logout">Wyloguj się</button>
</template>

<script>
export default {
    methods: {
        logout() {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Brak tokenu - zaloguj się');
            }
            localStorage.removeItem('token');

            // na serwerze
            fetch('http://localhost:8000/api/logout', {
               method: 'POST',
               headers: {
                 'Authorization': `Bearer ${localStorage.getItem('token')}`
               }
             });

            this.$router.push('/LoginResults');

        }
    }
}
</script>