<template>

    <div>
        <Transition name="fade">
            <div v-if="isShow">
                <div class="fixed bg-black inset-0 bg-opacity-40 flex justify-center items-start">
                    <Transition name="scale">
                        <div class="w-full max-w-4xl mt-20 bg-white rounded-lg relative overflow-hidden" v-if="isShow">
                            <div class="px-4 py-2">
                                <h4 class="text-2xl mb-2 italic font-medium text-purple-300">Appointment</h4>
                                <div class="bg-purple-300 font-medium text-white">
                                </div>
                                <button class="rounded bg-red-300 text-white px-3 py-1" @click="closeModal">Close</button>
                            </div>
                            <div v-if="loading" class="absolute inset-0 bg-purple-100 flex items-center justify-center">
                                <span>Loading ... </span>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
    </div>

</template>

<script setup>
    import { onMounted, ref } from "vue";

    const emit = defineEmits(['close'])

    defineProps({
        isShow : Boolean
    })

    const loading = ref(true);

    onMounted(() => {
        setTimeout(() => {
            loading.value=false;
        }, 500)
    });

    const closeModal = () => {
        emit("close")
    }

</script>

<style>
/* ---------------------------------- */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}

.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0);
}

.scale-enter-active,
.scale-leave-active {
    transition: all 500ms ease-out;
}
</style>