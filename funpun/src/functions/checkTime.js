const checkTime = () => {
    const storedTime = parseInt(localStorage.getItem("time"));
    if (!storedTime || isNaN(storedTime)) return false;
    const currentTime = new Date().getTime();
    if (currentTime > storedTime) {
      localStorage.removeItem("auth");
      localStorage.removeItem("time");
      return false;
    }
    return true;
  }

  export default checkTime;