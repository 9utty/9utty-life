/** @format */

export type PostUrl = {
  mainMenu: string | undefined
  mainMenuId: string | undefined
  subMenu: string | undefined
  subMenuId: string | undefined
  item: string | undefined
  itemId: string | undefined
}

export function validationPostUrl(slug: string[]): PostUrl {
  let mainMenu = ''
  let mainMenuId = ''
  let subMenu = ''
  let subMenuId = ''
  let item = ''
  let itemId = ''
  if (slug.at(0) && slug[0] === 'main') {
    mainMenu = slug[0]
  }
  if (slug.at(1)) {
    mainMenuId = slug[1]
  }
  if (slug.at(2) && slug[2] === 'sub') {
    subMenu = slug[2]
  }
  if (slug.at(3)) {
    subMenuId = slug[3]
  }
  if (slug.at(4) && slug[4] === 'item') {
    item = slug[4]
  }
  if (slug.at(5)) {
    itemId = slug[5]
  }

  return {
    mainMenu: mainMenu === '' ? undefined : mainMenu,
    mainMenuId: mainMenuId === '' ? undefined : mainMenuId,
    subMenu: subMenu === '' ? undefined : subMenu,
    subMenuId: subMenuId === '' ? undefined : subMenuId,
    item: item === '' ? undefined : item,
    itemId: itemId === '' ? undefined : itemId
  }
}
