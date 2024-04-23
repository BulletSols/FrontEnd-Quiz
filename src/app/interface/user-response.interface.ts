import {User} from "./user.interface";

export interface UserResponse {
  total: number;
  data: User[];
  per_page: number;
}
