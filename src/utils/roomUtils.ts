import { Room, RoomStatus, RoomType } from '@/model/Room';

export default function useRoomUtils() {
  // eslint-disable-next-line consistent-return
  function getRoomType(room: Room): string {
    // eslint-disable-next-line default-case
    switch (room.type) {
      case RoomType.CLASS: return 'Salle de cours';
      case RoomType.LAB: return 'Laboratoire';
      case RoomType.OFFICE: return room.affectations.length > 0 ? `Bureau de ${room.affectations[0]}` : 'Bureau';
    }
  }

  // eslint-disable-next-line consistent-return
  function getRoomStatus(room: Room): string {
    // eslint-disable-next-line default-case
    switch (room.status) {
      case RoomStatus.ABSENT: return 'Absent(e)';
      case RoomStatus.FREE: return 'Libre';
      case RoomStatus.FULL: return room.group ? room.group.name : 'Occupé(e)';
      case RoomStatus.OCCUPIED: return `${room.affectations.length}/${room.seat}`;
      case RoomStatus.PRESENT: return 'Présent(e)';
    }
  }

  // eslint-disable-next-line consistent-return
  function getRoomClass(room: Room): string {
    // eslint-disable-next-line default-case
    switch (room.status) {
      case RoomStatus.PRESENT:
      case RoomStatus.FREE: return '-green';
      case RoomStatus.OCCUPIED: return '-yellow';
      case RoomStatus.FULL:
      case RoomStatus.ABSENT: return '-red';
    }
  }

  // eslint-disable-next-line consistent-return
  function getRoomIcon(room: Room): string {
    // eslint-disable-next-line default-case
    switch (room.type) {
      case RoomType.CLASS: return 'icon-school';
      case RoomType.LAB: return 'icon-biotech';
      case RoomType.OFFICE: return 'icon-meeting_room';
    }
  }

  return {
    getRoomStatus,
    getRoomType,
    getRoomClass,
    getRoomIcon,
  };
}
