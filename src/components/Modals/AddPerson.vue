<template>
  <div class="modal__container">
    <div class="modal">
      <button class="modal__close-button" @click="handleClose()"><span class="icon-close"></span></button>
      <h2 class="modal__title">Ajouter des peronnes ({{ selected.length }})</h2>
      <ul class="modal__list">
        <li class="modal__list-item" :class="{ '-selected': selected.includes(person) }"
            v-for="person in people" :key="person"
            @click="changeSelected(person)">
          <p class="modal__checkbox">
            <input id="selected" name="selected" type="checkbox" :checked="selected.includes(person)">
            <label for="selected"></label>
          </p>
          {{ person }}
        </li>
      </ul>
      <button class="modal__validate-button" :disabled="selected.length === 0" @click="handlePersonSelection(selected)">Valider</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'AddPerson',
  props: {
    people: {
      type: Object as PropType<string []>,
      required: true,
    },
  },
  events: {
    personSelection: (person: string []) => person,
    close: () => null,
  },
  setup(_, { emit }) {
    const selected = ref<string []>([]);

    function changeSelected(person: string) {
      if (selected.value.includes(person)) {
        selected.value.splice(selected.value.indexOf(person), 1);
      } else {
        selected.value.push(person);
      }
    }

    function handlePersonSelection(people: string[]): void {
      emit('personSelection', people);
    }

    function handleClose(): void {
      emit('close');
    }

    return {
      selected,
      handlePersonSelection,
      handleClose,
      changeSelected,
    };
  },
});
</script>
