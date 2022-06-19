const dateClock = () => {
    const d = new Date();
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const hourMinut = [];
    if (d.getHours() > 12) {
      hourMinut.push(d.getHours() - 12);
      if (d.getMinutes() < 10) {
        hourMinut.push(`0${d.getMinutes()} pm`);
      } else {
        hourMinut.push(`${d.getMinutes()} pm`);
      }
    } else {
      hourMinut.push(d.getHours() - 10);
      if (d.getMinutes() < 10) {
        hourMinut.push(`0${d.getMinutes()} am`);
      } else {
        hourMinut.push(`${d.getMinutes()} am`);
      }
    }
    const clock = hourMinut.join(':');
    const today = [d.getDate(), months[d.getMonth()], d.getFullYear()].join('-');
    const result = [today, clock].join(' / ');
  
    return result;
  };
  export default dateClock;