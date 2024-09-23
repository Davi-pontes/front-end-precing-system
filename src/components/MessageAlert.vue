<script lang="ts">
export default {
    name: 'MessageAlert',
    props: {
        message: { type: String }
    }
}
</script>

<template>
    <main>
        <div class="banner">
            <span>{{ message }}</span>
            <span class="progress"></span>
        </div>
    </main>
</template>

<style scoped>
.banner {
    position: absolute;
    max-width: 20%;
    padding: 1.25rem 1rem;
    border-radius: 0.25rem;
    background-color: #8095c7;
    margin-left: 40vw;
    color: white;
    transform: translateY(2rem);
    opacity: 0;
    pointer-events: none;
    animation: fade-in 4s;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    display: inline-block;
}

.progress {
    position: absolute;
    inset: auto 0.625rem 0.375rem;
    height: 0.2rem;
    background-color: #c6c9d0;
    transform: scaleX(0);
    transform-origin: left;
    border-radius: 0.5rem;
    animation: load 3s 0.25s linear forwards;
}

@keyframes fade-in {

    5%,
    90% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes load {
    100% {
        transform: scaleX(1);
    }
}
</style>