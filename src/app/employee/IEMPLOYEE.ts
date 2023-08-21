import { ISkill } from "./ISKILL"

export interface Iemployee
{
    id : number
  fullname : string
  email : string
  confirmemail : string
  skills: ISkill[]
}
