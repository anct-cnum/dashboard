export function getStyle(type) {
  let color = [];
  switch (type) {
    case 'theme':
      color = ['#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ddb094', '#5770be', '#ffed33', '#be9b31'];
      break;
    case 'duree':
      color = ['#abcdf5', '#abcdf5', '#abcdf5', '#abcdf5'];
      break;
    case 'age':
      color = ['#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e'];
      break;
    case 'statut':
      color = ['#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480'];
      break;
    case 'lieux':
      color = [
        '#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e', '#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480',
        '#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ffed33', '#be9b31'
      ];
      break;
    case 'reorientation':
      color = [
        '#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e', '#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480',
        '#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ffed33', '#be9b31'
      ];
      break;
    default:
      break;
  }
  return color;
}
