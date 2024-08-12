<script>
export default {
    name: 'NavBarLadingPage',
    methods: {
        gotHomePrecification() {
            this.$router.push({ name: 'login' })
        }
    }
}
</script>
<template>
    <main>
        <div class="head">
            <img src="../assets/logo-relqui.png" alt="logo-up">

            <button @click="gotHomePrecification">Login</button>
        </div>
    </main>
</template>

<style scoped>
.head {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 5em;
    background: rgb(128, 149, 199);
    color: white;
}

.head button {
    border: none;
    width: 5em;
    height: 1.8em;
    border-radius: 10px;
    font-size: 1.5em;
    transition: 0.5s;
    background-color: rgb(30, 50, 97);
    color: white;
}

.head p {
    font-size: 2em;
    cursor: pointer;
}

.head button:hover {
    background: rgb(65, 89, 145);
}

.head img {
    width: 10em;
    height: 10em;
}
</style>