<template>
  <div class="room-item">
    <span :class="getRoomIcon(room)"></span>
    <div class="room-item__text">
      <p class="room-item__title">{{ room.name }}</p>
      <span class="room-item__subtitle">{{ getRoomType(room) }}</span>
    </div>
    <div class="room-item__status" :class="getRoomClass(room)">{{ getRoomStatus(room) }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Room } from '@/model/Room';
import useRoomUtils from '@/utils/roomUtils';

export default defineComponent({
  name: 'RoomItem',
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true,
    },
  },
  setup() {
    const { getRoomType, getRoomStatus, getRoomClass, getRoomIcon } = useRoomUtils();

    return {
      getRoomType,
      getRoomStatus,
      getRoomClass,
      getRoomIcon,
    };
  },
});
</script>
