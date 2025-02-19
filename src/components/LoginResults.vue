<template>
  <div>
    <h2>LoginResults</h2>
    <form @submit.prevent="loginResults">
      <input type="text" v-model="login" placeholder="Login (Imię Nazwisko)" required />
      <input type="password" v-model="password" placeholder="Hasło (Data urodzenia)" required />
      <button type="submit">Zaloguj</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    async loginResults() {
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: this.login,
            password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Logowanie nieudane!');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        this.$router.push('/ViewResults');
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>