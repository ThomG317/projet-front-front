<template>
  <div class="room-details">
    <RoomHeader :room="room" @close="handleClose()"/>
    <RoomLocation/>
    <RoomOccupation :room="room"
                    @addPerson="handleAddPerson()"
                    @addGroup="handleAddGroup();"
                    @movePerson="handleMovePerson($event)"
                    @moveGroup="handleMoveGroup()"
                    @removePerson="handleRemovePerson($event)"
                    @removeGroup="handleRemoveGroup()"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import RoomHeader from '@/components/RoomDetails/RoomHeader/RoomHeader.vue';
import RoomLocation from '@/components/RoomDetails/RoomLocation/RoomLocation.vue';
import RoomOccupation from '@/components/RoomDetails/RoomOccupation/RoomOccupation.vue';
import { Room } from '@/model/Room';
import { Group } from '@/model/Group';

export default defineComponent({
  name: 'RoomDetails',
  components: {
    RoomHeader,
    RoomLocation,
    RoomOccupation,
  },
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true,
    },
  },
  events: {
    addGroup: () => null,
    addPerson: () => null,
    movePerson: (person: string) => person,
    moveGroup: () => null,
    removePerson: (person: string) => person,
    removeGroup: (room: Room) => room,
  },
  setup(_, { emit }) {
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

    function handleClose(): void {
      emit('close');
    }

    return {
      handleAddPerson,
      handleAddGroup,
      handleMovePerson,
      handleMoveGroup,
      handleRemovePerson,
      handleRemoveGroup,
      handleClose,
    };
  },
});
</script>
