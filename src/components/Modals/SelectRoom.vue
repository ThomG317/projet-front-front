<template>
  <div class="modal__container">
    <div class="modal">
      <button class="modal__close-button" @click="handleClose()"><span class="icon-close"></span></button>
      <h2 class="modal__title">Choisir une salle de destination</h2>
      <div class="modal__content">
        <RoomItem v-for="room in rooms.filter(x => x.id !== currentRoom.id)"
                  :room="room"
                  :key="room.id"
                  @click="handleRoomSelection(room)"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Room } from '@/model/Room';
import RoomItem from '@/components/RoomList/RoomItems/RoomItem/RoomItem.vue';

export default defineComponent({
  name: 'SelectRoom',
  components: {
    RoomItem,
  },
  props: {
    rooms: {
      type: Object as PropType<Room []>,
      required: true,
    },
    currentRoom: {
      type: Object as PropType<Room>,
      required: true,
    },
    moveParams: {
      type: Object as PropType<string>,
      required: true,
    },
  },
  events: {
    selectRoomForPerson: (room: Room) => room,
    selectRoomForGroup: (room: Room) => room,
    close: () => null,
  },
  setup(props, { emit }) {
    function handleRoomSelection(room: Room): void {
      if (props.moveParams.length > 0) {
        emit('selectRoomForPerson', { room, person: props.moveParams });
      } else {
        emit('selectRoomForGroup', room);
      }
    }

    function handleClose(): void {
      emit('close');
    }

    return {
      handleRoomSelection,
      handleClose,
    };
  },
});
</script>
