<script lang="ts">
export default {
    data() {
        return {
            confirmModal: true,
        };
    },
    props: {
        text: String,
    },
    methods: {
        confirm(confirmation: boolean) {
            if (confirmation) {
                this.$emit('confirmed');
                this.confirmModal = false;
            } else {
                this.$emit('canceled');
                this.confirmModal = false;
            }
        },
    }
}
</script>

<template>
    <main v-if="confirmModal" class="modal">
        <div class="modal-content">
            <p>{{ text }} </p>
        </div>
        <div class="modal-button">
            <button @click="confirm(true)" id="btn-sim">Sim</button>
            <button @click="confirm(false)" id="btn-nao">Não</button>
        </div>
    </main>
</template>

<style scoped>
.modal {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: white;
    min-width: 15rem;
    height: 8rem;
    margin-left: 50%;
    box-shadow: 1px 1px 2px 2px rgb(217, 217, 217);
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
}

.modal-button {
    display: flex;
    gap: 10%;
    white-space: wrap;
}

.modal-content {
    display: flex;
    height: 5em;
    width: 8em;
}

#btn-sim {
    width: 5em;
    background-color: transparent;
    color: black;
    border: 1px solid gray;
    border-radius: 22px;
    cursor: pointer;
}
#btn-sim:hover{
    border: none;
    color: white;
background-color: rgb(128, 149, 199);
}
#btn-nao:hover{
    border: none;
    color: white;
background-color: rgb(128, 149, 199);
}
#btn-nao {
    width: 5em;
    background-color: transparent;
    color: black;
    border: 1px solid gray;
    border-radius: 22px;
    cursor: pointer;

}

p {
    font-size: 20px;
    line-height: 20px;
}
</style>