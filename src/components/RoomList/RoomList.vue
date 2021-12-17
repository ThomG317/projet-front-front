<template>
  <div class="room-list">
    <RoomSearch :is-on="search.isOn" @changeSearchValue="handleSearchValidation($event)"/>
    <RoomItems :rooms="displayRooms" @changeRoomSelected="handleRoomSelection($event)"/>
    <RoomPagination/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue';
import RoomSearch from '@/components/RoomList/RoomSearch/RoomSearch.vue';
import RoomItems from '@/components/RoomList/RoomItems/RoomItems.vue';
import RoomPagination from '@/components/RoomList/RoomPagination/RoomPagination.vue';
import { Room } from '@/model/Room';

export default defineComponent({
  name: 'RoomList',
  props: {
    rooms: {
      type: Object as PropType<Room []>,
      required: true,
    },
  },
  components: {
    RoomSearch,
    RoomItems,
    RoomPagination,
  },
  events: {
    changeRoomSelected: (value: Room) => value,
  },
  setup(props, { emit }) {
    const search = reactive({ value: '', isOn: false });
    const displayRooms = ref<Room []>(props.rooms);

    function handleRoomSelection(room: Room): void {
      emit('changeRoomSelected', room);
    }

    function filterRooms(value: string): void {
      const rooms = JSON.parse(JSON.stringify(props.rooms));
      if (value.length === 0) {
        displayRooms.value = rooms;
      } else {
        // eslint-disable-next-line arrow-body-style
        displayRooms.value = rooms.filter((room: Room) => {
          return room.name.toLowerCase().includes(value.toLowerCase())
            || room.group?.name.toLowerCase().includes(value.toLowerCase())
            || room.affectations.findIndex((p) => p.toLowerCase().includes(value.toLowerCase())) > -1;
        });
      }
    }

    function handleSearchValidation(value: string): void {
      if (!search.isOn && value.length > 0) {
        console.log('search room list', value);
        search.value = value;
        search.isOn = true;
      } else if (search.isOn && search.value !== value) {
        search.value = value;
      } else if (search.isOn && search.value === value) {
        search.value = '';
        search.isOn = false;
      }
      filterRooms(search.value);
    }

    return {
      search,
      displayRooms,
      handleRoomSelection,
      handleSearchValidation,
    };
  },
});
</script>
