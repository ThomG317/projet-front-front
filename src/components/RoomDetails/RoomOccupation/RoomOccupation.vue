<template>
  <div class="room-occupation">
    <div class="room-occupation__header">
      <p class="room-occupation__title">
        Affectation
        <span class="room-occupation__count" v-if="room.seat && room.type !== 0">
          ({{ room.group ? room.group.size : room.affectations.length }}/{{ room.seat }})
        </span>
      </p>
      <button class="action-button" @click="handleRemoveSelected(selected)" v-if="selected.length > 0">
        <span class="icon-close"></span>Retirer ({{ selected.length }}) personnes
      </button>

    </div>
    <div class="room-occupation__affectation">
      <Affectation v-for="person in room.affectations" :key="person" :value="person"
                   :is-selectable="room.type !== 0"
                   @moveAffectation="handleMovePerson(person)"
                   @removeAffectation="handleRemovePerson(person)"
                   @changeSelected="handleChange(person, $event)"/>
      <Affectation :value="room.group.name"
                   :is-selectable="false"
                   @moveAffectation="handleMoveGroup()"
                   @removeAffectation="handleRemoveGroup()"
                   v-if="room.group"/>
      <div class="room-occupation__add-buttons" v-if="(!room.group && room.type !== 0 && room.affectations.length < room.seat) ||
      (room.affectations.length === 0 && room.type === 0)">
        <button class="action-button" @click="handleAddPerson()">
          <span class="icon-add"></span>Ajouter une personne
        </button>
        <button class="action-button" @click="handleAddGroup()" v-if="room.affectations.length === 0">
          <span class="icon-groups"></span>Ajouter un groupe
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
// eslint-disable-next-line import/extensions
import Affectation from '@/components/RoomDetails/RoomOccupation/Affectation/Affectation.vue';
import { Room } from '@/model/Room';

export default defineComponent({
  name: 'RoomOccupation',
  components: {
    Affectation,
  },
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true,
    },
  },
  events: {
    addPerson: () => null,
    addGroup: () => null,
    movePerson: (person: string) => person,
    moveGroup: () => null,
    removePerson: (person: string) => person,
    removeGroup: () => null,
  },
  setup(_, { emit }) {
    const selected = ref<string[]>([]);

    function handleChange(person: string, value: boolean): void {
      if (value) {
        selected.value.splice(selected.value.indexOf(person), 1);
      } else {
        selected.value.push(person);
      }
    }

    function handleAddPerson(): void {
      emit('addPerson');
    }

    function handleAddGroup(): void {
      emit('addGroup');
    }

    function handleMovePerson(person: string): void {
      emit('movePerson', person);
    }

    function handleMoveGroup(): void {
      emit('moveGroup');
    }

    function handleRemovePerson(person: string): void {
      emit('removePerson', person);
    }

    function handleRemoveGroup(): void {
      emit('removeGroup');
    }

    function handleRemoveSelected(people: string []): void {
      people.forEach((p) => handleRemovePerson(p));
      selected.value = [];
    }

    return {
      selected,
      handleChange,
      handleAddPerson,
      handleAddGroup,
      handleMovePerson,
      handleMoveGroup,
      handleRemovePerson,
      handleRemoveGroup,
      handleRemoveSelected,
    };
  },
});
</script>
