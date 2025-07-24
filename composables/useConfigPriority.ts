export const useConfigPriority = (priority: number | undefined) => {
  let objPriority = {}

  switch (priority){
    case 1:
      objPriority = {
        style: 'info',
        name: 'Low'
      }
      break;
    case 2:
      objPriority = {
        style: 'warning',
        name: 'Medium'
      }
      break;
    case 3:
      objPriority = {
        style: 'error',
        name: 'High'
      }
      break;
    default:
      return objPriority
  }

  return objPriority
}
