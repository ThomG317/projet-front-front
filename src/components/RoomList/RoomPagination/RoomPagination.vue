<template>
  <div class="pagination__container">
    <button v-for="i in 3" class="pagination__button" :key="i"
            :class="{ '-selected': i == index }"
            @click="index = i">
      {{ i }}
    </button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RoomPagination',
  setup() {
    const index = ref(1);

    return {
      index,
    };
  },
});
</script>
