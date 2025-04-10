const localStoreUtil = {
  subscribers: {
    userInfo: []
  },

  addSubscriber(event,fn) {
    this.subscribers[event].push(fn);
  },

  clearAllSubscriptions() {
    Object.keys(this.subscribers).forEach(event => {
      if ( this.subscribers && this.subscribers[event]) {
        this.subscribers[event] = [];
      }
    });
  },

  store_data(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    if (this.subscribers && this.subscribers.userInfo) {
      this.subscribers.userInfo.forEach(subscriber => {
        subscriber();
      });
    }
    return true;
  },

  get_data: (key) => {
    const item = localStorage.getItem(key);

    if (!item) return;
    return JSON.parse(item);
  },

  remove_data: (key) => {
    localStorage.removeItem(key);
    return true;
  },

  remove_all: () => {
    localStorage.clear();
    return true;
  },
};

export default localStoreUtil;
