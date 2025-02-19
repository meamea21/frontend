<template>
  <div>
    <h2>Wyniki badań</h2>
    <div v-if="patient">
      <h3>Dane pacjenta</h3>
      <p>Imię: {{ patient.name }}</p>
      <p>Nazwisko: {{ patient.surname }}</p>
      <p>Płeć: {{ patient.sex }}</p>
      <p>Data urodzenia: {{ patient.birthDate }}</p>
    </div>
    <div v-for="order in orders" :key="order.orderId">
      <h3>Zamówienie {{ order.orderId }}</h3>
      <ul>
        <li v-for="result in order.results" :key="result.name">
          {{ result.name }}: {{ result.value }} (ref: {{ result.reference }})
        </li>
      </ul>
    </div>
  </div>

<LogoutResults v-if="isLoggedIn" />

</template>

<script>
import LogoutResults from './LogoutResults.vue'

export default {
  components: {
    LogoutResults
  },
  data() {
    return {
      patient: null,
      orders: [],
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token')
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Brak tokenu!');
      }

      const response = await fetch('http://localhost:8000/api/results', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Błąd podczas pobierania wyników');
      }

      const data = await response.json();
      this.patient = data.patient;
      this.orders = data.orders;
    } catch (error) {
      alert(error.message);
      this.$router.push('/loginResults');
    }
  },
};
</script>