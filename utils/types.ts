export type UserType = undefined | 'STUDENT' | 'TEACHER' | 'STAFF';

export type UserBasic = {
  email: string;
  role: string;
  authId: string;
};

export type UserFull = {
  Feedback: [];
  Reservation: Reservation[];
  email: string;
  fullName?: string;
  id: string;
  idNum?: string;
  password?: string;
  role: string;
  supabaseId: string;
  username: string;
};

export type Reservation = {
  department: string;
  endDate: Date;
  equipmentQty: number[];
  equipments: string[];
  facilityId: number;
  filingDate: string;
  id?: string;
  purpose: string;
  startDate: Date;
  status: string;
  userId?: string;
  fullName?: string;
};

export type ReservationWithDetails = {
  reservation: Reservation;
  facilityName: string;
};

export type User = {
  id: string;
  name: string;
  type: UserType;
  notifications: Notification[];
  reservations: Reservation[];
};

export type Notification = {
  reservationId: string;
};

export type Facility = {
  id: number;
  roomNum?: string;
  name: string;
  description?: string;
  capacity?: number;
};

export type Equipment = {
  name: string;
  quantity: number;
};
