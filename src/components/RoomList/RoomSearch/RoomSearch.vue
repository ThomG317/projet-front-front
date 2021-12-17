<template>
  <div class="input-group -search-bar">
    <input v-model="searchValue" class="input" type="text" placeholder="Rechercher une personne, une salle..."
            @keydown.enter="handleSearchValidation(searchValue)">
    <button class="input-group__icon-button" @click="handleSearchValidation(searchValue)">
      <span :class="isOn ? 'icon-close' : 'icon-search'"></span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'RoomSearch',
  props: {
    isOn: {
      type: Boolean,
      required: true,
    },
  },
  events: {
    changeSearchValue: (value: string) => value,
  },
  setup(props, { emit }) {
    const searchValue = ref<string>('');

    function handleSearchValidation(value: string): void {
      emit('changeSearchValue', value);
    }

    watch(() => props.isOn, (newValue) => {
      if (!newValue) {
        searchValue.value = '';
      }
    });

    return {
      searchValue,
      handleSearchValidation,
    };
  },
});
</script>
