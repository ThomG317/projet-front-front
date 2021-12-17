<template>
  <div class="affectation" :class="[{ '-selectable': isSelectable }, { '-selected' : selected }]">
    <div class="affectation__left">
      <p class="affectation__checkbox" v-if="isSelectable">
        <input id="selected" name="selected" type="checkbox" v-model="selected" @input="changeSelected">
        <label for="selected"></label>
      </p>
      <div class="affectation__logo">FL</div>
      {{ value }}
    </div>
    <button class="affectation__more" @click="dropdown = !dropdown"><span></span><span></span><span></span></button>
    <div class="affectation__dropdown" v-if="dropdown" @blur="dropdown = false">
      <div class="affectation__dropdown__item" @click="handleMove()"><span class="icon-reply"></span>Déplacer de salle</div>
      <div class="affectation__dropdown__item" @click="handleRemove()"><span class="icon-close"></span>Enlever de la salle</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Affectation',
  events: {
    changeSelected: (value: boolean) => value,
    moveAffectation: () => null,
    removeAffectation: () => null,
  },
  props: {
    value: {
      value: String,
      required: true,
    },
    isSelectable: {
      value: Boolean,
      required: false,
      default: true,
    },
  },
  setup(_, { emit }) {
    const dropdown = ref(false);
    const selected = ref(false);

    function changeSelected(): void {
      emit('changeSelected', selected.value);
    }

    function handleMove(): void {
      dropdown.value = false;
      emit('moveAffectation');
    }

    function handleRemove(): void {
      dropdown.value = false;
      emit('removeAffectation');
    }

    return {
      dropdown,
      selected,
      changeSelected,
      handleMove,
      handleRemove,
    };
  },
});
</script>
