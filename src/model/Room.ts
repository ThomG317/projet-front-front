import { Group } from '@/model/Group';

// eslint-disable-next-line no-shadow
export enum RoomType { OFFICE, LAB, CLASS }
// eslint-disable-next-line no-shadow
export enum RoomStatus { FREE, ABSENT, PRESENT, OCCUPIED, FULL }

export interface Room {
  id: number,
  name: string,
  type: RoomType,
  status: RoomStatus,
  affectations: string [],
  group?: Group,
  seat?: number
}
