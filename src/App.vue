<template>
  <div class="container">
    <AddPerson :people="people.filter(p => !currentRoom.affectations.includes(p))"
               @personSelection="addPerson(currentRoom, $event)"
               @close="isAddPersonModalVisible = false"
               v-if="isAddPersonModalVisible"/>
    <AddGroup :groups="groups"
              @groupSelection="addGroup(currentRoom, $event)"
              @close="isAddGroupModalVisible = false"
              v-if="isAddGroupModalVisible"/>
    <SelectRoom :rooms="rooms"
                :current-room="currentRoom"
                :move-params="moveParams"
                @selectRoomForPerson="movePerson(currentRoom, $event.person, $event.room)"
                @selectRoomForGroup="moveGroup(currentRoom, $event)"
                @close="handleMove(() => null)"
                v-if="isRoomSelectionModalVisible"/>
    <RoomList :rooms="rooms" @changeRoomSelected="handleRoomSelection($event)"/>
    <RoomDetails :room="currentRoom"
                 @addPerson="isAddPersonModalVisible = true"
                 @addGroup="isAddGroupModalVisible = true"
                 @movePerson="handleMovePerson($event)"
                 @moveGroup="handleMoveGroup()"
                 @removePerson="removePerson(currentRoom, $event)"
                 @removeGroup="removeGroup(currentRoom)"
                 @close="handleClose()"
                 v-if="roomIsSelected"/>
    <RoomMap v-else/>
  </div>

</template>
<script lang="ts">

import { defineComponent, reactive, ref } from 'vue';
import RoomList from '@/components/RoomList/RoomList.vue';
import RoomMap from '@/components/RoomMap/RoomMap.vue';
import RoomDetails from '@/components/RoomDetails/RoomDetails.vue';
import AddPerson from '@/components/Modals/AddPerson.vue';
import AddGroup from '@/components/Modals/AddGroup.vue';
import SelectRoom from '@/components/Modals/SelectRoom.vue';
import { Room, RoomStatus, RoomType } from '@/model/Room';
import { Group } from '@/model/Group';

export default defineComponent({
  name: 'app',
  components: {
    RoomList,
    RoomMap,
    RoomDetails,
    AddPerson,
    AddGroup,
    SelectRoom,
  },
  setup() {
    const currentRoom = ref<Room>({} as Room);
    const roomIsSelected = ref<boolean>(false);
    const isAddPersonModalVisible = ref<boolean>(false);
    const isAddGroupModalVisible = ref<boolean>(false);
    const isRoomSelectionModalVisible = ref<boolean>(false);
    const moveParams = ref<string>('');

    const rooms = reactive<Room []>([
      { id: 1, name: 'B201', type: RoomType.OFFICE, status: RoomStatus.ABSENT, affectations: ['Jean Michel'] },
      { id: 2, name: 'B202', type: RoomType.OFFICE, status: RoomStatus.FREE, affectations: [] },
      { id: 3, name: 'B203', type: RoomType.LAB, status: RoomStatus.FREE, affectations: [], seat: 5 },
      { id: 4, name: 'B204', type: RoomType.CLASS, status: RoomStatus.FREE, affectations: [], seat: 30 },
      { id: 5, name: 'B205', type: RoomType.CLASS, status: RoomStatus.FULL, affectations: [], group: { name: 'FISE A3', size: 23 }, seat: 30 },
      { id: 6, name: 'B206', type: RoomType.CLASS, status: RoomStatus.FULL, affectations: [], group: { name: 'FIL A2', size: 30 }, seat: 30 },
      { id: 7, name: 'B207', type: RoomType.CLASS, status: RoomStatus.FULL, affectations: [], group: { name: 'FIL A1', size: 26 }, seat: 30 },
      { id: 8, name: 'B208', type: RoomType.CLASS, status: RoomStatus.FULL, affectations: [], group: { name: 'FIL A3', size: 29 }, seat: 30 },
      { id: 9, name: 'B210', type: RoomType.LAB, status: RoomStatus.OCCUPIED, affectations: ['Jean Marc', 'Jean Charles'], seat: 5 },
    ]);
    const people = reactive<string []>(['Jean Marc', 'Jean Ursule', 'Jean Patric', 'Jean Jean', 'Jean Charles', 'Jean Michel']);
    const groups = reactive<Group []>([{ name: 'FIL A1', size: 26 }, { name: 'FIL A2', size: 30 }, { name: 'FIL A3', size: 29 }, { name: 'FISE A3', size: 23 }]);

    function handleRoomSelection(room: Room) {
      currentRoom.value = room;
      roomIsSelected.value = true;
    }

    function addPerson(room: Room, peopleToAdd: string []) {
      isAddPersonModalVisible.value = false;
      const updatedRoom: Room | undefined = rooms.find((r) => r.id === room.id);
      if (updatedRoom) {
        updatedRoom.affectations.push(...peopleToAdd);
        // eslint-disable-next-line no-nested-ternary
        updatedRoom.status = updatedRoom.affectations.length >= (updatedRoom.seat || 2) ? RoomStatus.FULL : updatedRoom.type === RoomType.OFFICE ? RoomStatus.ABSENT : RoomStatus.OCCUPIED;
      }
    }

    function addGroup(room: Room, group: Group) {
      isAddGroupModalVisible.value = false;
      const updatedRoom: Room | undefined = rooms.find((r) => r.id === room.id);
      if (updatedRoom) {
        updatedRoom.group = group;
        updatedRoom.status = RoomStatus.FULL;
      }
    }

    function removePerson(room: Room, person: string): void {
      const updatedRoom: Room | undefined = rooms.find((r) => r.id === room.id);
      if (updatedRoom) {
        updatedRoom.affectations.splice(updatedRoom.affectations.indexOf(person), 1);
        updatedRoom.status = updatedRoom.affectations.length === 0 ? RoomStatus.FREE : updatedRoom.status;
      }
    }

    function removeGroup(room: Room): void {
      const updatedRoom: Room | undefined = rooms.find((r) => r.id === room.id);
      if (updatedRoom) {
        delete updatedRoom.group;
        updatedRoom.status = RoomStatus.FREE;
      }
    }

    function movePerson(src: Room, person: string, dest: Room): void {
      isRoomSelectionModalVisible.value = false;
      // eslint-disable-next-line no-param-reassign
      removePerson(src, person);
      addPerson(dest, [person]);
      moveParams.value = '';
    }

    function moveGroup(src: Room, dest: Room): void {
      isRoomSelectionModalVisible.value = false;
      if (src.group) {
        addGroup(dest, src.group);
        removeGroup(src);
        if (dest.affectations.length !== 0) {
          // eslint-disable-next-line no-param-reassign
          dest.affectations = [];
        }
      }
    }

    function handleMovePerson(person: string):void {
      moveParams.value = person;
      isRoomSelectionModalVisible.value = true;
    }

    function handleMoveGroup():void {
      isRoomSelectionModalVisible.value = true;
    }

    function handleClose(): void {
      roomIsSelected.value = false;
      currentRoom.value = {} as Room;
    }

    return {
      rooms,
      people,
      groups,
      currentRoom,
      roomIsSelected,
      handleRoomSelection,
      addPerson,
      addGroup,
      removePerson,
      removeGroup,
      handleMovePerson,
      handleMoveGroup,
      movePerson,
      moveGroup,
      isAddPersonModalVisible,
      isAddGroupModalVisible,
      isRoomSelectionModalVisible,
      moveParams,
      handleClose,
    };
  },
});
</script>
