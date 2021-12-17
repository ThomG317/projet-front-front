<template>
  <div class="modal__container">
    <div class="modal">
      <button class="modal__close-button" @click="handleClose()"><span class="icon-close"></span></button>
      <h2 class="modal__title">Add group</h2>
      <ul class="modal__list">
        <li class="modal__list-item" v-for="group in groups" :key="group" @click="handleGroupSelection(group)">{{ group.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Group } from '@/model/Group';

export default defineComponent({
  name: 'AddGroup',
  props: {
    groups: {
      type: Object as PropType<Group []>,
      required: true,
    },
  },
  events: {
    groupSelection: (group: Group) => group,
    close: () => null,
  },
  setup(_, { emit }) {
    function handleGroupSelection(group: Group): void {
      emit('groupSelection', group);
    }

    function handleClose(): void {
      emit('close');
    }

    return {
      handleGroupSelection,
      handleClose,
    };
  },
});
</script>
