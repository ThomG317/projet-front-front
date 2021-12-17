<template>
  <div class="room-header">
    <span class="room-header__icon" :class="getRoomIcon(room)"></span>
    <div class="room-item__text">
      <p class="room-item__title">
        {{ room.name }}<span class="room-header__count">({{ room.seat }} places)</span>
        <span class="room-item__status" :class="getRoomClass(room)">{{ getRoomStatus(room) }}</span>
      </p>
      <span class="room-item__subtitle">{{ getRoomType(room) }}</span>
    </div>
    <span class="icon-close room-header__close" @click="handleClose()"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { Room } from '@/model/Room';
import useRoomUtils from '@/utils/roomUtils';

export default defineComponent({
  name: 'RoomHeader',
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true,
    },
  },
  events: {
    close: () => null,
  },
  setup(_, { emit }) {
    const { getRoomType, getRoomStatus, getRoomClass, getRoomIcon } = useRoomUtils();

    function handleClose(): void {
      emit('close');
    }

    return {
      getRoomStatus,
      getRoomIcon,
      getRoomClass,
      getRoomType,
      handleClose,
    };
  },
});
</script>
