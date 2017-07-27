export const tid = (component, id) => {
  return component.find(`[data-test-id="${id}"]`)
}
