<template>
  <div class="room-items">
    <RoomItem v-for="room in rooms" :room="room" :key="room.id" @click="handleRoomSelection(room)"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RoomItem from './RoomItem/RoomItem.vue';
import { Room } from '@/model/Room';

export default defineComponent({
  name: 'RoomItems',
  props: {
    rooms: {
      type: Object as PropType<Room []>,
      required: true,
    },
  },
  components: {
    RoomItem,
  },
  events: {
    changeRoomSelected: (value: Room) => value,
  },
  setup(_, { emit }) {
    function handleRoomSelection(room: Room): void {
      emit('changeRoomSelected', room);
    }

    return {
      handleRoomSelection,
    };
  },
});
</script>
