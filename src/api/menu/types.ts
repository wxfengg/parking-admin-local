/** 用户菜单 */
export interface UserMenusVo {
  id: number
  pid: number
  path: string
  component: string
  redirect: string
  meta: {
    title: string
    icon: string
  }
  children: UserMenusVo[]
}
