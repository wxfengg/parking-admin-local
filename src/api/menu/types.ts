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
    /** 是否缓存该页面 */
    keepAlive?: boolean
  }
  children: UserMenusVo[]
}
